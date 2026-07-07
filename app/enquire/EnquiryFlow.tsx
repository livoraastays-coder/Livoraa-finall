"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/lib/data/properties";
import type { City } from "@/lib/data/cities";
import { buildWhatsAppLink } from "@/lib/data/siteSettings";

export default function EnquiryFlow({
  properties,
  cities,
  initialProperty,
}: {
  properties: Property[];
  cities: City[];
  initialProperty?: string;
}) {
  const preselected = properties.find((p) => p.slug === initialProperty);

  const [citySlug, setCitySlug] = useState(preselected?.citySlug || "");
  const [propertySlug, setPropertySlug] = useState(preselected?.slug || "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const availableProperties = useMemo(
    () => properties.filter((p) => !citySlug || p.citySlug === citySlug),
    [properties, citySlug]
  );

  const selectedProperty = properties.find((p) => p.slug === propertySlug);
  const canSend = Boolean(propertySlug && name && phone);

  const inputClass =
    "w-full border border-border bg-surface px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink";
  const labelClass = "mb-2 block text-xs uppercase tracking-widest2 text-muted";

  function handleSend() {
    if (!selectedProperty) return;
    const lines = [
      `Hello LIVORAA STAYS, I'm interested in ${selectedProperty.name}. Please share availability and booking details.`,
      ``,
      `Check-in: ${checkIn || "Not specified"}`,
      `Check-out: ${checkOut || "Not specified"}`,
      `Guests: ${guests}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      message ? `Message: ${message}` : "",
    ].filter(Boolean);

    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="max-w-xl space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="city">1. Choose city</label>
          <select
            id="city"
            className={inputClass}
            value={citySlug}
            onChange={(e) => {
              setCitySlug(e.target.value);
              setPropertySlug("");
            }}
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="property">2. Choose property</label>
          <select
            id="property"
            className={inputClass}
            value={propertySlug}
            onChange={(e) => setPropertySlug(e.target.value)}
          >
            <option value="">Select a property</option>
            {availableProperties.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} {p.status === "coming-soon" ? "(Coming Soon)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="checkin">3. Check-in</label>
          <input
            id="checkin"
            type="date"
            className={inputClass}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="checkout">4. Check-out</label>
          <input
            id="checkout"
            type="date"
            className={inputClass}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="guests">5. Number of guests</label>
        <input
          id="guests"
          type="number"
          min={1}
          className={inputClass}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">6. Name</label>
          <input
            id="name"
            type="text"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">7. Phone</label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">8. Optional message</label>
        <textarea
          id="message"
          rows={4}
          className={inputClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={!canSend}
        className="w-full bg-ink px-7 py-4 text-sm font-medium tracking-wide text-surface transition-colors duration-300 ease-editorial hover:bg-walnut disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        Send enquiry on WhatsApp
      </button>
      {!canSend && (
        <p className="text-xs text-muted">
          Select a property, and add your name and phone number to continue.
        </p>
      )}
    </div>
  );
}
