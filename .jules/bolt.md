# Bolt's Journal ⚡

This journal is for CRITICAL learnings only. See my persona for what to include.

## 2024-05-20 - `useCallback` is only half the story

**Learning:** `useCallback` is only effective when the child components receiving the memoized functions are themselves memoized with `React.memo`. Applying `useCallback` to functions passed to unmemoized child components is a premature micro-optimization that provides no performance benefit.

**Action:** When optimizing list-based components, always ensure that both the event handlers in the parent component are wrapped in `useCallback` *and* the child list item component is wrapped in `React.memo`. This creates a complete and effective optimization.
