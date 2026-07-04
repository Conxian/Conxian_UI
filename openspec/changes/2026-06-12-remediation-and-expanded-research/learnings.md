# Learnings from Expanded Research Cycle (July 2026)

## 1. Technical Nuance in Bitcoin Adapters
- **BitVM Implementation**: Our `BitVMAdapter` must support the 364-tap chunking pattern for Groth16 verification to be mainnet-compatible.
- **sBTC Delay**: The 3-block deposit delay must be handled asynchronously in the UI with high-trust feedback (e.g., "Awaiting Bitcoin Finality (1/3 blocks)").
- **RGB Versioning**: Always pin to RGB v0.11.1 for production workflows to avoid the push-back (hard-fork) risks associated with experimental versions.

## 2. Institutional Authentication
- **Passkey-First**: The `requireSession: false` configuration in Better Auth is a game-changer for institutional onboarding, allowing "Sign Up with Passkey" as the primary flow.
- **TEE Security**: Passkey registration should explicitly request `credProps` extensions to verify authenticator properties before mapping to secure enclave keys.

## 3. UI/UX Terminology & Accessibility
- **WCAG AAA Compliance**: Move away from opacity-based muting for labels on Ivory foundations. Use `#4D4D4D` (text-ink-light) to maintain readability (~12:1 contrast ratio).
- **Product Language**: Use "Awaiting Finality" instead of "Transaction Pending" for sBTC operations to educate users on the cross-chain security model.
- **Standardization**: Term 'SELECT VECTOR' has been globally updated to 'SELECT TOKEN' across components like TokenSelect.tsx.

## 4. Vulnerability Management
- **Vite & Vitest**: High/Critical vulnerabilities in devTools (Vite < 8.0.16, Vitest < 4.1.0) were remediated via `pnpm.overrides` to prevent local environment escalation.
- **Supply Chain**: Strict version pinning in overrides is the canonical way to handle transitive dependency vulnerabilities without waiting for upstream package updates.
