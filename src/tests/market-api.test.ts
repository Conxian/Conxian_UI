import { describe, it, expect, vi, beforeEach } from "vitest";
import { MarketApi } from "../lib/market-api";
import { ApiService } from "../lib/api-services";

describe("MarketApi & ApiService Market Integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getMarketMetrics", () => {
    it("returns mock/fallback telemetry when network call fails or endpoint offline", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network Error"));

      const metrics = await MarketApi.getMarketMetrics();
      expect(metrics).toBeDefined();
      expect(metrics.totalVolumeUsd).toBeGreaterThan(0);
      expect(metrics.activePartners).toBeGreaterThan(0);
      expect(metrics.settlementSuccessRate).toBeGreaterThan(90);
    });

    it("returns parsed JSON when endpoint responds successfully", async () => {
      const mockMetrics = {
        totalVolumeUsd: 25000000,
        activePartners: 45,
        dailyConversions: 3100,
        settlementSuccessRate: 99.95,
        updatedAt: "2026-08-20T10:00:00Z",
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => mockMetrics,
      } as Response);

      const metrics = await MarketApi.getMarketMetrics();
      expect(metrics.totalVolumeUsd).toBe(25000000);
      expect(metrics.activePartners).toBe(45);
      expect(metrics.settlementSuccessRate).toBe(99.95);
    });
  });

  describe("getAffiliateConversions", () => {
    it("returns fallback affiliate conversion record on failure", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Timeout"));

      const conversions = await MarketApi.getAffiliateConversions("partner-beta");
      expect(conversions).toHaveLength(1);
      expect(conversions[0].partnerId).toBe("partner-beta");
      expect(conversions[0].status).toBe("settled");
    });
  });

  describe("getErpSettlements", () => {
    it("returns fallback ERP settlement on failure", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("404 Not Found"));

      const settlements = await MarketApi.getErpSettlements("reconciled");
      expect(settlements).toHaveLength(1);
      expect(settlements[0].status).toBe("reconciled");
    });
  });

  describe("getTreasuryRunway", () => {
    it("returns optimal treasury runway model on failure", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Server Error"));

      const runway = await MarketApi.getTreasuryRunway();
      expect(runway.runwayMonths).toBe(36);
      expect(runway.status).toBe("optimal");
    });
  });

  describe("ApiService Proxy Integration", () => {
    it("surfaces MarketApi methods on ApiService", () => {
      expect(ApiService.getMarketMetrics).toBe(MarketApi.getMarketMetrics);
      expect(ApiService.getAffiliateConversions).toBe(MarketApi.getAffiliateConversions);
      expect(ApiService.getErpSettlements).toBe(MarketApi.getErpSettlements);
      expect(ApiService.getTreasuryRunway).toBe(MarketApi.getTreasuryRunway);
    });
  });
});
