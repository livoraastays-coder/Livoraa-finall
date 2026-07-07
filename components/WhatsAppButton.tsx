import { buildWhatsAppLink } from "@/lib/data/siteSettings";

export default function WhatsAppButton({
  message,
  label = "Enquire on WhatsApp",
  variant = "primary",
  className = "",
}: {
  message?: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ease-editorial";
  const styles =
    variant === "primary"
      ? "bg-ink text-surface hover:bg-walnut"
      : "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-surface";

  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {label}
    </a>
  );
}
