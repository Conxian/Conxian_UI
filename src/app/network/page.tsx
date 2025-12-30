"use client";

import React from "react";
import { AppConfig } from "@/lib/config";
import {
  getStatus,
  getNetworkBlockTimes,
  getMempool,
  CoreStatus,
  MempoolTx,
} from "@/lib/coreApi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function NetworkPage() {
  const [status, setStatus] = React.useState<CoreStatus | null>(null);
  const [blocks, setBlocks] = React.useState<unknown | null>(null);
  const [mempool, setMempool] = React.useState<MempoolTx[]>([]);
  const [loading, setLoading] = React.useState(false);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    const [s, b, m] = await Promise.all([
      getStatus(),
      getNetworkBlockTimes(),
      getMempool(15),
    ]);
    setStatus(s);
    setBlocks(b);
    setMempool(m || []);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="min-h-screen w-full p-6 sm:p-10 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text">Network</h1>
        <Button onClick={refresh} disabled={loading} variant="outline" size="sm">
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Environment</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1 text-text-secondary">
            <div>
              <span className="font-medium text-text">Core API:</span>{" "}
              {AppConfig.coreApiUrl}
            </div>
            <div>
              <span className="font-medium text-text">Network:</span>{" "}
              {AppConfig.network}
            </div>
            <div>
              <span className="font-medium text-text">Status:</span>{" "}
              {status?.ok
                ? `OK (chain_id=${status.chain_id}, network=${status.network_id})`
                : `Error ${status?.error || "unknown"}`}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Block Times</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-auto text-text-secondary">
              {blocks ? JSON.stringify(blocks, null, 2) : "No data"}
            </pre>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mempool (latest)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-accent/20 text-text-secondary">
                  <th className="py-2 pr-4">Tx ID</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Sender</th>
                  <th className="py-2 pr-4">Nonce</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {mempool.map((tx: MempoolTx) => (
                  <tr
                    key={tx.tx_id}
                    className="border-b border-accent/20 hover:bg-accent/10"
                  >
                    <td className="py-2 pr-4 break-all">{tx.tx_id}</td>
                    <td className="py-2 pr-4">{tx.tx_type}</td>
                    <td className="py-2 pr-4 break-all">{tx.sender_address}</td>
                    <td className="py-2 pr-4">{tx.nonce}</td>
                  </tr>
                ))}
                {mempool.length === 0 && (
                  <tr>
                    <td className="py-4 text-center" colSpan={4}>
                      No transactions in mempool.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
