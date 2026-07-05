"use client";

import { Button } from "@/components/ui/Button";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html className="bg-background">
      <body className="font-sans antialiased text-ink bg-background">
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="machined-card p-10 max-w-lg w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-black uppercase tracking-widest text-ink">
                CRITICAL SYSTEM FAULT
              </h1>
              <p className="text-ink-light font-bold text-sm uppercase tracking-[0.2em]">
                The application encountered a fatal error and cannot recover.
              </p>
            </div>

            <div className="bg-neutral-light border border-error/20 p-4 rounded-sm">
              <p className="text-xs font-mono text-error break-all">
                {error.message || "Unknown fatal error"}
              </p>
              {error.digest && (
                <p className="text-[10px] font-mono text-ink-light mt-2 uppercase tracking-[0.2em]">
                  REF: {error.digest}
                </p>
              )}
            </div>

            <Button onClick={reset} variant="default">
              ATTEMPT RECOVERY
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
