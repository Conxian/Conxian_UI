"use client";

import React from "react";
import { AppConfig } from "@/lib/config";
import { getStatus } from "@/lib/coreApi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function EnvStatus() {
  const [status, setStatus] = React.useState<{
    ok: boolean;
    chain_id?: number;
    network_id?: string;
    error?: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    const s = await getStatus();
    setStatus(s);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const indicator = status?.ok ? "bg-green-500" : "bg-red-500";

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Environment</CardTitle>
        <span className={`inline-block h-2 w-2 rounded-full ${indicator}`} />
      </CardHeader>
      <CardContent className="text-sm text-text-secondary space-y-1">
        <div>
          <span className="font-medium text-text">Core API:</span>{" "}
          {AppConfig.coreApiUrl}
        </div>
        <div>
          <span className="font-medium text-text">Network:</span>{" "}
          {AppConfig.network}
        </div>
        {status && (
          <div>
            <span className="font-medium text-text">Status:</span>{" "}
            {status.ok
              ? `OK (chain_id=${status.chain_id}, network=${status.network_id})`
              : `Error ${status.error || "unknown"}`}
          </div>
        )}

        <div className="pt-3">
          <Button onClick={refresh} disabled={loading} variant="outline" size="sm">
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
