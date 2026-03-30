# IFMS - Inventory & Fulfillment Management System

A production-ready Next.js frontend application using App Router with a modular, domain-driven (feature-based) architecture.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4
- **HTTP Client:** Axios
- **Data Fetching:** @tanstack/react-query
- **State Management:** Zustand
- **Linting:** ESLint + Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and configure
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router (routing & layout ONLY)
│   ├── dashboard/
│   │   ├── products/
│   │   ├── inventory/
│   │   └── orders/
│   └── login/
├── features/               # Domain modules (feature-based architecture)
│   ├── product/            # Full implementation
│   ├── inventory/
│   ├── order/
│   ├── supplier/
│   ├── auth/
│   └── user/
├── shared/                 # Reusable UI components (no business logic)
│   └── components/
├── services/               # HTTP client & API layer
├── store/                  # Global state (auth, UI)
├── hooks/                  # Global hooks
├── types/                  # Global type definitions
└── configs/                # App configuration & constants
```

Each feature module follows a consistent structure:

```
feature-name/
├── components/     # UI components
├── api/            # API functions
├── hooks/          # React Query hooks & custom hooks
├── store/          # Zustand store (feature-specific)
├── types/          # TypeScript types
├── utils/          # Helper functions
└── index.ts        # Public API (barrel export)
```

## Architecture Rules

- **No cross-feature imports** — features communicate via `services/` or `shared/`
- **`app/` is thin** — only routing and layout, no business logic
- **Components are pure UI** — business logic lives in hooks
- **API goes through services** — all HTTP calls use the centralized Axios instance
- **Feature-specific state** stays inside `feature/store/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Lint & auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
