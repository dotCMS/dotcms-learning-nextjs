# CLAUDE.md

This project is a dotcms frontend render with next.js

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_DOTCMS_HOST=http://localhost:8080
NEXT_PUBLIC_DOTCMS_AUTH_TOKEN=<jwt-token>
NEXT_PUBLIC_DOTCMS_SITE_ID=<site-id>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Key Patterns

- All dotCMS types come from `@dotcms/types`; no `any` types
- Path alias `@/*` → `src/*`
- Tailwind CSS 4 + Radix UI/Shadcn components
- `generateMetadata()` and JSON-LD structured data are generated per-page in the catch-all route
