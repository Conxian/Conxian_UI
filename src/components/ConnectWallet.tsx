"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useWallet } from "@/lib/wallet";
import { Button } from "@/components/ui/Button";
import CopyButton from "./CopyButton";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StacksProvider?: any;
  }
}

export default function ConnectWallet() {
  const { stxAddress, connectWallet, signOut } = useWallet();
  const [isStacksAvailable, setIsStacksAvailable] = useState(false);

  useEffect(() => {
    if (window.StacksProvider) {
      setIsStacksAvailable(true);
    }
  }, []);

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

  if (stxAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-md border border-input bg-background p-2">
          <span
            className="text-sm font-mono text-muted-foreground"
            title={stxAddress}
          >
            {stxAddress.substring(0, 4)}...
            {stxAddress.substring(stxAddress.length - 4)}
          </span>
          <CopyButton textToCopy={stxAddress} />
        </div>
        <Button
          onClick={handleWalletAction}
          variant="outline"
          className="whitespace-nowrap"
          data-testid="disconnect-wallet-button"
          type="button"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleWalletAction}
      variant="default"
      className="whitespace-nowrap"
      data-testid="connect-wallet-button"
      type="button"
    >
      {!isStacksAvailable ? "Install Wallet" : "Connect Wallet"}
    </Button>
  );
}
