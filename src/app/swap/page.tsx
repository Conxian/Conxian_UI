"use client";

import React from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, cvToHex, contractPrincipalCV, PostConditionMode } from "@stacks/transactions";
import { Tokens, CoreContracts } from "@/lib/contracts";
import { callReadOnly, getFungibleTokenBalances, FungibleTokenBalance } from "@/lib/coreApi";
import { decodeResultHex, getTupleField, getUint } from "@/lib/clarity";
import { useWallet } from "@/lib/wallet";
import ConnectWallet from "@/components/ConnectWallet";
import { formatAmount, parseAmount, cn } from "@/lib/utils";
// Removed useApi import as we are using direct contract calls
// import { useApi } from "@/lib/api-client"; 

// Re-styled components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { badgeVariants } from "@/components/ui/Badge";
import TokenSelect from "@/components/ui/TokenSelect";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";


// --- Helper Functions ---
// No change in helper functions, keeping them as is.

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getPrincipalValue(json: unknown): string | null {
  if (!isRecord(json)) return null;
  if (json["type"] !== "principal") return null;
  return typeof json["value"] === "string" ? json["value"] : null;
}

// --- Main Swap Page Component ---

export default function SwapPage() {
  const [fromToken, setFromToken] = React.useState(Tokens[0].id);
  const [toToken, setToToken] = React.useState(Tokens[1].id);
  const [fromAmount, setFromAmount] = React.useState("1000000");
  const debouncedFromAmount = useDebounce(fromAmount, 500);
  const [toAmount, setToAmount] = React.useState("");
  const [slippage, setSlippage] = React.useState(0.5);
  const [balances, setBalances] = React.useState<FungibleTokenBalance[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [status, setStatus] = React.useState<string>("");
  const { connectWallet, stxAddress } = useWallet();
  // const api = useApi(); // Unused

  const fromTokenInfo = Tokens.find((t) => t.id === fromToken);
  const toTokenInfo = Tokens.find((t) => t.id === toToken);
  const fromTokenBalance = balances.find(
    (b) => b.asset_identifier === fromToken
  );
  const isSameToken = fromToken === toToken;

  // Store the resolved pool principal for the transaction
  const [poolPrincipal, setPoolPrincipal] = React.useState<string>("");

  const getEstimate = React.useCallback(async () => {
    if (!fromToken || !toToken || !debouncedFromAmount || isSameToken) return;

    const factory = CoreContracts.find((c) =>
      c.id.endsWith(".dex-factory-v2")
    );
    if (!factory) {
      console.error("DEX Factory contract not found");
      return;
    }

    const [factoryAddress, factoryName] = factory.id.split(".") as [
      string,
      string,
    ];

    setLoading(true);
    setPoolPrincipal(""); // Reset pool principal
    try {
      const [fromTokenAddress, fromTokenName] = fromToken.split(".") as [
        string,
        string,
      ];
      const [toTokenAddress, toTokenName] = toToken.split(".") as [
        string,
        string,
      ];

      // 1. Get Pool Address from Factory
      const getPoolArgs = [
        cvToHex(contractPrincipalCV(fromTokenAddress, fromTokenName)),
        cvToHex(contractPrincipalCV(toTokenAddress, toTokenName)),
      ];

      const poolRes = await callReadOnly(
        factoryAddress,
        factoryName,
        "get-pool",
        factoryAddress,
        getPoolArgs
      );

      let foundPool = "";
      
      if (poolRes.ok && poolRes.result) {
        const decoded = decodeResultHex(poolRes.result);
        if (decoded && decoded.ok) {
          const poolField = getTupleField(decoded.value, "pool");
          const principal = getPrincipalValue(poolField);
          if (principal) foundPool = principal;
        }
      }

      if (!foundPool) {
          console.warn("No pool found for pair");
          setToAmount("0");
          return;
      }

      setPoolPrincipal(foundPool);

      // 2. Get Quote from Pool
      const [poolAddress, poolName] = foundPool.split(".") as [string, string];
      
      const quoteArgs = [
          cvToHex(uintCV(BigInt(debouncedFromAmount))),
          cvToHex(contractPrincipalCV(fromTokenAddress, fromTokenName)),
          cvToHex(contractPrincipalCV(toTokenAddress, toTokenName))
      ];

      const quoteRes = await callReadOnly(
          poolAddress,
          poolName,
          "get-quote",
          poolAddress, 
          quoteArgs
      );

      if (quoteRes.ok && quoteRes.result) {
        const decoded = decodeResultHex(quoteRes.result);
        if (decoded && decoded.ok) {
          const uint = getUint(decoded.value);
          if (uint !== null) {
            setToAmount(String(uint));
          }
        }
      }
    } catch (e) {
      console.error("Estimation failed", e);
      setToAmount("");
    } finally {
      setLoading(false);
    }
  }, [fromToken, toToken, debouncedFromAmount, isSameToken]);

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || !toAmount || isSameToken) return;
    if (!stxAddress) {
      setStatus("Please connect wallet to swap");
      return;
    }
    if (!poolPrincipal) {
        setStatus("No liquidity pool available for this pair");
        return;
    }

    const router = CoreContracts.find((c) => c.id.endsWith(".multi-hop-router-v3"));
    if (!router) {
        setStatus("Router configuration missing");
        return;
    }
    const [routerAddress, routerName] = router.id.split(".") as [string, string];

    setSending(true);
    setStatus("");

    try {
      const amountIn = BigInt(fromAmount);
      // minAmountOut = output * (1 - slippage/100)
      // We calculate this approximately. slippage is in percentage e.g. 0.5
      // factor = (10000 - slippage * 100) / 10000
      const amountOut = BigInt(toAmount || "0");
      const slippageBps = Math.floor(slippage * 100);
      const minAmountOut = amountOut * BigInt(10000 - slippageBps) / BigInt(10000);

      // Construct PostConditions
      // Sending fromToken (fungible)
      // For MVP we can use PostConditionMode.Allow to avoid complex PC construction errors,
      // but ideally we construct them.
      // Assuming SIP-010 traits.
      
      const [poolAddress, poolName] = poolPrincipal.split(".") as [
        string,
        string,
      ];
      const [fromTokenAddress, fromTokenName] = fromToken.split(".") as [
        string,
        string,
      ];
      const [toTokenAddress, toTokenName] = toToken.split(".") as [
        string,
        string,
      ];

      const functionArgs = [
          uintCV(amountIn),
          uintCV(minAmountOut),
          contractPrincipalCV(poolAddress, poolName),
          contractPrincipalCV(fromTokenAddress, fromTokenName),
          contractPrincipalCV(toTokenAddress, toTokenName)
      ];

      await openContractCall({
          contractAddress: routerAddress,
          contractName: routerName,
          functionName: "swap-direct",
          functionArgs,
          postConditionMode: PostConditionMode.Allow, // Using Allow for ease of testing
          postConditions: [],
          onFinish: (data) => {
              setStatus(`Submitted. Tx ID: ${data.txId}`);
              setSending(false);
          },
          onCancel: () => {
              setStatus("Transaction canceled");
              setSending(false);
          }
      });
      
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus(`Error: ${msg}`);
      setSending(false);
    }
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFromAmount(parseAmount(value, fromTokenInfo?.decimals ?? 6));
    }
  };

  const handleMax = () => {
    if (fromTokenBalance) {
      setFromAmount(fromTokenBalance.balance);
    }
  };

  const handleFromTokenChange = (tokenId: string) => {
    setFromToken(tokenId);
    setToAmount("");
  };

  const handleToTokenChange = (tokenId: string) => {
    setToToken(tokenId);
    setToAmount("");
  };

  const invertTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount("");
  };

  React.useEffect(() => {
    getEstimate();
  }, [getEstimate]);

  React.useEffect(() => {
    if (stxAddress) {
      getFungibleTokenBalances(stxAddress).then(setBalances);
    }
  }, [stxAddress]);

  return (
    <div className="min-h-screen w-full p-6 sm:p-10 space-y-8 bg-background">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-text-primary">Swap</h1>
        <div className="lg:hidden">
          <ConnectWallet />
        </div>
      </header>
      <Tabs defaultValue="simple" className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="optimized" disabled>Optimized</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <Card className="bg-background-paper">
            <CardHeader>
              <CardTitle className="text-text-primary">Simple Swap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Token */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="from-amount" className="text-text-secondary">
                    From
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted">
                      Balance:{" "}
                      {fromTokenBalance
                        ? formatAmount(
                            fromTokenBalance.balance,
                            fromTokenInfo?.decimals ?? 6
                          )
                        : 0}
                    </span>
                    {fromTokenBalance && (
                      <button
                        type="button"
                        onClick={handleMax}
                        className="text-xs font-bold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
                        aria-label={`Set maximum amount (${formatAmount(
                          fromTokenBalance.balance,
                          fromTokenInfo?.decimals ?? 6
                        )})`}
                      >
                        MAX
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TokenSelect
                    tokens={Tokens}
                    selectedToken={fromToken}
                    onSelect={handleFromTokenChange}
                    balances={balances}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    id="from-amount"
                    value={formatAmount(fromAmount, fromTokenInfo?.decimals ?? 6)}
                    onChange={handleFromAmountChange}
                    className="w-full text-right"
                  />
                </div>
              </div>

              {/* Invert Button */}
              <div className="flex justify-center">
                <Button
                  onClick={invertTokens}
                  variant="outline"
                  size="icon"
                  aria-label="Invert tokens"
                  title="Invert tokens"
                >
                  <ArrowsUpDownIcon className="h-5 w-5 transition-transform duration-500 active:rotate-180" />
                </Button>
              </div>

              {/* To Token */}
              <div className="space-y-2">
                <label htmlFor="to-amount" className="text-sm text-text-secondary">To</label>
                <div className="flex items-center gap-2">
                  <TokenSelect
                    tokens={Tokens}
                    selectedToken={toToken}
                    onSelect={handleToTokenChange}
                    balances={balances}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    id="to-amount"
                    value={formatAmount(toAmount, toTokenInfo?.decimals ?? 6)}
                    readOnly
                    className="w-full text-right"
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Slippage */}
              <div className="flex justify-between items-center text-sm">
                <label
                  htmlFor="slippage-input"
                  className="text-text-secondary cursor-pointer"
                >
                  Slippage Tolerance
                </label>
                <div className="flex items-center gap-2">
                  {[0.1, 0.5, 1.0].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSlippage(val)}
                      className={cn(
                        badgeVariants({
                          variant: slippage === val ? "default" : "secondary",
                        }),
                        "cursor-pointer"
                      )}
                      aria-pressed={slippage === val}
                    >
                      {val}%
                    </button>
                  ))}
                  <Input
                    id="slippage-input"
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value))}
                    className="w-20 text-right"
                    aria-label="Slippage tolerance percentage"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                {stxAddress ? (
                  <Button
                    onClick={handleSwap}
                    disabled={loading || sending || isSameToken}
                    className="w-full"
                  >
                    {sending ? "Sending..." : loading ? "Getting estimate..." : "Swap"}
                  </Button>
                ) : (
                  <Button onClick={connectWallet} className="w-full">
                    Connect Wallet
                  </Button>
                )}
              </div>
              
              <p
                className={cn(
                  "text-center text-sm text-text-muted mt-4 min-h-[1.25rem] transition-opacity duration-300",
                  status ? "opacity-100" : "opacity-0"
                )}
                aria-live="polite"
              >
                {status}
              </p>

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="optimized">
          <Card className="bg-background-paper">
            <CardHeader>
              <CardTitle className="text-text-primary">Optimized Swap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">Optimized swap form coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
