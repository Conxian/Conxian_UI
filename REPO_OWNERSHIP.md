# Repo Ownership & Ecosystem Repository Alignment

## Purpose

`conxian_ui` is the primary business frontend surface and reference interface in the Conxian ecosystem.

## Organization Repository Matrix

| Repository | Primary Role & Responsibility | Status |
|---|---|---|
| `conxian_ui` | Primary business UI, operational DEX interfaces, SCADA monitoring, Governance, Sandbox, and market telemetry views. | **Active (Primary Business UI)** |
| `conxius-wallet` | Sovereign Bitcoin and Stacks client wallet reference implementation. | **Active** |
| `conxius-platform` / `conxian-platform` | Telemetry aggregator, bounty payout pipeline, and compliance controller (Supabase `iczqutrbbfudfzfplymc`). | **Active** |
| `conxian-market` | Market data services, affiliate conversions, mock ERP settlements, and treasury runway telemetry (Neon `small-math-44741750`). | **Active** |
| `conxian-gateway` | Middleware request router and low-latency coordinator (Neon `noisy-cloud-41146057`). | **Active** |
| `conxian-nexus` | Multi-dimensional telemetry, affiliate conversions, and MMR node state (Neon `orange-paper-76209725`). | **Active** |
| `conxian-bos` | Business Operating System, M&A readiness, and milestone registry (Supabase `yauldfcpswnufgwfvnlr` & Neon `noisy-flower-17484435`). | **Active** |
| `conxian/conxian` | Legacy monolithic repository. | **DEPRECATED** |

## This Repo Owns (`conxian_ui`)

- Shared business interface experiments and production web UI surfaces.
- User-facing DEX flows (Swap, Liquidity Pools, Tokens, Self-Launch, Positions).
- Operator and institutional views (SCADA Monitor, Governance Mandates, Time-Travel Sandbox).
- Integration and rendering of cross-repo telemetry (`conxian-market`, `conxian-nexus`, `conxian-gateway`).

## This Repo Does Not Own

- On-chain Clarity smart contract deployment logic (owned by core protocol contracts).
- Sovereign wallet key management or signing logic (owned by `conxius-wallet`).
- Raw database schema migrations for platform backend services (owned by respective repo platforms).

## Boundary Rule & Strategic Role

`conxian_ui` operates as the primary user-facing business web portal for the Conxian protocol, using standardized API services (`ApiService`, `MarketApi`) to interface seamlessly with all organization backend services while avoiding overlap with client wallet functions.
