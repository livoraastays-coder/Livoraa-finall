import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import FadeIn from "@/components/FadeIn";
import { siteSettings } from "@/lib/data/siteSettings";
import { getProperties } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LIVORAA STAYS for booking assistance, stay enquiries, property partnerships or business collaborations.",
  alternates: { canonical: "/contact" },
};

const contactCategories = [
  {
    title: "General Stay Enquiries",
    text: "Questions about a stay, a city, or what LIVORAA is generally about.",
  },
  {
    title: "Booking Assistance",
    text: "Help with dates, availability, or an existing enquiry you've already sent us.",
  },
  {
    title: "Property Partnerships",
    text: "You own a property and want to explore listing or managing it with LIVORAA.",
  },
  {
    title: "Business Collaborations",
    text: "Brand, media or business collaboration proposals.",
  },
];

export default async function ContactPage() {
  const telHref = `tel:${siteSettings.phoneDisplay.replace(/\s/g, "")}`;
  const properties = await getProperties();

  return (
    <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <FadeIn>
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="max-w-2xl font-serif text-5xl leading-tight text-ink md:text-6xl">
          Let's talk.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
          Whichever reason brings you here, the fastest way to reach us is
          WhatsApp or a call — the form works just as well if you'd
          rather write it all out.
        </p>
      </FadeIn>

      {/* Enquiry categories */}
      <div className="mt-16 grid gap-x-8 gap-y-10 border-y border-border py-12 sm:grid-cols-2 lg:grid-cols-4">
        {contactCategories.map((cat, i) => (
          <FadeIn key={cat.title} delay={i * 60}>
            <p className="font-serif text-xl text-ink">{cat.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{cat.text}</p>
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
        <div>
          <FadeIn delay={100}>
            <div className="space-y-4">
              <WhatsAppButton
                label="Enquire on WhatsApp"
                message={siteSettings.whatsappDefaultMessage}
              />
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 border border-ink/30 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-editorial hover:border-ink hover:bg-ink hover:text-surface"
              >
                Call {siteSettings.phoneDisplay}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="mt-8 space-y-3 text-sm text-muted">
              <p>
                Email{" "}
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
                >
                  {siteSettings.email}
                </a>
              </p>
              <p>
                Instagram{" "}
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
                >
                  {siteSettings.instagramHandle}
                </a>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-xs uppercase tracking-widest2 text-muted">
                Property partnerships & collaborations
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                If you own a property and are considering listing or
                managing it with LIVORAA, or have a business collaboration
                in mind, message us directly and select the relevant
                enquiry type in the form.
              </p>
              <WhatsAppButton
                variant="secondary"
                label="Discuss a partnership"
                message={siteSettings.whatsappPartnershipMessage}
                className="mt-5"
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={100}>
          <ContactForm properties={properties} />
        </FadeIn>
      </div>
    </div>
  );
}
