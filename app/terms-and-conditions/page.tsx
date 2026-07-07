import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteSettings } from "@/lib/data/siteSettings";
import { getFounder } from "@/lib/data/founder";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing the use of the LIVORAA STAYS website and enquiry services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default async function TermsPage() {
  const founder = await getFounder();
  return (
    <LegalPage title="Terms & Conditions" updated="July 2026">
      <p>
        These Terms & Conditions govern your use of the {siteSettings.brandName}{" "}
        website and any booking enquiries submitted through it. By using
        this website, you agree to these terms.
      </p>

      <h2>About this website</h2>
      <p>
        This website is a marketing and enquiry platform for LIVORAA
        properties. It does not currently process payments or confirm
        bookings automatically — all bookings are confirmed directly by
        our team following an enquiry.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        We aim to keep property details, availability and descriptions
        accurate and up to date. However, details such as availability,
        amenities and pricing are subject to change and will always be
        confirmed directly with you before a booking is finalised.
      </p>

      <h2>Booking enquiries</h2>
      <p>
        Submitting an enquiry through this website (via form or WhatsApp)
        does not constitute a confirmed booking. A booking is only
        confirmed once agreed directly between you and our team, subject
        to separate booking terms communicated at that time.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse this website, including attempting to
        access it using methods other than the interface we provide, or
        submitting false or misleading information through our forms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website, including text, design and brand
        elements, belongs to {siteSettings.brandName} unless otherwise
        stated, and may not be reproduced without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        While we take care to keep this website accurate and functional,
        we do not guarantee it will always be error-free or uninterrupted,
        and we are not liable for losses arising from reliance on
        information found here beyond what is confirmed directly by our
        team.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        website after changes are posted constitutes acceptance of the
        updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a
          href={`mailto:${siteSettings.email}`}
          className="text-ink underline decoration-border underline-offset-4"
        >
          {siteSettings.email}
        </a>{" "}
        or call/WhatsApp{" "}
        <a
          href={`tel:${siteSettings.phoneDisplay.replace(/\s/g, "")}`}
          className="text-ink underline decoration-border underline-offset-4"
        >
          {siteSettings.phoneDisplay}
        </a>
        .
      </p>
      <p className="text-sm">
        For business, legal or partnership correspondence: {founder.name},
        Founder, {siteSettings.brandName}.
      </p>
    </LegalPage>
  );
}
