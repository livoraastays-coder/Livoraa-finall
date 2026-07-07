import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteSettings } from "@/lib/data/siteSettings";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "LIVORAA STAYS cancellation and refund policy for direct bookings.",
  alternates: { canonical: "/cancellation-refund-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <LegalPage title="Cancellation & Refund Policy" updated="July 2026">
      <p>
        This policy applies to stays booked directly with {siteSettings.brandName}{" "}
        through our website, WhatsApp or contact form. As this website
        does not currently process payments, all financial terms —
        including any advance payment, cancellation window and refund
        amount — are confirmed directly with you in writing at the time
        of booking.
      </p>

      <h2>General approach</h2>
      <ul>
        <li>
          Specific cancellation windows and refund percentages will be
          shared with you before you confirm a booking, and may vary by
          property, season or length of stay.
        </li>
        <li>
          Cancellations should be requested in writing via WhatsApp or
          email, quoting your booking details.
        </li>
        <li>
          Refunds, where applicable, are processed to the original
          payment method within a reasonable timeframe, as confirmed at
          the time of booking.
        </li>
      </ul>

      <h2>Changes to dates</h2>
      <p>
        Requests to reschedule a stay are considered on a case-by-case
        basis, subject to availability, and should be raised as early as
        possible with our team.
      </p>

      <h2>No-shows</h2>
      <p>
        Bookings not honoured without prior notice are generally treated
        as cancellations made on the day of check-in, and are subject to
        the cancellation terms confirmed for that booking.
      </p>

      <h2>Exceptional circumstances</h2>
      <p>
        In cases of exceptional circumstances beyond a guest's control, we
        will review requests individually and respond as fairly as we
        reasonably can.
      </p>

      <h2>Contact</h2>
      <p>
        For any cancellation or refund request, please contact us at{" "}
        <a
          href={`mailto:${siteSettings.email}`}
          className="text-ink underline decoration-border underline-offset-4"
        >
          {siteSettings.email}
        </a>{" "}
        or via WhatsApp/call at{" "}
        <a
          href={`tel:${siteSettings.phoneDisplay.replace(/\s/g, "")}`}
          className="text-ink underline decoration-border underline-offset-4"
        >
          {siteSettings.phoneDisplay}
        </a>
        , quoting your name and booking details.
      </p>
    </LegalPage>
  );
}
