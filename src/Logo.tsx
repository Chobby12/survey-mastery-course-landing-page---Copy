/* ============================================================
   BRAND LOGO
   Recreated as SVG from the "Simplified Online Survey Guide"
   mark: a purple invoice/document icon with a £ sign.
   To use YOUR uploaded PNG instead, drop it in /public/logo.png
   and set USE_IMAGE = true below.
============================================================ */

const USE_IMAGE = false; // set true after placing /public/logo.png

export function DocIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* document body */}
      <path
        d="M14 6h26l12 12v40a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="white"
      />
      {/* folded corner */}
      <path d="M40 6l12 12H42a2 2 0 0 1-2-2V6Z" fill="#c4b5fd" />
      {/* invoice lines */}
      <rect x="19" y="22" width="16" height="2.6" rx="1.3" fill="#7c3aed" />
      <rect x="19" y="28" width="22" height="2.6" rx="1.3" fill="#a78bfa" />
      <rect x="19" y="34" width="14" height="2.6" rx="1.3" fill="#a78bfa" />
      <rect x="19" y="40" width="20" height="2.6" rx="1.3" fill="#a78bfa" />
      {/* pound badge */}
      <circle cx="45" cy="42" r="12" fill="#6d28d9" stroke="white" strokeWidth="2.5" />
      <path
        d="M41 48h9m-8-3.4h6M42.4 44.6c1.6-.9 1-2.5 0.8-3.9-.3-1.8.6-3.7 2.9-3.7 1.3 0 2.1.5 2.6 1"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  if (USE_IMAGE) {
    return <img src="/logo.png" alt="Simplified Online Survey Guide" className={`h-11 w-auto ${className}`} />;
  }

  const textColor = variant === "light" ? "text-white" : "text-[#1e0a3c]";
  const subColor = variant === "light" ? "text-purple-200" : "text-[#6d28d9]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#1e0a3c] bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] p-1.5 shadow-[3px_3px_0_0_#1e0a3c]">
        <DocIcon className="h-full w-full" />
      </span>
      <span className="leading-[1.05]">
        <span className={`block font-display text-[15px] font-black uppercase tracking-tight ${textColor}`}>
          Simplified Online
        </span>
        <span className={`block font-display text-[15px] font-black uppercase tracking-tight ${textColor}`}>
          Survey <span className="text-[#6d28d9]">Guide</span>
        </span>
        <span className={`mt-0.5 block text-[9.5px] font-black uppercase tracking-[0.22em] ${subColor}`}>
          Get paid in pounds £
        </span>
      </span>
    </div>
  );
}
