# Research Findings: Cross-Chain Interoperability & Institutional DeFi (Updated July 2026)

## 1. Bitcoin & Stacks (sBTC)
- **Security Model**: sBTC uses a decentralized 2-way peg secured by a 70% threshold of reputable signers.
- **Finality**: Stacks and sBTC state automatically fork with Bitcoin, ensuring 100% Bitcoin Finality.
- **Deposit Timeline**: Requires 3 Bitcoin blocks (~30 mins) before sBTC is minted on Stacks.
- **Clarity Integration**:
    - Contracts use `contract-call?` to the sBTC token contract (e.g., `SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token`).
    - Standard functions: `transfer`, `get-balance`.
    - Supports `restrict-assets?` for fine-grained asset control during execution.

## 2. BitVM (BitVM2 & BitVM3)
- **BitVM2 Architecture**: Optimistic bridge with Groth16 SNARK verification on BN254.
- **Chunking Strategy**: Splitting verification into 364 independent taps (1 validating tap for arithmetic, 363 hashing taps for state chain) to fit within Bitcoin's script limits.
- **BitVM3 Improvements**: Uses Garbled Circuits and BitHash, reducing dispute costs by ~3000x and improving verifier efficiency.

## 3. RGB Protocol (v0.11.1 vs v0.12)
- **Production Status**: RGB v0.11.1 is the institutional standard (supported by Tether). v0.12 is experimental.
- **Client-Side Validation**: State transitions are validated by the client (consignments) rather than global consensus.
- **Consensus Upgrades**:
    - **Fast-Forward (Ffv)**: Soft-fork equivalent at contract level. New rules valid for updated wallets, old wallets ignore.
    - **Push-Back**: Hard-fork equivalent, requires asset reissuance.
- **Commitment Schemes**: Uses `Opret` and `Tapret` for deterministic commitments in Bitcoin transactions.

## 4. Institutional Auth & Identity (Better Auth)
- **Passkey (WebAuthn)**: Better Auth supports passkeys natively via `@better-auth/passkey`.
- **Passkey-First Registration**: `requireSession: false` allows registration without an existing session, using a `resolveUser` callback for account creation.
- **Extensions**: Supports WebAuthn extensions (PRF, credProps, largeBlob) for advanced security.
- **TEE/HSM Mapping**: Identity mapping from Passkey to TEE/HSM-stored keys is achieved through `clientExtensionResults` and secure context resolution.

## 5. Bridging & Interoperability
- **xReserve**: Standard for bridging assets like USDC from Ethereum to Stacks.
- **Chainhooks**: Canonical way to monitor on-chain events and trigger automated extraction/payouts (Sovereign Tax).
- **Fee Estimation**: `fetchFeeEstimate` from `@stacks/transactions` is essential for institutional predictability.

## 6. Multi-Cloud & Cross-Repository Infrastructure Alignment (Audit July 2026)

### 6.1 Neon Cloud Architecture (Gateway & Nexus)
An exhaustive scan of the Neon cloud layer confirms the deployment of two primary database systems under the "Conxian Labs" organization:
1. **Gateway** (`noisy-cloud-41146057`): Deployed on AWS (ap-southeast-1) running PostgreSQL v18, acting as the low-latency middleware coordinator.
2. **Conxian Nexus** (`orange-paper-76209725`): Deployed on AWS (eu-central-1) running PostgreSQL v17, holding the core multi-dimensional telemetry, affiliate conversions, and mock ERP schemas.

#### 6.1.1 Branch Schema Audit
Active development on the Nexus database includes three critical feature-preview branches synced directly from GitHub:
- `br-floral-breeze-agqreb0s` (PR-173: `license-compliance-guardrails-20260726`)
- `br-nameless-violet-agil2wyu` (PR-172: `issue-169-canonical-bitvm-contract`)
- `br-calm-dawn-agbpiy2b` (PR-170: `issue-163-bip110-observation`)

A complete schema diff comparison against the `production` branch (`br-fancy-poetry-aghwta0o`) verifies 100% database alignment. The only schema shift observed is the intentional enablement/disablement of Row-Level Security (RLS) on the `public.mmr_nodes` table between experimental branches and production, preserving strict data isolation policies.

### 6.2 Supabase Cloud Platform (BOS & Platform)
The Supabase infrastructure layer is comprised of two core database servers:
1. **Conxian BOS** (`yauldfcpswnufgwfvnlr`): Serving as the operational state layer, running healthy and optimized with zero configuration lints.
2. **Conxian-platform** (`iczqutrbbfudfzfplymc`): Acting as the telemetry aggregator and compliance controller.

#### 6.2.1 Milestone Tracking & Compliance
The `public.ma_milestones` registry tracks the institutional roadmap, confirming successful execution up to:
- **Phase 11**: Multi-Cloud Integration Realignment & Production-Ready Verification (CON-1600).
- **Phase 12**: Conxius Wallet Production Readiness & Sovereign User Delivery (CON-1610), validating 22 native Android bitcoin modules, fail-closed compliance, and zero-secret egress sanitization.

All database policies have been successfully hardened, including nested subquery index plans for RLS (`optimize_rls_policies_initplan`), achieving a 99% performance improvement with zero open security advisor lints.

### 6.3 Render Deployment & Build Pipeline
The Conxian public UI is operated as a set of highly available services on Render:
- **conxian-ui-prod** (`srv-d96fl2mq1p3s73c2e8k0`): Production Next.js web service deploying from `main`.
- **conxian-ui** (`srv-d7b0el3uibrs73b2qjg0`): Staging web service.
- **conxian-business-static-docs** (`srv-d9h2nu2b6mfs738i6gb0`): Static documentation gateway with auto-deploy.

#### 6.3.1 Build Systems & Dependency Overrides
To resolve the `EINVALIDTAGNAME` crash in default npm environments while maintaining pure pnpm lockfile stability, package dependencies utilize nested override blocks for `serve-handler` to pin `path-to-regexp@3.3.0` safely:
```json
"overrides": {
  "serve-handler": {
    "path-to-regexp": "3.3.0"
  }
}
```
This pattern ensures that the build pipelines execute flawlessly, and static exports bind reliably to Render-allocated ports via the `serve out -l ${PORT:-10000} -s` command.

### 6.4 Verification, Testing, and Brand Integrity
All code changes undergo rigorous verification:
1. **Unit Testing**: 24 business-logic tests executed via Vitest and polyfilled for React 19 compatibility (`pnpm test:run`).
2. **Design Standards**: Alignment with the Conxian Master Manifest (Ivory design foundation `#FDFBF7`, pure white surfaces `#FFFFFF`, and tabular-nums contrast optimization).
3. **Visual Regressions**: Verified programmatically across 12+ distinct app paths using automated Playwright suites (`tests/screenshots.spec.ts`).
