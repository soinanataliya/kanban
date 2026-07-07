# Project conventions

## Dependency management
- All dependency versions must be **exact** (no `^`, `~`, `>=`).
- Versions are pinned in `package.json` and managed via `pnpm`.
- Lockfile (`pnpm-lock.yaml`) is committed to the repository.
- Before adding a new dependency, check if the same functionality can be achieved with existing libraries.

## Code style
- TypeScript strict mode.
- No `any` types — prefer `unknown` with type narrowing.
- Prefer named exports over default exports.
- Component props are defined as a local `type Props = { ... }` above the component.
- No single-letter variable names in loops/callbacks (`(c)` → `(card)`, `(col)`).

## Tech stack
- Frontend: React 19, TanStack Router, TanStack Query, Tailwind CSS v4, Vite 7
- Backend: GraphQL Yoga 5, TypeScript
- Monorepo: pnpm, Turborepo
