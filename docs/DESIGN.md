# UI / UX Design Document

Personal portfolio for Pratik Nath Tiwari. Visual and interaction design source of truth. When code and this doc disagree, prefer the code and update this file.

**Primary sources:** `src/app/global.css`, `src/components/theme-switch.css`, marketing layout/views, UI under `src/components/`.

---

## 1. Overview

### Product surface

Narrow-column personal site: intro, tech stack, work history, projects, GitHub + listening activity, blog, about, legal, contact/resume from the footer.

### Design intent

| Principle | What it means in the UI |
| --- | --- |
| Engineer-dense, not marketing-loud | One reading column, muted type, hatch section bars, no hero collage or stat strip |
| Dark-first | Default theme is dark when preference is unset |
| Token-driven | Semantic HSL CSS variables for light and dark; brand accent is teal |
| Pattern language, not flat voids | Diagonal hatch bars, blog dot grid, tech cell grid, contribution week grid. **The home page canvas itself is flat** (`bg-background`); patterns are applied to specific chrome, not the whole viewport |
| Sharp editorial chrome | Many surfaces use `rounded-none` even though the global radius token is soft |
| Motion with purpose | Stagger, graph pop-in, feed rotation; respect `prefers-reduced-motion` |
| Degrade gracefully | Skeletons and empty states when APIs fail |

---

## 2. Background and pattern system

There is **no full-bleed background grid on the marketing shell**. Body/main use solid `bg-background`. Patterning is intentional and local.

### 2.1 Dot grid (`.bg-pattern`)

Used on **blog post** surfaces (`views/marketing/blog/post.tsx`).

| Property | Value |
| --- | --- |
| Base fill | `hsl(var(--background))` |
| Dots | `radial-gradient(hsl(var(--foreground) / 0.07) 1px, transparent 1px)` |
| Pitch | `background-size: 16px 16px` |
| Feel | Subtle editorial paper; readable under prose |

### 2.2 Diagonal hatch (primary chrome pattern)

Same recipe appears in three places:

```
repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 2px,
  hsl(var(--foreground) / α) 2px,
  hsl(var(--foreground) / α) 3px
)
```

| Surface | Alpha | Height / role |
| --- | --- | --- |
| `.full-width-header` | `0.03` | Full-bleed section title bars (44px / 48px `sm+`) |
| `.screen-border::before` | `0.05` | 12px band behind a 1px hairline divider (blog meta → body) |
| Work-experience `Skill` chips | `0.05` | Inline skill pills with hatch fill |

Optional motion: `.animate-pattern-flow` drifts hatch background-position over **60s** (`pattern-flow` keyframes, `-42.4264px` diagonal step ≈ √2 × 30).

Optional tint: `.hue-overlay::before` lays a brand/primary horizontal shimmer (`tech-shimmer`, 8s) over the hatch.

`Heading` can also layer Tailwind gradients (`bg-gradient-to-br` + `from/via/to-background/*`) via `bgDirection` / `colorPattern` (Activity uses `diagonal` + `dark`).

### 2.3 Full-bleed rules and viewport lines

| Mechanism | Where |
| --- | --- |
| Column rails | `border-x border-border/50` on main + footer inner (`max-w-2xl`) |
| Hatch breakout | `.full-width-header` uses `100dvw` + negative margins to escape the column |
| Tech stack edge lines | Absolute `w-dvw` top/bottom borders centered on the grid (`-translate-x-1/2 left-1/2`) so the tech block visually clips the full viewport width while content stays in-column |
| Blog hatch bleed | Under `.blog-layout`, header width uses spacing multipliers instead of `100dvw` |

### 2.4 Layout grids (structure, not wallpaper)

| Grid | Spec | Purpose |
| --- | --- | --- |
| Tech stack | `grid-cols-2 md:grid-cols-4`; cells with `border-r` / `border-b`; alternating `bg-secondary` | Logo wall |
| Contribution calendar | CSS grid `repeat(weeks, 1fr)` × 7 rows; `gap-[3px]`; cells `aspect-square rounded-[2px]` | GitHub-style year map |
| Blog prev/next | `grid-cols-1 sm:grid-cols-2 gap-4` | Post navigation |
| OG image | Radial dots at **40px** pitch, `#333` on dark gradient (separate from CSS `.bg-pattern`) | Social cards |

### 2.5 What is *not* a page background

- Home, about, projects list, activity: flat background + borders/hatch only on chrome.
- Scrollbars are always dark-themed chrome (not patterned).
- Theme switch night sky is self-contained inside the toggle, not the page.

---

## 3. Color system

### Semantic tokens

Defined in `src/app/global.css` (`:root` / `.dark`), mapped into Tailwind via `@theme` as `--color-*`.

| Token | Light (HSL channels) | Dark | Role |
| --- | --- | --- | --- |
| `--background` | `0 0% 100%` | `0 0% 7%` | Page canvas |
| `--background-secondary` | `0 0% 96%` | `0 0% 8.6%` | Subtle alternate surface |
| `--foreground` | `0 0% 20%` | `0 0% 85%` | Primary text |
| `--muted` | `220 14% 96%` | `0 0% 18%` | Quiet fills |
| `--muted-foreground` | `0 0% 40%` | `0 0% 63%` | Secondary / helper text |
| `--primary` | `222 47% 11%` | `0 0% 90%` | Strong UI (buttons, emphasis) |
| `--primary-foreground` | `0 0% 98%` | `0 0% 7%` | Text on primary |
| `--secondary` / `--accent` | `220 14% 96%` | `0 0% 18%` | Soft fills / hover washes |
| `--border` / `--input` | `220 13% 91%` | `0 0% 18%` | Dividers, rails, inputs |
| `--ring` | `222 47% 11%` | `0 0% 90%` | Focus rings |
| `--card` / `--popover` | match background / foreground | same | Elevated panels |
| `--destructive` | coral red with alpha | same | Errors / danger |

Sidebar tokens mirror the main set for future admin-like chrome.

### Brand accent

| Token | Value | Approx feel |
| --- | --- | --- |
| `--brand-400` | `167.8 53.25% 65%` | Soft teal |
| `--brand-500` | `167.8 53.25% 54.71%` | Stronger teal |

Constant across themes. Used for contribution intensity, hue overlays, demo triggers, focus rings on graph cells.

### Contribution level → color

| Level | Commits (approx) | Class |
| --- | --- | --- |
| 0 | 0 | `bg-neutral-200 dark:bg-neutral-900/70` |
| 1 | 1–3 | `bg-brand-500/30` |
| 2 | 4–6 | `bg-brand-500/50` |
| 3 | 7–9 | `bg-brand-500/75` |
| 4 | 10+ | `bg-brand-500` |

Today: `ring-2 ring-brand-500 ring-offset-1 ring-offset-background`.

### Syntax highlighting (`--sh-*`)

| Token | Light role | Dark role |
| --- | --- | --- |
| `--sh-background` / `--sh-border` | Cool gray panel | Near-black panel |
| `--sh-text` | Near-navy | Near-white |
| `--sh-keyword` | Magenta-red | Soft coral |
| `--sh-string` | Green | Cyan |
| `--sh-function` | Violet | Lavender |
| `--sh-number` | Orange | Gold |
| `--sh-tag` | Blue | Mint |
| `--sh-comment` / operators | Muted gray | Mid gray |

### Theme switch (local hex palette)

Day `#3d7eae` → `#5490c0`, night `#1d1f2c`, sun `#ecca2f`, moon `#c4c9d1`, clouds `#f3fdff` / `#aacadf`. Not wired to semantic tokens.

### Scrollbar

Always dark: track `rgb(15 15 15)`, thumb `rgb(60 60 60)` → hover `rgb(90 90 90)`, 8px.

### Color usage rules

1. Prefer semantic tokens over raw hex.
2. Hierarchy via opacity (`border-border/50`, `text-muted-foreground/80`).
3. Brand teal for activity + selective accents only.
4. Destructive stays soft (alpha).

---

## 4. Typography

### Font loading vs tokens

| Layer | Reality |
| --- | --- |
| Root `<html>` | Geist Sans + Geist Mono CSS variables (`layout.tsx`) |
| Tailwind `--font-sans` | `"Ubuntu Sans", system-ui, …` in `@theme` **without** loading Ubuntu Sans |
| Practical outcome | `font-sans` tends to system UI; Geist present but not wired into `--font-sans` |
| Mono voice | Bios / technical blurbs: `font-mono tracking-tight` |

### Scale and weight

| Role | Spec |
| --- | --- |
| Page title (`PageHeader`) | `text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight` |
| Home name | `text-xl font-semibold tracking-tight` |
| About name | `text-2xl font-semibold tracking-tight` |
| Section titles (hatch) | `text-sm font-medium text-muted-foreground` |
| Body / bio | `text-sm` + muted; mono for engineer blurbs |
| Tech labels | `text-[10px] font-medium leading-4 text-muted-foreground` |
| Skill / chip | `text-xs` |
| Footer brand | `text-lg font-semibold` + primary-colored `.` in `name.dev` |

### Prose (blog)

- `.prose { text-wrap: balance }`
- Paragraphs `line-height: 1.75`
- `h3` ~1.125rem / medium; `h4` ~1rem / medium
- Blockquote: 2px left border, italic, muted
- Classes: `prose-quoteless prose-neutral dark:prose-invert`
- Work experience list bullets use mono `+` markers via `before:content-['+']`

---

## 5. Spacing, radius, elevation, icons

### Spacing rhythm

| Token / pattern | Use |
| --- | --- |
| `px-4 md:px-5` | Standard in-column horizontal pad |
| `py-6` | Main top/bottom |
| `space-y-6` | Home / about major blocks |
| `space-y-4` | Section groups, activity stack |
| `pt-3` / `pt-4` / `pb-6` | Content under hatch headers |
| `gap-2` / `gap-3` / `gap-4` | Chips, socials, grids |
| Footer | `py-8 md:py-12` |

No separate spacing scale file; Tailwind spacing is the system.

### Radius

| Token / class | Value / use |
| --- | --- |
| `--radius` | `0.375rem` |
| `--radius-lg/md/sm` | derived |
| Buttons / inputs | `rounded-md` |
| Contribution cells | `rounded-[2px]` |
| Avatars | `rounded-full` + `border-2 border-border/50` |
| Editorial / tooling | Prefer `rounded-none` (subsections, about social chips, day dialog, many borders) |

### Elevation / shadow

| Surface | Treatment |
| --- | --- |
| Default page | Flat; depth from borders and hatch, not cards |
| Avatar | `shadow-sm` |
| Code block | `shadow-xl` → `shadow-2xl` on group hover; `ring-1` on `--sh-border` |
| Activity hover card | `shadow-xl` + `backdrop-blur-md` + `bg-background/95` |
| Contact / popovers | Border + shadow-md style panels |
| Theme switch | Custom inset/outset box-shadows (skeuomorphic toggle) |
| Admin glass (reserved) | `backdrop-filter: blur(12px)` + translucent card |

### Iconography

| Library | Use |
| --- | --- |
| `lucide-react` | UI chrome (briefcase, mail, git, chevrons, etc.) |
| `react-icons/si` | Brand logos in tech stack |

Common sizes: `size-3` / `size-3.5` / `size-4` in text rows; tech icons `h-8 w-8 md:h-10 w-10` at `text-foreground/60` → hover full foreground. Plus decorators on tech grid: `size-6`, `strokeWidth={1}`, `text-muted-foreground/50`.

### Borders

- Rails and section dividers: usually `border-border/50` or `/40`
- Hairlines: 1px
- Focus: `ring-2 ring-ring` (or `ring-brand-500` on graph)

### Z-index (observed)

| Layer | Approx |
| --- | --- |
| Skip link (focused) | `z-50` |
| Theme switch | `9999` |
| Hover cards / popovers | portal high stacking |
| Hatch content vs hue overlay | content `z-1`, overlay `z-0` |
| Admin sticky sidebar | `z-20` |

---

## 6. Page shell and section layouts

### 6.1 Marketing shell

```
┌─ viewport ──────────────────────────────────────────┐
│  [theme switch: fixed TR / mobile BR]               │
│  ┌─ max-w-2xl + border-x ─────────────────────────┐ │
│  │ breadcrumbs (not on /)                         │ │
│  │ page content                                   │ │
│  └────────────────────────────────────────────────┘ │
│  ┌─ footer same width + border-x ─────────────────┐ │
│  │ brand · email · commit · contact · resume · …  │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

- Shell: `min-h-screen flex flex-col overflow-x-clip`
- Skip link → `#main-content`
- Content width: `max-w-2xl` (~42rem)

### 6.2 Home (`HomeView`) — top to bottom

| # | Section | Header chrome | Body layout |
| --- | --- | --- | --- |
| 1 | **Intro** | None | Row: 56px avatar + name/title; mono bio below. Pad `px-4 md:px-5` |
| 2 | **Tech Stack** | Hatch + `animate-pattern-flow`, `noHeaderMargin` | Mono blurb → **2×4 / 4-col grid** of logo cells; full-viewport top/bottom rules; Plus corner nodes on selected cells; scroll-linked 3D icon flip |
| 3 | **Professional Experience** | Hatch + animated stripes; title links to `/experience` | Accordion timeline: current employer expanded; older roles collapsed; education entry; hatch-filled skill chips; mono `+` bullet lists |
| 4 | **After Hours** | Hatch + animated stripes; title links to `/after-hours` | Vertical project stack; desktop hover expands preview; mobile tap `aria-expanded`; name max-width animates on `md+` |
| 5 | **Activity & Contributions** | `Heading` hatch + diagonal dark gradient wash + year action | Mono blurb → contribution week grid + legend → rotating feed (`rotationInterval={3500}`, 5 items) |
| 6 | **Posts** | Hatch + post count action; title links to `/blog` | Description under `border-b` → teaser list (`line-clamp-2`) |

Outer rhythm: `space-y-6` around intro; inner group `space-y-4`.

Clickable hatch titles use `Section` `titleHref`: title text only (not the full bar), muted → foreground hover, focus ring.

### 6.3 Experience (`/experience`)

| Block | Layout |
| --- | --- |
| Intro | Hatch `Section` “Professional Experience” + mono ledger manifesto + reading note |
| Roster | Hatch `Section` “Roster”; meta strip (company count · current · education) + initial jump nav |
| Dossier | Two-column ledger: mono year/initial rail + company header/meta/description; positions always open with mono `+` bullets and hatch skill chips |
| Motion | `animate-stagger` per dossier |

Home Experience stays accordion/`WorkExperience`. This route is the full open ledger.

### 6.4 After Hours (`/after-hours`)

| Block | Layout |
| --- | --- |
| Intro | Hatch `Section` “After Hours” + mono manifesto + short reading note (not a Blog-style `PageHeader`) |
| Catalog | Hatch `Section` “Catalog”; meta strip (`N projects · shipped · wip` + GitHub handle); full editorial entries |
| Entry | `border-b` stack (no cards): name + mono status/type/platform; body + mono detail; hatch skill chips; git metrics / weekly spark; repo links |
| Motion | `animate-stagger` rise per entry (`70ms` step); respect reduced motion via CSS |

Home After Hours teaser still uses dense hover/tap `ProjectRow`. This route is the thorough reading surface.

### 6.5 Blog (`/blog`)

| Block | Layout |
| --- | --- |
| Intro | Hatch `Section` “Posts” + mono field-notes manifesto + reading note |
| Archive | Hatch `Section` “Archive”; topic hatch-chip filter tabs + sticky year rules; logbook rows (`Mon/day` rail · title/summary · arrow) |
| Topics | Inline filter on this page; `/blog/topics` remains the full topic index |

Home Posts stays the short teaser list. This route is the full archive logbook.

### 6.6 About

| Block | Layout |
| --- | --- |
| Header | Larger avatar (80px), name, title + location with icons, sharp `rounded-none` social chips |
| About Me / Education / Skills / Get In Touch | Each is a hatch `Section`; content `px-4 pt-4 pb-6` |
| Education | Icon well (`rounded-none bg-primary/10 border-primary/20`) + title/school/years |
| Skills | Flex-wrap chips (`bg-secondary/30`, soft hover border) |

### 6.7 Blog post / topics detail

| Surface | Layout |
| --- | --- |
| Post | Sticky/side TOC → **`.bg-pattern`** section → meta client header → **`.screen-border`** hatch divider → `prose max-w-3xl` article → prev/next 2-col grid |
| Topics index / topic archive | Existing topic list and filtered archives |

### 6.8 Legal / 404 / Dev

| Page | Notes |
| --- | --- |
| Privacy / Terms | Sticky bilingual header; scroll-hide on small screens |
| 404 | Narrow `max-w-lg`, muted copy, sharp CTAs |
| `/dev/spotify` | Dev-only OAuth bootstrap; same column feel |

### 6.9 Footer

Same column rails. Brand link, copy-email control, relative last-commit with `AnimatedNumber`, Contact popover, Resume drawer, socials, legal links. Stacks vertically on small screens; row on `md+`.

---

## 7. Motion and animation

### Easing vocabulary

| Name | Curve | Typical use |
| --- | --- | --- |
| Expo-out (primary) | `cubic-bezier(0.16, 1, 0.3, 1)` | Stagger, cards, codeblock, project rows |
| Soft pop | `cubic-bezier(0.22, 1, 0.36, 1)` | Cell pop-in, activity feed |
| Theme overshoot | `cubic-bezier(0, -0.02, 0.4, 1.25)` | Theme switch |
| Theme circle | `cubic-bezier(0, -0.02, 0.35, 1.17)` | Sun/moon travel |
| Accordion | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Collapses |
| Exit | `cubic-bezier(0.4, 0, 1, 1)` | Short exits |

### CSS keyframes

| Animation | Behavior |
| --- | --- |
| `stagger-in` | Fade + rise 12px, 0.4s |
| `cell-pop-in` | Scale 0 → 1.18 → 1, 0.42s |
| `music-bar` | Listening equalizer |
| `pattern-flow` | Hatch drift, 60s |
| `tech-shimmer` | Sweep (2s / 8s hue) |
| `proficiency-fill` | Bar width grow |
| `project-card-hover` | Lift -4px + scale 1.02 |
| `demo-border-march` | Dashed brand border |
| Codeblock suite | enter, exit, collapse/expand, copy, toast, chevron |

`.stagger-1` … `.stagger-8`: 50ms delay steps.

### Motion (JS)

| System | Behavior |
| --- | --- |
| `StaggerProvider` | Base delay **80ms**; `position` or `mount-order`; in-view gate |
| `AnimatedNumber` | Digit reel; static if reduced motion |
| Contribution cells | Staggered pop-in; day dialog spring |
| Activity feed | ~4.5s rotation; pan; spring slide `stiffness: 300`, `damping: 30` |
| Tech cloud | Scroll spring flip `stiffness: 222`, `damping: 45` |
| Project rows | Hover/tap expand; name width transition |
| Theme switch | Decorative night sky (desktop only extras) |
| Contact / Resume | Motion dialog / Vaul |

### Reduced motion

Decorative CSS/JS motion off; cells appear opaque; stagger ready immediately; theme decorations dropped.

**Quirk:** Callout base styles are nested inside the `prefers-reduced-motion: reduce` block in `global.css`, so callouts may only get full styling under reduced motion.

---

## 8. Component inventory

| Component | Variants / notes |
| --- | --- |
| `Button` | `default` `outline` `secondary` `ghost` `link`; sizes `default` `sm` `lg` `icon` |
| `Section` | Optional hatch title, `animatedStripes`, padding flags |
| `Heading` | Hatch + gradient direction/pattern + hue + stripes + action |
| `SubSection` | Sharp bordered mini-panel |
| `TimelineItem` | Rail + icon well |
| `PageHeader` | Responsive `h1` + subtitle/description |
| Skeletons | Shape-matched for tech, activity, graph, blog, work, projects |
| `CodeBlock` | Prism, lines, copy, sharp chrome |
| `ThemeSwitch` | Fixed toggle; idle-loaded |
| Contact popover | Focus trap, honeypot form, email autocomplete |
| Resume drawer | PDF iframe, download, fullscreen `md+` |
| Hover cards | Portal, ~150ms delay; off on touch / &lt;768 |

---

## 9. Feature UX patterns

| Feature | Interaction |
| --- | --- |
| Contribution graph | Click cell → day dialog (commits + tracks); Escape restores focus; tooltips desktop-only |
| Activity feed | Auto-rotate; swipe; music bars when playing |
| Tech stack | Hover brightens icons; scroll flips multi-icon cells |
| Projects | Desktop = hover expand; mobile = tap; lazy preview |
| Work experience | Current open; history/education toggles |
| Blog links | External arrow nudges on hover |
| Footer email | Copy + Sonner toast |

---

## 10. Theme behavior

| Layer | Rule |
| --- | --- |
| Blocking `<head>` script | `dark` or unset → `.dark` |
| `ThemeSwitch` | Unset = dark; persists `dark` / `light` |
| `ThemeInitializer` | May follow `prefers-color-scheme` when unset |

Align these three if product rule is “always dark until choice” vs “follow system when unset”.

---

## 11. Responsive breakpoints

| Breakpoint | Effects |
| --- | --- |
| ≤640px | Theme switch bottom-right; lighter effects |
| ≥640px (`sm`) | Hatch taller; contact anchoring; type steps |
| ≥768px (`md`) | Tech 4-col; footer row; resume fullscreen; legal header |
| ≥1024px (`lg`) | Blog bleed; project hover treated as desktop (`min-width: 1024px` in showcase) |

---

## 12. Accessibility

- Skip link; `main#main-content` focusable
- Focus rings; breadcrumb `aria-current`
- Dialogs: role, Escape, trap/restore
- Labels on theme, socials, graph cells, mobile project rows
- Reduced-motion paths
- `AnimatedNumber` `sr-only` full value
- Meaningful image `alt`s

---

## 13. Performance-related UX

Dynamic sections + matching skeletons; activity deferred via IntersectionObserver; CSS `contain` on blog/activity/code; idle theme switch; React Query keep-previous-data on activity refresh.

---

## 14. Design system checklist

| Area | Covered in this doc | Source of truth |
| --- | --- | --- |
| Color tokens + brand + syntax | Yes | `global.css` |
| Background patterns (dot, hatch, what is *not* patterned) | Yes | `global.css`, blog post, tech grid |
| Layout grids (tech, contribution, blog nav) | Yes | Components above |
| Per-section home / about / blog / footer anatomy | Yes | Views + sections |
| Typography | Yes | `layout.tsx` + CSS |
| Spacing / radius / elevation / icons / z-index | Yes | Tailwind usage |
| Motion + reduced motion | Yes | CSS + Motion |
| Components + feature UX | Yes | `src/components/` |
| Theme + responsive + a11y | Yes | Layout + switch |
| Product/API/data architecture | Out of scope here | Code / README |

---

## 15. Do / don’t

**Do**

- Keep the narrow column + hatch section rhythm
- Use `.bg-pattern` for long-form reading surfaces; hatch for section chrome
- Accent with brand teal sparingly
- Prefer sharp edges for tooling chrome
- Gate decorative motion behind reduced-motion checks

**Don’t**

- Paint a full-page grid on home unless you deliberately change the system
- Introduce purple marketing gradients on product UI (OG still has a legacy indigo bar; treat as debt)
- Add hero cards / stat strips to the first viewport
- Hover-only essential actions on mobile
- New hex colors outside tokens without documenting them

---

## 16. Key files

| Concern | Path |
| --- | --- |
| Tokens, patterns, keyframes, prose | `src/app/global.css` |
| Theme toggle | `theme-switch.tsx` / `.css` |
| Shell / fonts | `src/app/layout.tsx`, `(marketing)/layout.tsx` |
| Home stack | `src/views/marketing/home.tsx` |
| Section / heading chrome | `ui/section.tsx`, `ui/heading.tsx` |
| Tech grid | `landing/tech-stack-cloud.tsx` |
| Activity | `landing/activity/` |
| Projects | `components/projects/` |
| Blog post surface | `views/marketing/blog/post.tsx` |

---

## 17. Future visual work

1. Wire Geist (or load Ubuntu Sans) into `--font-sans`.
2. Align theme default across script / initializer / switch.
3. Fix callout CSS nesting under reduced-motion.
4. Theme-aware scrollbars for light mode.
5. Reconcile OG indigo accent with brand teal.
6. Update this doc in the same PR as visual changes.

---

## Notes

- Home canvas is **flat**. Dot grid and hatch are localized patterns, not a sitewide wallpaper.
- Unused DB schemas are not UI. Do not invent surfaces that are not shipped.
