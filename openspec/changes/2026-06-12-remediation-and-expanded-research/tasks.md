# Remediation and Expanded Research Tasks

## 1. Research and Documentation
- [x] Research cross-chain interoperability standards (Bitcoin, Lightning, Stacks) via Context7
- [x] Document common issues and edge cases found in research
- [x] Audit Linear issues CON-1402 (Dependabot) for alignment and remediation
- [x] Formalize Documentation Alignment Index

## 2. Implementation and Remediation
- [x] Implement remediations for identified vulnerabilities in `package.json`
- [x] Ensure UI follows "Bright Foundation" standards (Ivory palette, high contrast)
- [x] Verify nomenclature (NOMINAL -> READY/ACTION REQUIRED) across components
- [x] Harden devTools (Vite/Vitest) against identified critical vulnerabilities

## 3. Verification
- [x] Run `pnpm audit` to confirm zero vulnerabilities
- [x] Run `pnpm test:run` to ensure institutional-grade stability
- [x] Run `pnpm build` to verify production readiness
- [x] Verify layout stability and accessibility (WCAG AAA contrast)

## 4. Market Repo Alignment & Legacy Deprecation
- [x] Audit Neon `market` database (`small-math-44741750`) and map affiliate, BOS, and ERP mock schemas
- [x] Add `marketUrl` configuration to `AppConfig` in `src/lib/config.ts`
- [x] Create typed `MarketApi` client in `src/lib/market-api.ts` and integrate with `ApiService`
- [x] Surface market telemetry (treasury runway, ERP settlement logs) in `SystemStatus.tsx`
- [x] Create comprehensive unit tests in `src/tests/market-api.test.ts` and `src/tests/ui.test.tsx`
- [x] Formalize `openspec/specs/market-integration/spec.md`
- [x] Update `REPO_OWNERSHIP.md` to map all org repos and mark `conxian/conxian` as DEPRECATED
