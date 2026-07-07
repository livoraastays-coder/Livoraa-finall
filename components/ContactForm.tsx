"use client";

import { useState, type FormEvent } from "react";
import { siteSettings } from "@/lib/data/siteSettings";
import type { Property } from "@/lib/data/properties";

type Status = "idle" | "submitting" | "success" | "error";

const enquiryTypes = [
  "General Stay Enquiry",
  "Booking Assistance",
  "Property Partnership",
  "Business Collaboration",
];

export default function ContactForm({ properties }: { properties: Property[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const inputClass =
    "w-full border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-ink";
  const labelClass = "mb-2 block text-xs uppercase tracking-widest2 text-muted";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch(siteSettings.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok && result.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-surface p-8">
        <p className="font-serif text-2xl text-ink">Thank you.</p>
        <p className="mt-3 text-sm text-muted">
          Your enquiry has been received. Our team will get back to you
          shortly — usually within a day. For anything urgent, WhatsApp
          or call us directly using the details alongside this form.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field — hidden from real users via CSS, invisible to
          screen readers via aria-hidden and tabIndex, but bots that fill
          every field will trip it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Full Name</label>
          <input className={inputClass} id="name" name="name" type="text" required minLength={2} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Mobile Number</label>
          <input className={inputClass} id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="email">Email Address</label>
        <input className={inputClass} id="email" name="email" type="email" required />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="enquiryType">Enquiry Type</label>
          <select className={inputClass} id="enquiryType" name="enquiryType" defaultValue={enquiryTypes[0]}>
            {enquiryTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="property">Property of Interest</label>
          <select className={inputClass} id="property" name="property" defaultValue="">
            <option value="">Not sure yet / general</option>
            {properties.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} — {p.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="checkIn">Check-in Date</label>
          <input className={inputClass} id="checkIn" name="checkIn" type="date" />
        </div>
        <div>
          <label className={labelClass} htmlFor="checkOut">Check-out Date</label>
          <input className={inputClass} id="checkOut" name="checkOut" type="date" />
        </div>
        <div>
          <label className={labelClass} htmlFor="guests">Guests</label>
          <input className={inputClass} id="guests" name="guests" type="number" min={1} placeholder="2" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Message</label>
        <textarea className={inputClass} id="message" name="message" rows={5} required minLength={5} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-walnut">
          {errorMsg} You're welcome to reach us directly on WhatsApp or
          email instead — details alongside this form.
        </p>
      )}
    </form>
  );
}
