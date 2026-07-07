import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// CONTACT FORM API ROUTE
// This route runs server-side only. Any real email-sending credentials
// (e.g. a Resend/SendGrid API key) should be added as a PRIVATE
// environment variable here — never prefixed with NEXT_PUBLIC_, and never
// referenced from client components — so they are never exposed in
// frontend code or the browser bundle.
//
// To connect a real email service:
//   1. Add your provider's SDK (e.g. `npm install resend`)
//   2. Add a private env var, e.g. RESEND_API_KEY=... in .env.local and
//      in your Vercel project settings (not NEXT_PUBLIC_)
//   3. Replace the `// TODO: send email` section below with a real call
// ============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s-]{7,15}$/;

// Very small in-memory rate limiter (per server instance). Good enough to
// blunt basic bot floods; for production-grade protection pair this with
// your form provider's or hosting platform's rate limiting.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      email,
      enquiryType,
      property,
      checkIn,
      checkOut,
      guests,
      message,
      website, // honeypot field — real users never fill this in
    } = body || {};

    // Honeypot spam check: if this hidden field is filled, silently
    // pretend success so bots don't learn their submission was rejected.
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Basic required-field and format validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!phone || typeof phone !== "string" || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid mobile number." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { ok: false, error: "Please add a short message." },
        { status: 400 }
      );
    }

    // TODO: send email via your provider of choice, e.g.:
    //
    // await resend.emails.send({
    //   from: "LIVORAA STAYS <no-reply@livoraastays.com>",
    //   to: "livoraastays@gmail.com",
    //   subject: `New enquiry — ${enquiryType || "General"}`,
    //   text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nProperty: ${property}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nMessage: ${message}`,
    // });
    //
    // Until an email provider is configured, this route validates and
    // acknowledges the submission. Configure a provider before relying on
    // this for real enquiries — see README.md "Contact form" section.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
