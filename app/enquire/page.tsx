import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import EnquiryFlow from "./EnquiryFlow";
import { getProperties } from "@/lib/data/properties";
import { getCities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Booking Enquiry",
  description:
    "Send LIVORAA a direct booking enquiry — choose your city, property and dates, and we'll get back to you personally.",
  alternates: { canonical: "/enquire" },
};

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: { property?: string };
}) {
  const [properties, cities] = await Promise.all([getProperties(), getCities()]);

  return (
    <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
      <FadeIn>
        <p className="eyebrow mb-4">Booking Enquiry</p>
        <h1 className="max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
          Tell us about your stay
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
          This sends your enquiry directly to our team on WhatsApp with all
          the details filled in — no payment is processed here.
        </p>
      </FadeIn>

      <div className="mt-14">
        <EnquiryFlow
          properties={properties}
          cities={cities}
          initialProperty={searchParams.property}
        />
      </div>
    </div>
  );
}
