# LIVORAA STAYS — Website

A production-ready Next.js website for LIVORAA STAYS, a boutique Indian
hospitality brand. Built with Next.js (App Router), TypeScript and
Tailwind CSS.

## What's in this project

- **Home, Our Stays, Property Detail, The LIVORAA Experience, Our Story,
  Journal / City Guides, Contact, Booking Enquiry, and all three legal
  pages** (Privacy Policy, Terms & Conditions, Cancellation & Refund
  Policy).
- A structured, CMS-ready data layer (`lib/data/`) — no property, city or
  article content is hardcoded inside components.
- A working WhatsApp enquiry generator (booking flow + individual
  property pages).
- A real contact form architecture (see "Contact form" below).
- SEO: per-page metadata, Open Graph/Twitter cards, sitemap.xml,
  robots.txt, and LodgingBusiness structured data on property pages.
- No fabricated property photography. Every image slot currently renders
  a generative, brand-consistent placeholder texture
  (`components/EditorialFrame.tsx`) instead of a fake hotel photo — see
  "Adding real photography" below.

## Local development

Requirements: Node.js 18.18+ (or 20+) and npm.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Editing content

There are now two ways to edit content — pick whichever fits where you are:

**With Sanity connected (recommended):** edit everything in Studio at
`/studio` — properties, cities, journal posts, site settings and the
founder story. Changes appear on the live site without a redeploy (on
the next request/revalidation).

**Without Sanity (fallback data):** edit the static arrays directly in
`lib/data/fallback/`:

| File | Controls |
|---|---|
| `lib/data/siteSettings.ts` | Brand name, tagline, email, WhatsApp number, Instagram handle/URL, WhatsApp message templates, founder-section toggle |
| `lib/data/fallback/properties.ts` | All property/stay data (add a new property here to have it appear everywhere automatically, including its own detail page at `/stays/[city]/[slug]`) |
| `lib/data/fallback/cities.ts` | Destination cities shown across the site |
| `lib/data/fallback/journal.ts` | Journal / city guide articles |
| `lib/data/fallback/founder.ts` | Founder name, title and story (business/legal contexts only) |
| `lib/data/navigation.ts` | Header and footer navigation links |

Either way, pages always import from `lib/data/properties.ts`,
`cities.ts`, `journal.ts` and `founder.ts` (not the `fallback/`
subfolder directly) — those files contain the Sanity-first,
fallback-second logic described in "Sanity CMS" below.

### Adding a new property

With Sanity: create a new Property document in Studio.
Without Sanity: add an object to the `fallbackProperties` array in
`lib/data/fallback/properties.ts`. Set `status: "coming-soon"` if it
isn't open yet — the detail page automatically renders the Coming Soon
layout with a waitlist CTA instead of full booking details.

### Adding a new city

With Sanity: create a new City document in Studio.
Without Sanity: add an object to `lib/data/fallback/cities.ts`. It
appears automatically in the homepage Destinations section and the Our
Stays filters.

## Adding real photography

This first version intentionally avoids generating or using fake hotel
photography. Every image slot is rendered by
`components/EditorialFrame.tsx`, a generative placeholder texture keyed
off a `seed` string (usually the property slug), so placeholders stay
visually distinct and consistent.

To add real photography once available:

1. Add the image files under `public/images/...` (paths already exist
   as string values in `lib/data/properties.ts`, `cities.ts`, etc. —
   they're unused until you point real `<Image>` components at them).
2. Replace the relevant `<EditorialFrame ... />` usage with a standard
   `next/image` `<Image src={...} alt={...} fill />` component.
3. No other changes are required — layout, aspect ratios and hover
   states are already built around the same containers.

## Contact form

The contact form (`components/ContactForm.tsx`) and the "Send a booking
enquiry" flow use different mechanisms:

- **Booking Enquiry flow** (`/enquire`) always works out of the box — it
  opens WhatsApp with a pre-filled message, no backend required.
- **Contact page form** (`/contact`) submits to a secure server-side API
  route at `app/api/contact/route.ts`. This route runs on the server
  only, so any real credentials you add (e.g. an email provider's API
  key) are never exposed in frontend code or the browser bundle.

The route already includes:
- Required-field and format validation (name, email, phone, message)
- A hidden honeypot field to silently reject basic bots
- A small in-memory rate limiter per IP address

To actually send emails from submissions, wire up a provider inside
`app/api/contact/route.ts` (a Resend example is sketched in a comment
there), and add its API key as a **private** environment variable (no
`NEXT_PUBLIC_` prefix) in `.env.local` and in your Vercel project
settings. Until a provider is connected, the route validates and
acknowledges submissions but does not yet deliver an email — guests are
also given WhatsApp and phone as direct alternatives on the Contact page.

## Contact & business information

Guest-facing contact details (email, phone, WhatsApp) live in
`lib/data/siteSettings.ts`. Founder/business contact details used only
in partnership, business and legal contexts live in
`lib/data/founder.ts` — edit `founder.story` there with real content
whenever it's ready; it currently holds a short, neutral placeholder
rather than an invented biography.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact form submission endpoint (see above) |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL, used in metadata/sitemap |

## Deployment (Vercel)

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** → import the GitHub repo.
3. Framework preset: Next.js (auto-detected). No custom build settings
   needed.
4. Add the environment variables from `.env.example` under **Project
   Settings → Environment Variables**.
5. Deploy.

### Connecting a custom domain

1. In the Vercel project, go to **Settings → Domains** and add your
   domain (e.g. `livoraastays.com`).
2. Vercel will show DNS records to add at your domain registrar — either
   an `A` record (apex domain) or a `CNAME` record (subdomain like
   `www`).
3. Once DNS propagates, Vercel issues an SSL certificate automatically.
4. Update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy so
   sitemap/canonical URLs are correct.

## Sanity CMS

This project is wired to [Sanity](https://www.sanity.io) as its content
backend, with a **fallback strategy**: if Sanity isn't configured (no
project ID set), every page renders from the static data in
`lib/data/fallback/` instead — nothing breaks, nothing needs Sanity to
exist yet. This is what lets `npm install && npm run build` succeed on a
machine that has never created a Sanity project.

### How the fallback strategy works

Every content type has three layers:

1. **Schema** — `sanity/schemaTypes/*.ts` (property, city, journalPost,
   founder, siteSettings)
2. **Fallback data** — `lib/data/fallback/*.ts` (the original static
   arrays)
3. **Data-access layer** — `lib/data/*.ts` (e.g. `getProperties()`,
   `getPropertyBySlug()`) — this is the *only* place pages/components
   import content from. Each function calls `safeSanityFetch()`
   (`lib/sanity/client.ts`), which:
   - returns `null` immediately if `NEXT_PUBLIC_SANITY_PROJECT_ID` isn't
     set — no network call is attempted
   - catches any fetch error (bad query, project not found, network
     issue) and returns `null` rather than throwing
   - the calling function then falls back to the static array

So the build/runtime behaviour is always one of: real Sanity content →
fallback data → (never) a crash.

### Setting up a real Sanity project

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
2. Note your **Project ID** and create a dataset (e.g. `production`)
3. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
4. Run `npm run dev` and open **http://localhost:3000/studio** — this is
   the embedded Sanity Studio (`sanity.config.ts`,
   `app/studio/[[...tool]]/page.tsx`). Log in with your Sanity account.
5. In the Studio, add your Cities first, then Properties (which
   reference a City), then Journal Posts, then fill in the Site Settings
   and Founder singletons.
6. Once documents exist, the live site automatically starts rendering
   them instead of the fallback data — no code changes needed.

### Migrating the existing fallback content into Sanity

The fastest path is to re-enter the existing cities/properties/journal
posts directly in Studio (there are only 3 properties, 3 cities and 4
articles) — the fallback files in `lib/data/fallback/*.ts` are your
copy-paste source. For a larger dataset, Sanity supports scripted
imports via `sanity dataset import` and the `@sanity/client` mutate API;
see [Sanity's import docs](https://www.sanity.io/docs/importing-data).

### Images

Sanity-hosted images are served through `lib/sanity/image.ts`
(`urlFor(source).width(...).url()`), backed by the Sanity CDN. Until
real photography is uploaded to Sanity, property/city/journal image
fields will simply be empty in Studio and the site keeps using the
generative `EditorialFrame` placeholder texture described below — the
same "add real photos later" path applies, just via Studio instead of
local files.

### Deploying with Sanity on Vercel

Add the same three `NEXT_PUBLIC_SANITY_*` environment variables (and
`SANITY_API_READ_TOKEN` if you're using draft content) under **Vercel
Project Settings → Environment Variables**. The `/studio` route deploys
as part of the same Next.js app — no separate Sanity hosting or deploy
step is required.

## The arch portal: a real 3D scene (Three.js / React Three Fiber)

The homepage's signature moment is a genuine WebGL 3D scene — a
scroll-driven camera dolly through a receding corridor of extruded
archway geometry, ending with the LIVORAA wordmark settling into view.
Desktop and mobile are **two separately art-directed scenes**, not one
scene scaled by CSS.

### Architecture

| File | Role |
|---|---|
| `lib/three/archPortalConfig.ts` | Desktop and mobile scene configs: camera keyframes (position, look-at, FOV), archway geometry scale/spacing/segment count, logo placement, scroll distance, DPR caps |
| `components/three/ArchGeometry.tsx` | Builds the archway frame as real extruded 3D geometry (`THREE.Shape` + `ExtrudeGeometry` with a cut-out hole) — not a flat image |
| `components/three/LogoPlane.tsx` | Draws "LIVORAA" onto a canvas texture using the site's existing brand serif (reads the already-loaded `--font-editorial` variable — no extra font fetch) and maps it onto a plane that fades/scales in near the end of the scroll |
| `components/three/CameraRig.tsx` | Applies the active config's camera path at the current scroll progress |
| `components/three/ArchPortalScene.tsx` | Composes arches + lighting + logo + camera rig — pure scene content, no DOM/scroll logic |
| `components/three/ArchPortalCanvas.tsx` | The `<Canvas>` itself: `frameloop="demand"` (renders only when something changes, not continuously) and per-breakpoint DPR |
| `components/ArchPortal.tsx` | The wrapper: tracks scroll progress, picks the desktop/mobile config, handles the reduced-motion fallback, and mounts/unmounts the WebGL canvas based on proximity to the viewport |

### Desktop vs. mobile — genuinely separate scenes

Both configs live side by side in `lib/three/archPortalConfig.ts` so
they're easy to compare and re-tune. They differ in every dimension the
brief called out:

- **Camera**: mobile uses a wider FOV (62–66° vs. desktop's 42–50°) and
  a closer starting position — this is what keeps the archway looking
  intentional in a narrow portrait frame instead of cropped or stretched.
- **Geometry**: mobile arches are proportioned taller-and-narrower to
  read as a portrait doorway, spaced tighter (no dead dark gap between
  them), and built with fewer curve segments (22 vs. 40) to reduce
  triangle count on typically less powerful GPUs.
- **Scroll distance**: mobile's scroll wrapper is shorter (260vh vs.
  320vh) — the same journey, paced for a smaller screen.
- **Logo**: sized and positioned to sit fully inside a portrait frame at
  the final camera position, on both configs.

To re-tune either scene (camera path, arch proportions, timing), edit
the relevant config object — no changes needed in the scene components.

### Performance choices

- **`frameloop="demand"`**: React Three Fiber only renders when a prop
  feeding the scene changes (scroll progress) or something explicitly
  calls `invalidate()` — there is no continuous 60fps render loop
  running in the background.
- **Canvas mount/unmount**: `ArchPortal.tsx` uses an `IntersectionObserver`
  with a generous `rootMargin` to fully unmount the `<Canvas>` (tearing
  down the WebGL context) when the section is well outside the
  viewport, and remount it just before it scrolls into view.
- **DPR caps**: `[1, 2]` on desktop, `[1, 1.5]` on mobile, via the
  `dpr` prop on `<Canvas>`.
- **Geometry complexity**: controlled per-breakpoint via `arch.segments`
  in the config.

### Reduced motion

Under `prefers-reduced-motion`, the WebGL canvas is never mounted at
all — `ArchPortal.tsx` renders a static framed version of the settled
end-state (the LIVORAA mark, no camera movement) using the existing 2D
`EditorialFrame` placeholder texture. This is a deliberate accessibility
choice, distinct from the mobile-vs-desktop art direction above.

### Testing checklist (do this on your machine — I can't run WebGL here)

After `npm install && npm run dev`, check the homepage at each of these
viewports, at each scroll stage:

**Viewports:** 360×800, 375×812, 390×844, 400×904, 430×932

**Arch portal (logo journey) — check at each viewport:**
1. Opening state — composition should feel intentional, not mostly
   empty dark space
2. ~25%, ~50%, ~75% scroll progress
3. ~90% — architecture aligning, palette beginning to lighten
4. 100% — the **complete** lockup: double-line arch icon, LIVORAA,
   tracked STAYS, both rules, all visible, centered, uncropped, on the
   lightened backdrop
5. Scrolling back up should reverse the whole sequence smoothly

**Property discovery journey — check at each viewport:**
1. Section entry and first property's active state
2. Transition between every property (not just the first one)
3. Overlap/midpoint states between two panels
4. Text readability throughout — no collision with the image, nothing
   pushed outside the viewport
5. CTA is tappable (44px min height) and not obscured mid-transition
6. No horizontal overflow/scrollbar at any point
7. Sticky section releases cleanly into the next section on both scroll
   directions
8. Final property's exit state

**Also verify:**
- Desktop (≥1024px wide) still matches the original cinematic dolly and
  property sequence — mobile config changes should have zero effect
  above the 767px breakpoint
- With OS-level "reduce motion" turned on: arch portal shows the static
  fallback immediately (no camera movement); property section shows the
  plain accessible grid
- `/studio` still loads and existing property/city/journal documents
  still render
- TypeScript: `npm run build` reports no type errors
- No React "missing key" warnings in the console for either scroll
  sequence
- No hydration warnings on initial load
- Frame rate holds up reasonably on a mid-range phone — if it doesn't,
  the first levers to pull are `arch.segments`/`dpr` in
  `mobileArchPortalConfig` and the perspective/scale values in
  `mobilePropertyDiscoveryConfig`

### The complete LIVORAA STAYS lockup reveal

The final state of the arch portal now resolves into the **complete
official mark** — double-line arch icon, LIVORAA wordmark, tracked
STAYS, and both flanking rules — matching the reference logo, not just
the word "LIVORAA":

- `components/three/ArchGeometry.tsx` — `HeroArchIcon` builds the
  double-line arch + ground line as real extruded outline geometry
  (two concentric thin rings), separate from the large walkthrough
  corridor arches.
- `components/three/LogoPlane.tsx` — draws the LIVORAA wordmark plus
  manually letter-tracked "STAYS" and both rules onto a canvas texture
  (no arch here — the icon above it is the real 3D `HeroArchIcon`).
- `lib/three/archPortalConfig.ts` — `getResolveState()` computes, from
  progress: how far the trailing corridor arches have faded out, and
  how far the palette has shifted from the dark corridor to the brand's
  light resolved backdrop (background, fog, and the arch icon/wordmark
  color all lerp together). Both timings are configured per-breakpoint
  under each config's `resolve` block.
- The reveal is staged, not a flat fade-in of the uploaded logo image:
  the corridor dissolves first, the icon settles fractionally ahead of
  the wordmark/STAYS text, and the backdrop lightens in step — reading
  as the architecture itself resolving into the identity.

### Mobile property discovery — genuinely choreographed, not a fallback

The "Our Stays" scroll section (`components/ImmersivePropertyDiscovery.tsx`)
no longer drops to a plain grid on mobile — only under
`prefers-reduced-motion` (an explicit accessibility signal, not a
viewport-size decision). Mobile now runs the same panel-advancing
choreography as desktop, on separately tuned parameters in
`lib/motion/propertyDiscoveryConfig.ts`:

- Gentler perspective (`2200px` vs. desktop's `1400px`) and a smaller
  `rotateY`/`translateX` swing, so panels tilt and slide without
  looking distorted or flying off-frame in a narrow portrait viewport
- A shorter, wider image aspect ratio (`4:3` vs. desktop's `4:5`) so the
  photo and text both fit comfortably within one screen height without
  overlapping
- More scroll distance per property (118vh vs. 100vh) so the pacing
  feels intentional rather than rushed on a smaller screen
- A smaller clip-path inset ceiling, tuned so the image-reveal mask
  reads clearly at mobile sizes instead of over-cropping
- CTA buttons keep a 44px minimum tap height

- `components/RevealText.tsx` — word-by-word editorial typography
  reveal for major headings, reduced-motion safe.
- `components/HeroParallax.tsx` — background parallax layer in the
  hero, desktop-only.
- `components/ImmersivePropertyDiscovery.tsx` — the scroll-pinned
  property showcase further down the homepage (separate from the arch
  portal), with its own plain-grid fallback on mobile/reduced motion.

## A note on verifying the build

This project was developed in a sandboxed environment with **no internet
access**, so `npm install` and `npm run build` could not be executed
here to produce a verified pass/fail. Every file was written and
statically reviewed (brace/paren/type-shape consistency, import
resolution) with care, but you should run the following yourself before
deploying, since it's the only way to get a real compiler/bundler result:

```bash
npm install
npm run build
```

If it fails, paste the exact error back — 95% of the time with a project
this size it's a single missing type annotation or an out-of-sync
dependency version, both quick fixes.

- No database — all content is file-based, per the brief. A headless CMS
  can be layered in later by swapping the data-fetching functions in
  `lib/data/` for API calls, without touching page/component code.
- No payment processing — the booking flow generates a WhatsApp enquiry
  only, ready to be extended with a real booking engine later.
- No fake reviews, testimonials, pricing, founding dates, press mentions,
  or team details are included anywhere on the site.
- The Founder section on the About page is present in code but disabled
  by default (`showFounderSection` in `lib/data/siteSettings.ts`).
