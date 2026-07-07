import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteSettings } from "@/lib/data/siteSettings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LIVORAA STAYS collects, uses and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        This Privacy Policy explains how {siteSettings.brandName} ("LIVORAA",
        "we", "us") collects, uses and protects information when you use
        this website or contact us regarding a stay.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect information you provide directly to us, such as when
        you submit a booking enquiry or contact form. This may include
        your name, phone number, email address, preferred city or
        property, and any message you send us.
      </p>
      <p>
        We may also collect basic, non-identifying usage data (such as
        pages visited) through standard website analytics tools, to help
        us understand how the site is used and improve it.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to booking enquiries and general questions</li>
        <li>To communicate with you about a stay you've enquired about or booked</li>
        <li>To improve our website and the services we offer</li>
        <li>To meet legal and regulatory obligations where applicable</li>
      </ul>

      <h2>How we share your information</h2>
      <p>
        We do not sell your personal information. We may share necessary
        details with service providers who help us operate (such as
        communication or form-processing tools), and only to the extent
        needed to provide our services.
      </p>

      <h2>WhatsApp and third-party enquiry channels</h2>
      <p>
        When you choose to enquire via WhatsApp, your message and contact
        details are shared directly with our team through WhatsApp's
        platform, subject to WhatsApp's own privacy practices.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain enquiry and contact information only as long as
        reasonably necessary to respond to you, maintain business
        records, or comply with legal obligations.
      </p>

      <h2>Your choices</h2>
      <p>
        You may contact us at any time to ask what information we hold
        about you, or to request that it be corrected or deleted, subject
        to any legal requirements to retain certain records.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy-related questions, please write to us at{" "}
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
        This policy may be updated from time to time. Material changes
        will be reflected on this page with an updated "last updated"
        date.
      </p>
    </LegalPage>
  );
}
