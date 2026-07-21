# pratiknathtiwari

Personal site for [Pratik Nath Tiwari](https://github.com/pratik97179), software engineer working across Flutter, React, and Next.js.

## What's included

- Homepage with intro, tech stack, work experience, open-source projects, GitHub activity, and recent blog posts
- About page and resume download
- Filesystem MDX blog (topics, reading time, RSS, drafts)
- Project showcase driven by static GitHub repos (AirCursor, ws_client, dependency_inj), with optional commit metadata from the GitHub API
- Contact popover backed by server actions and Postgres
- Optional Spotify / YouTube Music activity feeds when credentials are configured
- Privacy and terms pages

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Drizzle ORM + Postgres
- Motion for UI transitions
- oxlint / oxfmt
- Vitest

## Requirements

- Node.js `24.x` (see `.nvmrc`)
- [Bun](https://bun.sh)
- A Postgres database (needed for contact submissions and activity sync; the homepage still renders without a live DB for static content)

## Quick start

```bash
bun install
cp .env.example .env.local
```

Set at least:

```bash
DATABASE_URL="postgres://..."
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Push the schema, then run the app:

```bash
bun run db:push
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start Next.js in development |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run oxlint |
| `bun run typecheck` | TypeScript check |
| `bun run test` | Run Vitest |
| `bun run check` | Lint + typecheck + tests |
| `bun run format` | Check formatting with oxfmt |
| `bun run format:fix` | Write formatting fixes |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:push` | Push schema to Postgres |
| `bun run db:studio` | Open Drizzle Studio |

## Environment variables

See [`.env.example`](./.env.example) for the full list.

**Required for a basic local run**

- `DATABASE_URL`: Postgres connection string
- `NEXT_PUBLIC_SITE_URL`: public site origin (defaults to `http://localhost:3000` in code if unset)

**Common optional**

- `GITHUB_TOKEN`: higher GitHub API rate limits (project commit stats, activity)
- `ALLOWED_GITHUB_USERNAME`: GitHub username used for activity / access defaults
- `NEXT_PUBLIC_PORTFOLIO_REPO`: repo name shown in the footer commit link
- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`, `SPOTIFY_REDIRECT_URI`: recent listening activity
- `YTM_COOKIE`, `YTM_AUTH_USER`: YouTube Music recent activity
- `IP_INFO_TOKEN`: IP geolocation for the contact / request helpers

Missing optional integrations disable or degrade related features; they do not block the rest of the site.

## Project layout

```
src/
  app/                 # App Router routes (marketing, API, OG, sitemap)
  components/          # UI, home, projects, blog, activity, layout
  features/            # Feature modules (blog, github, spotify, ytmusic)
  server/              # DB, env, GitHub/Spotify/YTM, contact actions
  core/                # Site/profile config and metadata helpers
  views/               # Page-level view compositions
  hooks/               # Client data hooks
```

Blog posts live under `src/app/(marketing)/blog/posts/`.

Open-source projects on the homepage are defined in `src/components/projects/data/static-projects.ts`.

Profile and site identity live in `src/core/config/profile.ts` and `src/core/config/site.ts`.

## Architecture notes

- Server code stays under `src/server` so runtime boundaries stay clear.
- API routes stay thin and call into server domains or actions.
- Blog posts are read from the filesystem, parsed from frontmatter, and enriched with topic and reading time.
- Draft posts stay private unless the visitor is authorized to see them.
- The projects list prefers the static showcase data; GitHub enrichment is best-effort.

## License

[MIT](./LICENSE)
