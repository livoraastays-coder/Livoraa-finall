import Link from "next/link";
import HeroParallax from "@/components/HeroParallax";
import RevealText from "@/components/RevealText";
import FadeIn from "@/components/FadeIn";
import ArchPortal from "@/components/ArchPortal";
import ImmersivePropertyDiscovery from "@/components/ImmersivePropertyDiscovery";
import EditorialFrame from "@/components/EditorialFrame";
import CityCard from "@/components/CityCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProperties } from "@/lib/data/properties";
import { getCities } from "@/lib/data/cities";
import { siteSettings } from "@/lib/data/siteSettings";

const pillars = [
  {
    title: "Thoughtfully Designed",
    text: "Every space is considered for comfort, function and atmosphere — nothing added purely for show.",
  },
  {
    title: "Local, Curated",
    text: "Recommendations that help guests experience the city beyond the obvious first stop.",
  },
  {
    title: "Seamless Stays",
    text: "Simple communication and thoughtful digital guest assistance, from booking to departure.",
  },
  {
    title: "Details That Matter",
    text: "From sleep comfort to arrival and departure, small details shape how a stay is remembered.",
  },
];

export default async function HomePage() {
  const [properties, cities] = await Promise.all([getProperties(), getCities()]);

  return (
    <div>
      {/* SECTION 1 — HERO, with layered parallax background */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border">
        <HeroParallax seed="hero-livoraa" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

        <div className="relative mx-auto max-w-content px-6 py-32 md:px-10">
          <FadeIn>
            <p className="eyebrow mb-6">{siteSettings.brandName}</p>
          </FadeIn>
          <RevealText
            as="h1"
            className="block max-w-2xl font-serif text-6xl leading-[1.05] text-ink md:text-8xl"
          >
            Stay, thoughtfully.
          </RevealText>
          <FadeIn delay={250}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
              Boutique stays shaped by thoughtful spaces, quiet details and
              experiences worth remembering.
            </p>
          </FadeIn>
          <FadeIn delay={350}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/stays"
                className="bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut"
              >
                Explore Our Stays
              </Link>
              <Link
                href="/experience"
                className="border border-ink/30 px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
              >
                Discover LIVORAA
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SIGNATURE MOMENT — The LIVORAA Arch Portal */}
      <ArchPortal />

      {/* SECTION 2 — INTRODUCTION */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-2 md:gap-20">
          <RevealText
            as="h2"
            className="block font-serif text-4xl leading-tight text-ink md:text-5xl"
          >
            We believe a memorable stay lives in the details.
          </RevealText>
          <FadeIn delay={100}>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              LIVORAA curates spaces with attention to comfort, atmosphere,
              everyday convenience and the character of the city they sit
              in. Each stay is designed to feel considered rather than
              staged — a place you'd choose to return to, not just pass
              through.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3 — IMMERSIVE PROPERTY DISCOVERY (replaces flat grid) */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-content px-6 pt-24 md:px-10 md:pt-32">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4">Our Stays</p>
                <h2 className="max-w-lg font-serif text-4xl leading-tight text-ink md:text-5xl">
                  Current and upcoming properties
                </h2>
                <p className="mt-3 max-w-sm text-sm text-muted">
                  Keep scrolling — each stay takes its turn centre stage.
                </p>
              </div>
              <Link
                href="/stays"
                className="hidden text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink md:inline-block"
              >
                View all stays
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10">
          <ImmersivePropertyDiscovery properties={properties} />
        </div>

        <div className="mx-auto max-w-content px-6 pb-16 md:hidden md:px-10">
          <Link
            href="/stays"
            className="text-sm font-medium text-ink underline decoration-border underline-offset-4"
          >
            View all stays
          </Link>
        </div>
      </section>

      {/* SECTION 4 — THE LIVORAA EXPERIENCE */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
        <FadeIn>
          <p className="eyebrow mb-4">The LIVORAA Experience</p>
          <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            What shapes every stay
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 80}>
              <div className="border-t border-border pt-6">
                <p className="mb-3 font-serif text-2xl text-ink">
                  {pillar.title}
                </p>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  {pillar.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <Link
            href="/experience"
            className="mt-14 inline-block text-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
          >
            More on the LIVORAA experience
          </Link>
        </FadeIn>
      </section>

      {/* SECTION 5 — DESTINATIONS */}
      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-10">
          <FadeIn>
            <p className="eyebrow mb-4">Destinations</p>
            <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink md:text-5xl">
              Cities we call home
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {cities.map((city, i) => (
              <FadeIn key={city.slug} delay={i * 100}>
                <CityCard
                  city={city}
                  stayCount={properties.filter((p) => p.citySlug === city.slug).length}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — DIGITAL CONCIERGE */}
      {siteSettings.conciergeEnabled && (
        <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <FadeIn>
              <EditorialFrame seed="concierge" ratio="aspect-[4/3]" />
            </FadeIn>
            <FadeIn delay={100}>
              <p className="eyebrow mb-4">Digital Concierge</p>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                Everything you need, within reach.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Selected LIVORAA stays provide guests with a digital
                concierge — local recommendations, stay information,
                services and assistance, available quietly in the
                background of your stay.
              </p>
            </FadeIn>
          </div>
        </section>
      )}

      {/* SECTION 7 — SOCIAL / INSTAGRAM */}
      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-10">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4">Instagram</p>
                <h2 className="max-w-lg font-serif text-4xl leading-tight text-ink md:text-5xl">
                  Follow the journey.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  New spaces, behind the scenes and stories from the cities
                  we call home.
                </p>
              </div>
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
              >
                {siteSettings.instagramHandle}
              </a>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {["ig-1", "ig-2", "ig-3", "ig-4"].map((seed, i) => (
              <FadeIn key={seed} delay={i * 60}>
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <EditorialFrame seed={seed} ratio="aspect-square" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — DIRECT BOOKING CTA */}
      <section className="mx-auto max-w-content px-6 py-24 text-center md:px-10 md:py-32">
        <FadeIn>
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            Planning your next stay?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">
            Book directly with our team for personal assistance, stay
            recommendations and available direct-booking benefits.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton />
            <Link
              href="/stays"
              className="border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
            >
              Explore Stays
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
