"use client";

import React from "react";
import { AppConfig } from "@/lib/config";
import { getStatus } from "@/lib/coreApi";
import { Button } from "@/components/ui/Button";
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
=======
>>>>>>> a3a460e079b9a58533a975671fdae73862c3bf74

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
<<<<<<< HEAD
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Environment</CardTitle>
        <span className={`inline-block h-2 w-2 rounded-full ${indicator}`} />
      </CardHeader>
      <CardContent className="text-sm text-text-secondary space-y-1">
=======
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 w-full max-w-xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Environment</h2>
        <span
          role="status"
          aria-label={status?.ok ? "Operational" : "Error"}
          title={status?.ok ? "Operational" : "Error"}
          className={`inline-block h-2 w-2 rounded-full ${indicator}`}
        />
      </div>
      <div className="text-sm text-gray-400 space-y-1">
>>>>>>> a3a460e079b9a58533a975671fdae73862c3bf74
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
<<<<<<< HEAD

        <div className="pt-3">
          <Button onClick={refresh} disabled={loading} variant="outline" size="sm">
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </CardContent>
    </Card>
=======
      </div>
      <div className="mt-4">
        <Button onClick={refresh} disabled={loading} variant="outline" size="sm">
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
    </div>
>>>>>>> a3a460e079b9a58533a975671fdae73862c3bf74
  );
}
