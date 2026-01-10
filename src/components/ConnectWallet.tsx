"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@/lib/wallet";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

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
  const [tooltipMessage, setTooltipMessage] = useState("Copy wallet address");

  useEffect(() => {
    if (window.StacksProvider) {
      setIsStacksAvailable(true);
    }
  }, []);

  const handleCopy = () => {
    if (stxAddress) {
      navigator.clipboard.writeText(stxAddress);
      setCopied(true);
      setTooltipMessage("Copied!");
      setTimeout(() => {
        setCopied(false);
        setTooltipMessage("Copy wallet address");
      }, 2000);
    }
  };

  if (!isStacksAvailable) {
    return (
      <a
        href="https://wallet.hiro.so/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors font-medium"
        title="Install the Hiro Wallet extension to connect."
      >
        Install Wallet
      </a>
    );
  }

  if (stxAddress) {
    return (
      <div className="flex items-center gap-x-2">
        <button
          onClick={signOut}
          className="text-sm px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors font-medium"
          title={`Disconnect wallet: ${stxAddress}`}
        >
          {`Disconnect ${stxAddress.substring(0, 4)}...${stxAddress.substring(
            stxAddress.length - 4
          )}`}
        </button>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors"
          aria-label="Copy wallet address"
          title={tooltipMessage}
        >
          {copied ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="h-5 w-5" />
          )}
          <span className="sr-only" aria-live="polite">
            {copied && "Copied to clipboard"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="text-sm px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors font-medium"
    >
      Connect Wallet
    </button>
  );
}
