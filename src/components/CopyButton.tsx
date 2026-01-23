"use client";

import React, { useState, memo } from "react";
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

const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [title, setTitle] = useState("Copy to clipboard");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setStatusMessage("Copied to clipboard!");
      setTitle("Copied!");
    } catch (err) {
      setError(true);
      setStatusMessage("Failed to copy");
      setTitle("Failed to copy");
      console.error("Failed to copy text: ", err);
    } finally {
      setTimeout(() => {
        setCopied(false);
        setError(false);
        setStatusMessage("");
        setTitle("Copy to clipboard");
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
        title={title}
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
};

export default memo(CopyButton);
