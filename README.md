# Aethernum Dashboard

Responsive Next.js App Router frontend for the Aethernum digital asset dashboard: portfolio, rewards, affiliates, transactions, KYC, profile, invoices, and admin tools.

This project runs fully offline for demos. Axios clients call local Next.js routes under `app/api`, which return realistic fixture data (see `lib/mock-data.ts`).

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS, Zustand, Axios, react-hook-form, ApexCharts
- Package manager: Yarn

## Local development

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

No external backend, Stripe live key, or blockchain host is required for the demo.

## Demo access

The login form accepts any email and password.

- `demo@aethernum.local` / any password — standard user dashboard
- `admin@aethernum.local` / any password — admin dashboard

## Environment

`.env.development` is committed for local demo defaults. Values are non-secret public URLs / test keys. Runtime API base URLs are overridden in code to `/api` (`constants/base-urls.ts`).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_HOST` | Legacy host (unused by axios; kept for reference) |
| `NEXT_PUBLIC_BASE_URL` | App origin reference |
| `NEXT_PUBLIC_BLOCKCHAIN_HOST` | Legacy blockchain host reference |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe publishable key (demo checkout uses local mock) |

## Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Start Next.js in development |
| `yarn build` | Production build |
| `yarn start` | Serve production build |
| `yarn lint` | ESLint |
| `yarn type-check` | TypeScript `tsc --noEmit` |
| `yarn validate` | lint + format check + type-check |

## Folder structure

```
app/                 # App Router pages + local API routes
components/          # UI (dashboard, auth, profile, admin, shared)
constants/           # Routes, protected paths, base URLs
lib/                 # Auth/data clients + mock-data fixtures
stores/              # Zustand stores
utils/               # Axios, middleware helpers, formatters
hooks/               # Shared React hooks
```

## Mock APIs

- Catch-all: `app/api/[...path]/route.ts`
- Fixtures: `lib/mock-data.ts`
- Telemetry demo: `app/api/thinger/route.ts`

Major tables ship with 12 records and page size 5 so Previous/Next pagination can be demonstrated.

## Build

```bash
yarn build
yarn start
```

Deploy as a standard Next.js Node/standalone app (see `next.config.mjs` `output: 'standalone'`). Local API routes ship with the app.
