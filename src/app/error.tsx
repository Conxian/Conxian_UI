"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Uncaught page render error", {
      module: "ErrorBoundary",
      error: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-background terminal-text">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="machined-card p-10 max-w-lg w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-widest text-ink">
              SYSTEM INTERRUPT
            </h1>
            <p className="text-ink-light font-bold text-sm uppercase tracking-[0.2em]">
              An unexpected error occurred in this workspace.
            </p>
          </div>

          <div className="bg-neutral-light border border-accent/20 p-4 rounded-sm">
            <p className="text-xs font-mono text-error break-all">
              {error.message || "Unknown render error"}
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-ink-light mt-2 uppercase tracking-[0.2em]">
                REF: {error.digest}
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={reset} variant="default">
              RETRY WORKSPACE
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
            >
              RETURN TO DASHBOARD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
