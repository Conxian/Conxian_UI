"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useWallet } from "@/lib/wallet";
import { Button } from "@/components/ui/Button";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StacksProvider?: any;
  }
}

export default function ConnectWallet() {
  const { stxAddress, connectWallet, signOut } = useWallet();
  const [isStacksAvailable, setIsStacksAvailable] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (window.StacksProvider) {
      setIsStacksAvailable(true);
    }
  }, []);

  const handleCopy = () => {
    if (stxAddress) {
      navigator.clipboard.writeText(stxAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ⚡ Bolt: Memoize the wallet action handler.
  // This prevents the function from being recreated on every render, which is more memory-efficient.
  const handleWalletAction = useCallback(() => {
    if (stxAddress) {
      signOut();
    } else if (isStacksAvailable) {
      connectWallet();
    } else {
      window.open("https://wallet.hiro.so/", "_blank");
    }
  }, [stxAddress, isStacksAvailable, connectWallet, signOut]);

  const label = !isStacksAvailable
    ? "Install Wallet"
    : stxAddress
      ? `Disconnect ${stxAddress.substring(0, 4)}...${stxAddress.substring(
          stxAddress.length - 4
        )}`
      : "Connect Wallet";

  return (
    <Button
      onClick={handleWalletAction}
      variant={stxAddress ? "outline" : "default"}
      className="whitespace-nowrap"
      aria-pressed={stxAddress ? "true" : "false"}
      data-testid="connect-wallet-button"
      type="button"
    >
      {label}
    </Button>
  );
}
