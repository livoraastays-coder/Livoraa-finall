# /public/images

This folder is intentionally empty of property photography.

Per the project brief, no fake or AI-generated property photos are used.
Every image slot on the live site currently renders a generative
placeholder texture (see `components/EditorialFrame.tsx`).

When real photography or brand film becomes available, you have two options:

**With Sanity connected (recommended):** upload images directly to the
relevant Property / City / Journal Post document in Studio (`/studio`).
No filesystem changes needed — `lib/sanity/image.ts` handles serving
them via the Sanity CDN.

**Without Sanity (fallback data):** drop files into the relevant
subfolder here (`properties/`, `cities/`, `journal/`) using the same
filenames already referenced in `lib/data/fallback/properties.ts`,
`cities.ts` and `journal.ts`, then swap the corresponding
`<EditorialFrame />` usage for a `next/image` `<Image>` component, as
described in the main README.
