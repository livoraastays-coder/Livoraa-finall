import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProperties,
  getPropertyBySlug,
  getRelatedProperties,
} from "@/lib/data/properties";
import { siteSettings } from "@/lib/data/siteSettings";
import EditorialFrame from "@/components/EditorialFrame";
import FadeIn from "@/components/FadeIn";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyCard from "@/components/PropertyCard";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ city: p.citySlug, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string; slug: string };
}): Promise<Metadata> {
  const property = await getPropertyBySlug(params.city, params.slug);
  if (!property) return {};

  return {
    title: `${property.name} — ${property.city}`,
    description: property.shortDescription,
    alternates: { canonical: `/stays/${property.citySlug}/${property.slug}` },
    openGraph: {
      title: `${property.name} — ${property.city}`,
      description: property.shortDescription,
      images: [property.coverImage],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: { city: string; slug: string };
}) {
  const property = await getPropertyBySlug(params.city, params.slug);
  if (!property) notFound();

  const related = await getRelatedProperties(property);
  const enquiryMessage = siteSettings.buildPropertyEnquiryMessage(property.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.shortDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressCountry: "IN",
    },
    email: siteSettings.email,
    telephone: siteSettings.phoneDisplay,
  };

  if (property.status === "coming-soon") {
    return (
      <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FadeIn>
          <p className="eyebrow mb-4">{property.city}</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            {property.name}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-walnut">{property.tagline}</p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12">
            <EditorialFrame seed={property.slug} ratio="aspect-[16/9]" label="Coming Soon" />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-12 max-w-xl space-y-5 text-base leading-relaxed text-muted">
            {property.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <WhatsAppButton
              message={`Hello LIVORAA STAYS, please add me to the waitlist for ${property.name} in ${property.city}.`}
              label="Join the waitlist"
            />
            <a
              href={siteSettings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
            >
              Follow along on Instagram
            </a>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-content px-6 pt-16 md:px-10">
        <FadeIn>
          <p className="eyebrow mb-4">{property.city}</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            {property.name}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-walnut">{property.tagline}</p>
        </FadeIn>
      </section>

      <section className="mx-auto mt-10 max-w-content px-6 md:px-10">
        <FadeIn>
          <EditorialFrame seed={property.slug} ratio="aspect-[16/9]" />
        </FadeIn>
        {property.gallery.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {property.gallery.map((g, i) => (
              <FadeIn key={g} delay={i * 80}>
                <EditorialFrame seed={g} ratio="aspect-square" />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl text-ink">About this stay</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {property.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h3 className="mt-12 font-serif text-2xl text-ink">Highlights</h3>
              <ul className="mt-4 space-y-2">
                {property.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted">
                    <span className="text-walnut">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={150}>
              <h3 className="mt-12 font-serif text-2xl text-ink">Amenities</h3>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 sm:grid-cols-3">
                {property.amenities.map((a) => (
                  <li key={a} className="text-sm text-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={200}>
              <h3 className="mt-12 font-serif text-2xl text-ink">Neighbourhood</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                {property.neighbourhood}
              </p>
              {property.mapLink && (
                <a
                  href={property.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
                >
                  View on map
                </a>
              )}
            </FadeIn>

            {property.houseRules.length > 0 && (
              <FadeIn delay={250}>
                <h3 className="mt-12 font-serif text-2xl text-ink">House rules</h3>
                <ul className="mt-4 space-y-2">
                  {property.houseRules.map((r) => (
                    <li key={r} className="text-sm text-muted">
                      {r}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
          </div>

          <div>
            <FadeIn delay={100}>
              <div className="sticky top-28 border border-border bg-surface p-7">
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-6 text-center">
                  <div>
                    <p className="font-serif text-2xl text-ink">{property.guestCapacity}</p>
                    <p className="text-xs text-muted">Guests</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-ink">{property.bedrooms}</p>
                    <p className="text-xs text-muted">Bedrooms</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-ink">{property.bathrooms}</p>
                    <p className="text-xs text-muted">Bathrooms</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-muted">
                  <div className="flex justify-between">
                    <span>Check-in</span>
                    <span className="text-ink">{property.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out</span>
                    <span className="text-ink">{property.checkOut}</span>
                  </div>
                  {property.pricing ? (
                    <div className="flex justify-between">
                      <span>Starting from</span>
                      <span className="text-ink">
                        ₹{property.pricing.startingFrom.toLocaleString("en-IN")} {property.pricing.note}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted">
                      Pricing shared directly based on your dates and group size.
                    </p>
                  )}
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <Link
                    href={`/enquire?property=${property.slug}`}
                    className="bg-ink px-5 py-3 text-center text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut"
                  >
                    Send a booking enquiry
                  </Link>
                  <WhatsAppButton
                    message={enquiryMessage}
                    variant="secondary"
                    label="Enquire on WhatsApp"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 md:px-10">
            <FadeIn>
              <p className="eyebrow mb-4">Related stays</p>
              <h2 className="font-serif text-3xl text-ink md:text-4xl">
                You might also like
              </h2>
            </FadeIn>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {related.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 100}>
                  <PropertyCard property={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
