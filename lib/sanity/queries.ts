// ============================================================================
// GROQ QUERIES
// One query per content shape, matching the schemas in
// sanity/schemaTypes/*.ts and the TypeScript types in lib/data/fallback/*.ts.
// Keep projections explicit (rather than `...`) so the shape returned to
// the app is predictable and matches our TS types.
// ============================================================================

const propertyProjection = /* groq */ `{
  "slug": slug.current,
  "citySlug": city->slug.current,
  "city": city->name,
  name,
  tagline,
  status,
  shortDescription,
  description,
  coverImage,
  gallery,
  guestCapacity,
  bedrooms,
  bathrooms,
  amenities,
  checkIn,
  checkOut,
  highlights,
  neighbourhood,
  mapLink,
  houseRules,
  tags,
  pricing
}`;

export const propertiesQuery = /* groq */ `*[_type == "property"] | order(name asc) ${propertyProjection}`;

export const propertyBySlugQuery = /* groq */ `*[_type == "property" && city->slug.current == $citySlug && slug.current == $slug][0] ${propertyProjection}`;

const cityProjection = /* groq */ `{
  "slug": slug.current,
  name,
  state,
  description,
  image,
  featured
}`;

export const citiesQuery = /* groq */ `*[_type == "city"] | order(name asc) ${cityProjection}`;

const journalProjection = /* groq */ `{
  "slug": slug.current,
  title,
  city,
  category,
  coverImage,
  introduction,
  body,
  "relatedPropertySlug": relatedProperty->slug.current,
  mapLink,
  publishedDate,
  featured,
  isPlaceholder
}`;

export const journalPostsQuery = /* groq */ `*[_type == "journalPost"] | order(publishedDate desc) ${journalProjection}`;

export const journalPostBySlugQuery = /* groq */ `*[_type == "journalPost" && slug.current == $slug][0] ${journalProjection}`;

export const founderQuery = /* groq */ `*[_type == "founder"][0]{
  name,
  title,
  story
}`;

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  email,
  phoneDisplay,
  whatsappNumber,
  instagramHandle,
  instagramUrl
}`;
