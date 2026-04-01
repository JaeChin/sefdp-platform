# CLAUDE.md — SEF-DP Project Rules

This file is the law. Every agent reads this first. No exceptions.

---

## What We Are Building

The SEF-DP (Sustainable Energy Finance Developer Platform) — two connected products:

**Product 1 — DARES Portfolio Management**
Replaces Odyssey Energy Solutions as the operational platform for Nigeria's $750M World Bank DARES programme. Manages mini-grid and standalone solar project applications, milestone tracking, claims verification, PAYGO disbursement calculations, and KPI reporting.

**Product 2 — SEF-DP Marketplace**
Multi-sided investor-developer matching platform. Solar developers submit projects using IFC due diligence methodology. Financiers browse pre-screened, credit-scored projects and get matched.

**Who uses this:** Solar mini-grid developers, DFIs, commercial banks, World Bank PMU admins, REA staff, SEforALL administrators.

**Stakes:** Real grant disbursements. Real financial data. World Bank audit requirements. Nigerian NDPA compliance. Institutional credibility is non-negotiable.

---

## Non-Negotiables (Never Violate These)

1. **Audit everything.** Every non-GET operation writes to audit_logs. No exceptions. No bypass.
2. **Financial amounts are always integers.** Kobo for NGN, cents for USD. Never floats. Never.
3. **No raw SQL.** Drizzle ORM only. Migrations for all schema changes.
4. **No `any` types.** TypeScript strict mode. Always.
5. **Zod validation on every input.** Body, params, query — all validated before processing.
6. **RBAC on every route.** `requireRole()` middleware on every protected endpoint.
7. **No secrets in code.** `.env` only. `.env.example` updated for every new variable.
8. **No stack traces to users.** Sanitized error responses always.
9. **Scores must be explainable.** Every credit score stored with full breakdown JSONB.
10. **Document versions are never deleted.** Soft delete or version chain only.

---

## Stack (Locked — Change Requires /architect Review)

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 14 App Router + TypeScript | SSR for institutional credibility, clean RBAC layouts |
| Styling | Tailwind CSS | Consistent, maintainable, no CSS drift |
| State | Zustand + TanStack Query | Client state + server state separation |
| Forms | React Hook Form + Zod | Type-safe validation, shared schemas |
| Backend | Fastify 4 + TypeScript | Faster than Express, TypeScript-native |
| ORM | Drizzle ORM | Type-safe, lightweight, excellent Postgres support |
| Database | PostgreSQL 16 | Battle-tested, RLS capable, JSONB for flexible config |
| Cache/Queue | Redis 7 + BullMQ | Session storage, background jobs, rate limiting |
| File Storage | MinIO | Self-hosted S3, documents stay on our infrastructure |
| Auth | Custom JWT RS256 | No third-party auth vendor on World Bank contract |
| Email | Resend + React Email | Transactional, reliable |
| Infra | Docker + Caddy + Hetzner VPS | Full control, GDPR-adjacent, professional grade |
| Security | Cloudflare WAF + Zero Trust | Edge protection, admin access control |

---

## Folder Structure

```
sefdp/
├── apps/
│   ├── web/          — Next.js frontend
│   └── api/          — Fastify backend
├── packages/
│   ├── shared/       — Shared TypeScript types + Zod schemas
│   ├── ui/           — Shared React components
│   └── config/       — Shared ESLint, TS, Tailwind configs
├── infra/            — Docker, Caddy, deployment scripts
├── docs/
│   ├── ARCHITECTURE.md   — Full technical architecture
│   ├── PRODUCT.md        — Product requirements + MVP scope
│   └── PROGRESS.md       — Build log, current state, next steps
└── CLAUDE.md             — This file
```

---

## Design System

- **Primary**: `#0A2540` (deep navy)
- **Accent**: `#00A86B` (energy green)
- **Display font**: Sora
- **Body font**: IBM Plex Sans
- **Mono font**: IBM Plex Mono (all financial data)
- **Cards**: white, `border-slate-200`, `rounded-xl`, `shadow-sm`
- **Status badges**: always text + color, never color alone

---

## MVP Scope (Build This First)

Three features win the stakeholder demo:

1. **Claims submission + disbursement tracking** — the single biggest gap in Odyssey
2. **Analytics dashboard** — Odyssey's analytics section is completely empty
3. **Developer profiles + financier browse view** — the SEF-DP value proposition

Everything else comes after approval.

---

## Command Reference

| Command | Purpose |
|---|---|
| `/prime` | Load project context, get oriented, find next action |
| `/architect` | Design or review system architecture |
| `/devsecops` | Build backend features securely |
| `/ui` | Build frontend features |
| `/review` | Security + quality audit before any merge |
| `/debug` | Systematic troubleshooting |

---

## Compliance Context

- **World Bank DARES Programme** — requires full audit trails, explainable disbursement calculations
- **Nigerian NDPA** — data privacy requirements, Nigerian user data handling
- **IFC Standards** — due diligence methodology used as scoring framework
- **SEforALL** — institutional reporting requirements

When in doubt: more logging, more validation, more explainability. Never less.
