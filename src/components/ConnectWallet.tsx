"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (window.StacksProvider) {
      setIsStacksAvailable(true);
    }
  }, []);

  const handleWalletAction = () => {
    if (!isStacksAvailable) {
      alert("Please install a Stacks wallet to connect.");
      return;
    }

    if (stxAddress) {
      signOut();
    } else {
      connectWallet();
    }
  };

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
