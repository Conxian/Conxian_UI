"use client";

import React, { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export default function CopyButton({
  textToCopy,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setStatusMessage("Copied to clipboard!");
    setTimeout(() => {
      setCopied(false);
      setStatusMessage("");
    }, 2000);
  };

  return (
    <>
      <Button
        onClick={handleCopy}
        variant="ghost"
        className={`p-2 h-auto ${className}`}
        aria-label="Copy to clipboard"
        type="button"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-green-500" />
        ) : (
          <ClipboardIcon className="w-5 h-5" />
        )}
      </Button>
      {/* Visually hidden container for screen reader announcements */}
      <div className="sr-only" aria-live="polite">
        {statusMessage}
      </div>
    </>
  );
}
