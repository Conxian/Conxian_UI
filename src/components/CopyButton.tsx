"use client";

import React, { useState } from "react";
import {
  ClipboardIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setStatusMessage("Copied to clipboard!");
    } catch (err) {
      setError(true);
      setStatusMessage("Failed to copy");
      console.error("Failed to copy text: ", err);
    } finally {
      setTimeout(() => {
        setCopied(false);
        setError(false);
        setStatusMessage("");
      }, 2000);
    }
  };

  return (
    <>
      <Button
        onClick={handleCopy}
        variant="ghost"
        className={`p-2 h-auto ${className}`}
        aria-label="Copy to clipboard"
        title="Copy to clipboard"
        type="button"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-green-500" />
        ) : error ? (
          <XMarkIcon className="w-5 h-5 text-red-500" />
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
