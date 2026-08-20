# Linear Issue Audit: CON-246 to CON-252

## Summary
The series of issues CON-246 through CON-252 were found to be related to the `conxius-platform` repository, specifically auditing PR #223 and the completion of CON-58.

## Audit Details
- **CON-246**: Collect delivery evidence for CON-58.
- **CON-247**: Verify acceptance evidence for CON-58.
- **CON-248**: Verify payout basis for CON-58.
- **CON-249**: Review claim command handling in PR #223.
- **CON-250**: Review validation and state flow in PR #223.
- **CON-251**: Review rejection and recovery flow in PR #223.
- **CON-252**: Review payout safety and tests in PR #223.

## Finding
These issues pertain to backend logic, identity mapping, and bounty payout flows implemented in the `conxius-platform` codebase. There is no direct implementation of these features in the `conxian_ui` repository.

## Recommendation for conxian_ui
No code changes are required in `conxian_ui` to address these specific issues. However, the UI should be verified to ensure it correctly displays the results of these backend states (e.g., in the Governance or a hypothetical Bounties page) if and when they are integrated. Currently, `conxian_ui` focus is on general DeFi flows (Swap, Pools, Tokens, Governance).

## Cross-Repo Alignment
The research findings in `research_findings.md` regarding identity mapping and sovereign tax extraction should be used to inform future UI updates in `conxian_ui` when these platform features are exposed via API.

## Market Repo & Org Repository Alignment (CON-1620)
- **Scope**: Align `conxian_ui` to seamlessly query `conxian-market` (`small-math-44741750`) for affiliate conversions, ERP mock settlements, and treasury runway telemetry.
- **Legacy Repository**: `conxian/conxian` is officially **DEPRECATED**.
- **Action**: Added `marketUrl` to `AppConfig`, implemented `MarketApi` client and `ApiService` integration with unit tests (`src/tests/market-api.test.ts`), and updated `REPO_OWNERSHIP.md`.
