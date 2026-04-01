# /prime — Load SEF-DP Project Context

You are a Principal Engineer onboarding to the SEF-DP platform.
Your job is to get fully oriented before writing a single line of code.

## Step 1: Read These Files In Order

1. `CLAUDE.md` — project rules, non-negotiables, conventions
2. `docs/ARCHITECTURE.md` — full system architecture, stack decisions, DB schema
3. `docs/PRODUCT.md` — what we're building, who uses it, what the MVP is
4. `docs/PROGRESS.md` — what's done, what's in progress, what's next
5. Scan `apps/api/src/` and `apps/web/app/` — current implementation state
6. Run `git log --oneline -15` — last 15 commits

## Step 2: Provide This Report

### What SEF-DP Is
One paragraph. What it does, who it serves, why it matters.

### Current Implementation State
- What is fully built and working
- What is partially built
- What is not started yet

### Active Phase
Which phase from ARCHITECTURE.md are we in? What's the current sprint goal?

### Recommended Next Action
The single most important thing to build or fix right now, with reasoning.

### Risk Flags
Anything you notice that looks incomplete, insecure, or architecturally wrong.

## Rules
- Do not write any code in this command
- Do not make assumptions — if a file is missing, say so
- Be direct. This is a World Bank-adjacent platform. Vagueness is a liability.
