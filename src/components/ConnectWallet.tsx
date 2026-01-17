"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@/lib/wallet";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  ClipboardIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StacksProvider?: any;
  }
}

function SignOutButton() {
  const { signOut } = useWallet();
  return (
    <button
      onClick={() => signOut()}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "h-8 w-8 p-1.5"
      )}
      title="Disconnect wallet"
      aria-label="Disconnect wallet"
      type="button"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5" />
    </button>
  );
}

export default function ConnectWallet() {
  const { stxAddress, connectWallet } = useWallet();
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

  if (stxAddress) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-8 px-3"
          )}
        >
          <span className="text-xs font-mono">
            {stxAddress.substring(0, 4)}...{stxAddress.substring(stxAddress.length - 4)}
          </span>
          <button
            onClick={handleCopy}
            className="ml-2"
            title="Copy address to clipboard"
            aria-label="Copy address to clipboard"
            type="button"
          >
            {copied ? (
              <CheckIcon
                className="h-4 w-4 text-green-500"
                data-testid="check-icon"
              />
            ) : (
              <ClipboardIcon
                className="h-4 w-4"
                data-testid="clipboard-icon"
              />
            )}
          </button>
        </div>
        <SignOutButton />
      </div>
    );
  }

  const handleWalletAction = () => {
    if (isStacksAvailable) {
      connectWallet();
    } else {
      window.open("https://wallet.hiro.so/", "_blank");
    }
  };

  const label = !isStacksAvailable ? "Install Wallet" : "Connect Wallet";

  return (
    <Button
      onClick={handleWalletAction}
      className="whitespace-nowrap h-8"
      data-testid="connect-wallet-button"
      type="button"
      size="sm"
    >
      {label}
    </Button>
  );
}
