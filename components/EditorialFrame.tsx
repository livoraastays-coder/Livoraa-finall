// EditorialFrame
// -----------------------------------------------------------------------
// LIVORAA does not yet have final professional property photography.
// Rather than generating fake hotel imagery, every media slot on this
// site renders a restrained, generative "light and shadow" texture —
// the brand's placeholder visual language until real photography or
// film is supplied.
//
// To swap in real photography later: replace this component's usage
// with a standard next/image <Image> pointing at the real file, using
// the same `image` path already defined in lib/data/*.ts.
// -----------------------------------------------------------------------

const VARIANTS = [
  { a: "#EFE9DD", b: "#D8CFBD", c: "#A99A7F" },
  { a: "#E7E2D6", b: "#C9C0AC", c: "#8C7B63" },
  { a: "#EDE7DA", b: "#D2C6AE", c: "#745B48" },
  { a: "#F1ECE1", b: "#DAD0BD", c: "#8B8570" },
];

function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function EditorialFrame({
  seed = "livoraa",
  ratio = "aspect-[4/5]",
  label,
  className = "",
}: {
  seed?: string;
  ratio?: string;
  label?: string;
  className?: string;
}) {
  const n = hashSeed(seed);
  const v = VARIANTS[n % VARIANTS.length];
  const angle = (n % 6) * 15 + 30;
  const x1 = 15 + (n % 30);
  const y1 = 10 + ((n >> 2) % 40);

  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, ${v.a} 0%, ${v.b} 55%, ${v.c} 100%)`,
      }}
      role="img"
      aria-label={label ? `${label} — image coming soon` : "Image coming soon"}
    >
      <div
        className="absolute inset-0 opacity-70 mix-blend-multiply"
        style={{
          background: `radial-gradient(circle at ${x1}% ${y1}%, rgba(255,255,255,0.35), transparent 55%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
      />
      {label && (
        <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest2 text-ink/50 font-sans">
          {label}
        </span>
      )}
    </div>
  );
}
