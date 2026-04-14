# Auth Routing Restructure
# Read and execute these instructions exactly. Do not commit or push.

---

## CONTEXT

The current `/login` and `/register` routes serve the Marketplace product (CBN/SEforALL, dark navy + amber theme).
The landing page at `/` is now DARES-only and uses a white background with emerald green accents.
When a DARES user clicks "Sign In" they land on a marketplace-branded dark page — this is wrong.

We are splitting auth into two clean namespaces:
- `/login/marketplace` and `/register/marketplace` — existing marketplace auth, moved, unchanged
- `/login/dares` — new DARES login page matching the DARES landing page theme
- `/register/dares` — NOT building this. DARES is invite-only.

---

## PHASE 1 — AUDIT CURRENT FILE LOCATIONS

Before moving anything, run:
```bash
find apps/web/app -type f -name "*.tsx" | grep -E "(login|register)" | sort
```

List every file found. Also grep for all internal links pointing to `/login` or `/register`:
```bash
grep -r "href.*['\"/]login" apps/web --include="*.tsx" -l
grep -r "href.*['\"/]register" apps/web --include="*.tsx" -l
```

List every file that contains these links. You will need to update them in Phase 3.

---

## PHASE 2 — MOVE MARKETPLACE AUTH TO NEW ROUTES

### 2a. Move login
Copy the existing login page exactly as-is to:
`apps/web/app/login/marketplace/page.tsx`

### 2b. Move register
Copy the existing register page exactly as-is to:
`apps/web/app/register/marketplace/page.tsx`

### 2c. Replace old routes with redirects

Replace `apps/web/app/login/page.tsx` with:
```tsx
import { redirect } from 'next/navigation'

export default function LoginPage() {
  redirect('/login/dares')
}
```

Replace `apps/web/app/register/page.tsx` with:
```tsx
import { redirect } from 'next/navigation'

export default function RegisterPage() {
  redirect('/register/marketplace')
}
```

---

## PHASE 3 — UPDATE MARKETPLACE INTERNAL LINKS

In every marketplace file that links to `/login` or `/register`, update:
- `/login` → `/login/marketplace`
- `/register` → `/register/marketplace`

Do NOT update `apps/web/components/landing/navbar.tsx` — it links to `/login` which correctly redirects to `/login/dares`.

---

## PHASE 4 — CREATE /login/dares

Create `apps/web/app/login/dares/page.tsx`.

### Theme — match the DARES landing page exactly

The DARES landing page (`/`) uses:
- White background (`bg-white` / `bg-background`)
- Dark near-black text (`text-foreground`)
- Emerald green accent: `text-emerald-500`, `bg-emerald-600`, `hover:bg-emerald-700`
- Clean sans-serif, no dark panels, no amber/yellow anywhere
- Eyebrow label style: `text-sm font-medium uppercase tracking-widest text-emerald-500`
- Button style: `rounded-full bg-emerald-600 text-white hover:bg-emerald-700`

Do NOT use the marketplace dark navy theme. Do NOT use amber or yellow anywhere.

### Layout — two column, full viewport height

```
[ Left panel — 50% width ]  [ Right panel — 50% width ]
```

**Left panel** (`bg-white`, centered content, generous padding):

- Top: SEF-DP logo mark — `<span className="text-xl font-bold tracking-tight">SEF-DP</span>` with emerald dot `<span className="h-2 w-2 rounded-full bg-emerald-500" />` — same as navbar
- Eyebrow: `text-sm font-medium uppercase tracking-widest text-emerald-500` → "DARES Programme Portal"
- Heading: `text-2xl font-bold tracking-tight text-foreground` → "Sign in to your account"
- Form fields (same structure as existing marketplace login):
  - Email Address label + input
  - Password label + input
  - "Forgot password?" link right-aligned, `text-sm text-emerald-600 hover:text-emerald-700`
- Sign In button: `w-full h-11 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors`
- Thin divider + "DEMO ACCESS" label in `text-xs font-medium uppercase tracking-widest text-muted-foreground`
- Demo links (`text-sm text-muted-foreground hover:text-foreground`):
  - → Open as PMU Admin  (href="/dashboard")
  - → Open as World Bank Reviewer  (href="/dashboard")
  - → Open as Programme Officer  (href="/dashboard")
- Bottom: `text-xs text-muted-foreground text-center` → "Access restricted to authorised DARES programme participants."

No "Don't have an account?" or "Request access" line — DARES is invite only.

**Right panel** (`relative w-1/2`, full height via parent min-h-screen):

- next/image with `fill` and `className="object-cover object-center"`
- Image src: `/images/image23.jpg` (sunset rooftop solar — wide, cinematic)
- Overlay: `<div className="absolute inset-0 bg-black/40" />`
- Bottom content: `<div className="absolute bottom-8 left-8 right-8">`
  - Quote: `text-white text-xl font-semibold leading-snug mb-4` → "Managing Nigeria's $750M clean energy transition."
  - Three trust badge pills below: `inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white mr-2 mb-2`
    - ✓ World Bank DARES Programme
    - ✓ Nigerian NDPA Compliant
    - ✓ Federal Ministry of Power

### Full page wrapper
```tsx
export default function DaresLoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="flex w-1/2 flex-col justify-center px-16 py-12 bg-background">
        {/* content here */}
      </div>
      {/* Right panel */}
      <div className="relative w-1/2">
        {/* next/image fill + overlay + bottom badges */}
      </div>
    </div>
  )
}
```

No navbar. No footer. Standalone page.

---

## PHASE 5 — TYPECHECK

Run from monorepo root:
```bash
pnpm typecheck
```

Fix every error. Rules:
- No `any`, no `@ts-ignore`
- next/image `fill` requires the parent to have `position: relative` — confirmed via `relative` class on right panel div; height is satisfied by `min-h-screen` on the flex wrapper
- Do NOT touch `apps/web/app/marketplace/` except updating `/login` → `/login/marketplace` and `/register` → `/register/marketplace` links
- Do NOT commit or push

Re-run until 0 errors.
