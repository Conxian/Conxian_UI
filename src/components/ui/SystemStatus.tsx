"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useApi } from "@/lib/api-client";
import StatusIndicator from "@/components/ui/StatusIndicator";
import { ApiResult } from "@/lib/contract-interactions";
import { TreasuryRunway, ErpSettlement } from "@/lib/market-api";
import { logger } from "@/lib/logger";

interface DashboardMetrics {
  systemHealth: ApiResult<Record<string, unknown>>;
  aggregatedMetrics: ApiResult<Record<string, unknown>>;
  financialMetrics: ApiResult<Record<string, unknown>>;
}

export default function SystemStatus() {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [runway, setRunway] = useState<TreasuryRunway | null>(null);
  const [erpSettlements, setErpSettlements] = useState<ErpSettlement[] | null>(null);

  useEffect(() => {
    async function fetchTelemetry() {
      try {
        setLoading(true);
        const [dashData, runwayData, erpData] = await Promise.all([
          api.getDashboardMetrics() as Promise<DashboardMetrics>,
          api.getTreasuryRunway(),
          api.getErpSettlements("reconciled"),
        ]);
        setMetrics(dashData);
        setRunway(runwayData);
        setErpSettlements(erpData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch system telemetry");
        logger.error("Failed to fetch system telemetry", {
          module: "SystemStatus",
          error: err,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [api]);

  if (loading && !metrics) {
    return (
      <Card className="bg-background-paper border border-accent/20">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-ink">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <div className="animate-pulse text-ink-light text-xs font-bold uppercase tracking-widest">Fetching telemetry...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !metrics) {
    return (
      <Card className="bg-background-paper border border-accent/20">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-ink">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-error font-bold uppercase tracking-wider">{error}</div>
        </CardContent>
      </Card>
    );
  }

  const tvl = (metrics?.aggregatedMetrics?.data?.tvl as string) || "0.00";
  const activeVaults = (metrics?.systemHealth?.data?.["active-vaults"] as string | number) || "0";
  const apy = (metrics?.financialMetrics?.data?.["median-apy"] as string) || "0.00";
  const runwayMonths = runway?.runwayMonths ?? 36;
  const erpCount = erpSettlements?.length ?? 0;

  return (
    <Card className="bg-background-paper border border-accent/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-ink">System Status & Market Telemetry</CardTitle>
        <StatusIndicator
          status={metrics?.systemHealth?.success ? "operational" : "degraded"}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center">
            <div className="p-2 bg-ink/5 rounded-sm border border-accent/10">
              <CurrencyDollarIcon className="w-6 h-6 text-ink" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <div className="text-[10px] font-black text-ink-light uppercase tracking-widest">Total Value Locked</div>
              <div className="text-2xl font-black text-ink tabular-nums">${tvl}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-2 bg-accent/5 rounded-sm border border-accent/10">
              <ShieldCheckIcon className="w-6 h-6 text-accent" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <div className="text-[10px] font-black text-ink-light uppercase tracking-widest">Active Vaults</div>
              <div className="text-2xl font-black text-ink tabular-nums">
                {activeVaults}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-2 bg-success/5 rounded-sm border border-accent/10">
              <ArrowTrendingUpIcon className="w-6 h-6 text-success" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <div className="text-[10px] font-black text-ink-light uppercase tracking-widest">APY (Median)</div>
              <div className="text-2xl font-black text-ink text-success tabular-nums">{apy}%</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-accent/10 grid gap-6 md:grid-cols-2">
          <div className="flex items-center">
            <div className="p-2 bg-accent/10 rounded-sm border border-accent/20">
              <BanknotesIcon className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <div className="text-[10px] font-black text-ink-light uppercase tracking-widest">Treasury Runway</div>
              <div className="text-lg font-black text-ink tabular-nums">{runwayMonths} Months ({runway?.status || "optimal"})</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-2 bg-ink/5 rounded-sm border border-accent/20">
              <CheckCircleIcon className="w-5 h-5 text-ink" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <div className="text-[10px] font-black text-ink-light uppercase tracking-widest">ERP Reconciled Settlements</div>
              <div className="text-lg font-black text-ink tabular-nums">{erpCount} Active Log(s)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
