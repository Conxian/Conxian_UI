# Changelog

All notable changes to this project should be documented in this file.

The format is based on Keep a Changelog and the project follows Semantic Versioning.

## [Unreleased]

### Added
- Explicit `data-testid="token-select-trigger"` attribute on `TokenSelect` component for deterministic test automation.
- `aria-label="Toggle navigation menu"` and `aria-current="page"` attributes on navigation links in `Header.tsx` for enhanced accessibility.
- Release discipline documentation and root-level release runbook.

### Fixed
- Stabilized Playwright E2E test `tests/verify_swap.spec.ts` for token selection dropdown interactions.
