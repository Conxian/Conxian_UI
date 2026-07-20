# Conxian Frontend Product Requirement Document (PRD)

## 1. Executive Summary & Identity

- **Identity**: `cxn-arch-guardian`
- **Target**: Global UI/UX Standardization across Conxian Protocol, Conxius Wallet, and Gateway.
- **Ethos**: Sovereign Earthy, BTC-native, Institutional-Grade (Morgan Stanley / BlackRock logic applied to decentralized infrastructure). High-trust, high-legibility.

The Conxian UI serves as the high-integrity user-facing layer for decentralized Bitcoin financial systems. This document outlines the permanent visual standards, structural layouts, and component-level specifications required to maintain our high-contrast, low-fatigue, institutional-grade product experience.

---

## 2. Mandatory UI Architecture (The Bright Foundation)

The UI utilizes a spacious, bright, and low-fatigue Canvas designed for prolonged operational focus. All legacy default dark mode backgrounds must remain purged from main operational workspaces.

### 2.1 The 60-30-10 Palette

The interface is strictly mapped to the 60-30-10 Ivory-led palette:

1. **Base Canvas (60%)**: Enforce an "Ivory" or warm off-white foundation for all primary backgrounds and operational zones.
   - Hex value: `#FDFBF7`
   - Tailwind/CSS variable: `var(--color-background)` / `bg-background`
2. **Surface Layers (30%)**: Use pure white or subtle contrasting light tones for cards, modals, and internal telemetry feeds. Depth is established through structural layout, spacing, and micro-borders rather than heavy shadows.
   - Pure White: `#FFFFFF` / `var(--color-background-paper)` / `bg-background-paper`
   - Neutral Light (Tonal shift): `#F9F8F6` / `var(--color-neutral-light)` / `bg-neutral-light`
   - Surface Dim: `#F2F0ED` / `var(--color-surface-dim)` / `bg-surface-dim`
3. **Brand & Interaction (10%)**: Reserve deep earthy greens/blacks strictly for high-visibility typography, active toggles, and primary call-to-action buttons.
   - Primary/Ink: `#333333` / `var(--color-ink)` / `text-ink`
   - Ink Light (Secondary contrast): `#4D4D4D` / `var(--color-ink-light)` / `text-ink-light`
   - Ink Deep (Dark Brand Accent): `#1A2623` / `var(--color-ink-deep)` / `text-ink-deep`
   - Gold Accent: `#D4A017` / `var(--color-accent)` / `text-accent` / `border-accent/20`

---

## 3. Structural Blocking & Layout Rules

### 3.1 Entry Zones
- **Branding Baseline**: The sticky top navigation bar (`Header.tsx`) and initial marketing landing headers may utilize full-width dark brand colors (`bg-ink-deep`) to establish immediate brand presence and anchor the user's visual journey.

### 3.2 Operational Workspaces
- The moment a user enters any workspace (Yield tracking, Governance, Sandbox, Real-time SCADA telemetry, Pools, Token Swap, Asset Portfolio), the background **must snap** to the bright Ivory base (`#FDFBF7`).
- Operational views must wrap content in the standard layout container:
  ```tsx
  <div className="flex flex-col min-h-screen bg-background terminal-text">
  ```
- Operational content must live inside a centralized `max-w-7xl` container:
  ```tsx
  <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-10">
  ```

---

## 4. Accessibility & Data Legibility (WCAG AAA)

### 4.1 Strict Contrast
- Financial statistics, yields, and analytical labels must maintain a high contrast ratio (~12:1) against light Ivory surfaces.
- Primary text is `#333333` (`text-ink`).
- Secondary/de-emphasized labels are `#4D4D4D` (`text-ink-light`). Opacity-based opacity-muted text (e.g. `text-ink/40`) is deprecated on Ivory surfaces to avoid visual fatigue and screen reader failure.

### 4.2 Tabular Typography
- To prevent alignment shifting and layout jitter, all financial balances, numbers, prices, and tickers **must** enforce tabular-nums formatting:
  ```tsx
  <span className="tabular-nums font-mono">1,234.56 STX</span>
  ```
- Operational headers and section labels must utilize bold uppercase styling with a letter-spacing tracker (`uppercase tracking-widest` or `tracking-[0.2em]`) to achieve an authoritative, SCADA-like terminal aesthetic.

---

## 5. UI Components & Interaction Feedback

All custom or page-level designs must utilize or extend the canonical components:

1. **Buttons (`Button.tsx`)**: Primary actions use `rounded-sm`, bold text, and a distinct letter-spacing format (`uppercase tracking-[0.2em]`).
2. **Inputs (`Input.tsx`)**: High-contrast input boxes with a focus state highlighting the container border (`focus-within:border-accent/40`) to maintain focus without heavy glows.
3. **Cards (`Card.tsx` / `machined-card`)**: Built on the bright surface paper background (`#FFFFFF`), bounded by a subtle gold-tinted micro-border (`border-accent/20` or `border-ghost`) and a structured, uppercase terminal header (`machined-header`).
4. **Interactive Drops & Modals**: Must provide immediate, screen-reader friendly `aria-label` tags (e.g., `"Select input token"`) to uphold accessibility standards.
5. **Async Loading State**: Primary action buttons that fetch, write, or transmit transactions to the blockchain must visually communicate transition state. They must feature a spinning `ArrowPathIcon` with `gap-3`, combined with `aria-busy="true"` and an informative `aria-label`.

---

## 6. Execution & Verification Routine

To prevent design token drift, any modification to files in the repository must be run against:
1. `npx eslint .` to ensure compliance with TypeScript and React standards.
2. `pnpm test:run` for business logic and component unit verification.
3. `pnpm build` for compilation integrity.
4. Playwright visual regression checking (`pnpm exec playwright test`).
