import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Check,
  X,
  Zap,
  ShieldCheck,
  Clock,
  Smartphone,
  Banknote,
  TrendingUp,
  Users,
  BadgeCheck,
  ChevronDown,
  ArrowRight,
  Flame,
  PoundSterling,
  Wallet,
  GraduationCap,
  Briefcase,
  Baby,
  Laptop,
  MessageCircle,
  Settings2,
  Timer,
  Lock,
  CreditCard,
  Globe,
  Sparkles,
  Quote,
  AlertTriangle,
  CircleCheck,
  Phone,
  BookOpen,
  Gift,
  Crown,
} from "lucide-react";
import { SITE_CONFIG } from "./config";
import Logo, { DocIcon } from "./Logo";

/* ============================================================
   HELPERS
============================================================ */
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("smng_deadline");
    const now = Date.now();
    if (saved && Number(saved) > now) return Number(saved) - now;
    const deadline =
      now +
      (SITE_CONFIG.pricing.countdownHours * 3600 +
        SITE_CONFIG.pricing.countdownMinutes * 60) *
        1000;
    localStorage.setItem("smng_deadline", String(deadline));
    return deadline - now;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const deadline = Number(localStorage.getItem("smng_deadline"));
      const diff = deadline - Date.now();
      if (diff <= 0) {
        // reset for evergreen
        const next = Date.now() + 11 * 3600 * 1000 + 47 * 60 * 1000;
        localStorage.setItem("smng_deadline", String(next));
        setTimeLeft(next - Date.now());
      } else setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(timeLeft / 3600000);
  const m = Math.floor((timeLeft % 3600000) / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  return { h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-yellow-400 text-yellow-400`} />
      ))}
    </div>
  );
}

function CTAButton({
  href,
  children,
  variant = "yellow",
  className = "",
  source = "general",
  subtext,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "yellow" | "purple" | "white" | "dark";
  className?: string;
  source?: string;
  subtext?: string;
}) {
  const styles = {
    yellow:
      "bg-yellow-300 text-[#1e0a3c] border-[#1e0a3c] hover:bg-yellow-200 shadow-[6px_6px_0_0_#1e0a3c]",
    purple:
      "bg-[#6d28d9] text-white border-[#1e0a3c] hover:bg-[#7c3aed] shadow-[6px_6px_0_0_#1e0a3c]",
    white:
      "bg-white text-[#2e1065] border-white hover:bg-purple-50 shadow-[6px_6px_0_0_rgba(0,0,0,0.35)]",
    dark: "bg-[#1e0a3c] text-white border-[#1e0a3c] hover:bg-[#2e1065] shadow-[6px_6px_0_0_#6d28d9]",
  } as const;
  const getLink = () => {
    const sep = href.includes("?") ? "&" : "?";
    return `${href}${sep}src=${source}`;
  };
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.a
        whileHover={{ translateX: -2, translateY: -2 }}
        whileTap={{ scale: 0.97 }}
        href={getLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] px-6 py-4 text-center text-base font-black uppercase tracking-tight transition-all sm:text-lg ${styles[variant]}`}
      >
        <span className="leading-tight">{children}</span>
        <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={3} />
      </motion.a>
      {subtext && (
        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold opacity-80">
          <Lock className="h-3.5 w-3.5" /> {subtext}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   APP
============================================================ */
export default function App() {
  const { h, m, s } = useCountdown();
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [calcHours, setCalcHours] = useState(2);
  const [calcDays, setCalcDays] = useState(5);

  // Customizable affiliate link (localStorage override)
  const [affLink, setAffLink] = useState(
    () => localStorage.getItem("smng_aff") || SITE_CONFIG.affiliateLink
  );
  const [waNumber, setWaNumber] = useState(
    () => localStorage.getItem("smng_wa") || SITE_CONFIG.whatsappNumber
  );
  const [priceNow, setPriceNow] = useState(
    () => localStorage.getItem("smng_price") || SITE_CONFIG.pricing.current
  );
  const [priceOld, setPriceOld] = useState(
    () => localStorage.getItem("smng_old") || SITE_CONFIG.pricing.old
  );

  useEffect(() => {
    const t = setTimeout(() => setShowExit(true), 38000);
    return () => clearTimeout(t);
  }, []);

  const waLink = useMemo(
    () =>
      `https://wa.me/${waNumber}?text=${encodeURIComponent(
        SITE_CONFIG.whatsappMessage
      )}`,
    [waNumber]
  );

  const estimatedLow = calcHours * calcDays * 4 * 1200;
  const estimatedHigh = calcHours * calcDays * 4 * 4200;
  const fmt = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

  const saveCustom = () => {
    localStorage.setItem("smng_aff", affLink);
    localStorage.setItem("smng_wa", waNumber);
    localStorage.setItem("smng_price", priceNow);
    localStorage.setItem("smng_old", priceOld);
    setShowCustomize(false);
  };

  return (
    <div className="min-h-screen bg-white font-body text-[#1e0a3c]">
      {/* ============ ANNOUNCEMENT BAR ============ */}
      <div className="relative z-[60] bg-[#1e0a3c] px-3 py-2.5 text-center text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 text-[12.5px] font-bold sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-black uppercase text-[#1e0a3c] sm:text-xs">
            <Flame className="h-3.5 w-3.5" /> {SITE_CONFIG.pricing.discountPercent} ends tonight
          </span>
          <span className="hidden sm:inline">—</span>
          <span>
            Price goes back to ₦{priceOld} in{" "}
            <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono tabular-nums">
              {pad(h)}:{pad(m)}:{pad(s)}
            </span>
          </span>
          <a
            href={affLink}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-yellow-300 decoration-2 underline-offset-2 hover:text-yellow-300"
          >
            Claim now →
          </a>
        </div>
      </div>

      {/* ============ NAV ============ */}
      <header className="sticky top-0 z-50 border-b-[3px] border-[#1e0a3c] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center">
            <Logo variant="dark" />
          </a>
          <div className="hidden items-center gap-5 text-[13.5px] font-bold md:flex">
            <a href="#inside" className="hover:text-[#6d28d9]">What's Inside</a>
            <a href="#results" className="hover:text-[#6d28d9]">Results</a>
            <a href="#bonuses" className="hover:text-[#6d28d9]">Bonuses</a>
            <a href="#faq" className="hover:text-[#6d28d9]">FAQ</a>
          </div>
          <a
            href={affLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border-[2.5px] border-[#1e0a3c] bg-[#6d28d9] px-4 py-2.5 text-[13px] font-black uppercase text-white shadow-[3px_3px_0_0_#1e0a3c] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#1e0a3c] sm:px-5 sm:text-sm"
          >
            Get Access →
          </a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="top" className="relative overflow-hidden bg-[#2e1065] text-white">
        <div className="absolute inset-0 bg-grid-white" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#7c3aed]/60 blur-[110px]" />
        <div className="absolute -right-24 top-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/40 blur-[120px]" />
        <div className="absolute inset-0 bg-dots opacity-60" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-8 sm:pt-12">
          {/* pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-4 py-2 text-center text-[12px] font-bold backdrop-blur sm:text-[13px]"
          >
            <span className="flex items-center gap-1 rounded-full bg-green-400 px-2 py-0.5 text-[11px] font-black text-[#052e16]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-900 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-900" />
              </span>
              UPDATED 2026
            </span>
            <span className="text-white/90">
              For Nigerians with a phone + 1–2hrs daily — no experience needed
            </span>
          </motion.div>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="font-display text-[34px] font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-[56px]"
              >
                Salary No Dey Reach?
                <br />
                <span className="text-yellow-300">Make Extra £300–£800/Month</span>
                <br />
                With Just Your Phone.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-purple-100 sm:text-lg lg:mx-0"
              >
                The <strong className="text-white">Simplified Online Survey Guide</strong> shows
                students, corpers, 9–5 workers & stay-at-home mums exactly how to earn in{" "}
                <strong className="text-yellow-300">Pounds & Dollars</strong> from legit foreign
                survey sites — <u>without quitting your job</u> or any tech skills.
              </motion.p>

              {/* mini proof */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <div className="flex -space-x-2.5">
                  {["AO", "BK", "CT", "DM"].map((t, i) => (
                    <span
                      key={t}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#2e1065] text-[11px] font-black text-white ${
                        ["bg-pink-500", "bg-emerald-500", "bg-orange-500", "bg-sky-500"][i]
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-left">
                  <Stars />
                  <p className="mt-0.5 text-[12.5px] font-bold text-purple-100">
                    {SITE_CONFIG.socialProof.avgRating}/5 from {SITE_CONFIG.socialProof.ratings}+
                    verified ratings • {SITE_CONFIG.socialProof.students}+ students
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <CTAButton href={affLink} source="hero" subtext="Secure checkout via Selar • Instant access">
                  YES! I WANT TO EARN IN POUNDS →
                </CTAButton>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12.5px] font-semibold text-purple-200 lg:justify-start">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-green-300" /> 7-day action guarantee</span>
                  <span className="flex items-center gap-1"><Smartphone className="h-4 w-4 text-green-300" /> Works with just a phone</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-green-300" /> 1–2 hrs/day</span>
                </div>
              </div>
            </div>

            {/* Visual / mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.15 }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              {/* Ebook mockup */}
              <div className="animate-float-y relative rounded-3xl border-[3px] border-[#1e0a3c] bg-white p-5 text-[#1e0a3c] shadow-[10px_10px_0_0_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#6d28d9] px-3 py-1 text-[11px] font-black uppercase text-white">
                    Bestseller • 2026 Edition
                  </span>
                  <Stars className="h-3.5 w-3.5" />
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border-[2.5px] border-[#1e0a3c] bg-[#2e1065] p-5 text-center text-white">
                  <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-white/40 bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] p-2">
                    <DocIcon className="h-full w-full" />
                  </span>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-yellow-300">
                    CentralAfCo™ Presents
                  </p>
                  <h3 className="mt-2 font-display text-[26px] font-black leading-[1.05]">
                    SIMPLIFIED
                    <br />
                    ONLINE SURVEY
                    <br />
                    <span className="text-yellow-300">GUIDE</span>
                  </h3>
                  <div className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-black text-[#2e1065]">
                    <PoundSterling className="h-4 w-4" strokeWidth={3} /> GET PAID IN POUNDS
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {[
                      ["30+", "Paying sites"],
                      ["£5–£50", "Per survey"],
                      ["2026", "Updated"],
                    ].map(([a, b]) => (
                      <div key={b} className="rounded-xl bg-white/10 px-2 py-2 backdrop-blur">
                        <p className="font-display text-[15px] font-black text-yellow-300">{a}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-purple-100">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "Profile setup that gets you MORE surveys",
                    "How Nigerians receive pounds (Grey / Payoneer)",
                    "30+ legit sites that accept Nigerians",
                  ].map((t) => (
                    <p key={t} className="flex items-start gap-2 text-[13px] font-bold">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
                      </span>
                      {t}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-purple-50 px-3 py-2.5">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-gray-500 line-through">₦{priceOld}</p>
                    <p className="font-display text-2xl font-black text-[#6d28d9]">₦{priceNow}</p>
                  </div>
                  <span className="animate-wiggle rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-black uppercase text-white">
                    Save 60% today
                  </span>
                </div>
              </div>

              {/* floating payout cards */}
              <div className="absolute -left-4 top-8 hidden -rotate-6 rounded-2xl border-2 border-[#1e0a3c] bg-white px-3 py-2 shadow-[4px_4px_0_0_#1e0a3c] sm:block">
                <p className="text-[10px] font-black uppercase text-green-700">✔ Prolific payout</p>
                <p className="font-display text-lg font-black">£42.70</p>
              </div>
              <div className="absolute -right-3 bottom-16 rotate-3 rounded-2xl border-2 border-[#1e0a3c] bg-yellow-300 px-3 py-2 shadow-[4px_4px_0_0_#1e0a3c]">
                <p className="text-[10px] font-black uppercase">Grey alert received</p>
                <p className="font-display text-lg font-black">$86.15 → ₦129,000</p>
              </div>
            </motion.div>
          </div>

          {/* trust strip */}
          <div className="mt-10 grid grid-cols-2 gap-2.5 rounded-2xl border-2 border-white/15 bg-white/5 p-3 backdrop-blur sm:grid-cols-4 sm:gap-4 sm:p-4">
            {[
              { icon: Users, top: `${SITE_CONFIG.socialProof.students}+`, sub: "Nigerians inside" },
              { icon: Star, top: `${SITE_CONFIG.socialProof.ratings} ratings`, sub: "4.8★ average review" },
              { icon: Globe, top: "UK • US • CA", sub: "Foreign sites that pay" },
              { icon: Wallet, top: "Phone only", sub: "No laptop, no capital" },
            ].map((s) => (
              <div key={s.sub} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-300 text-[#1e0a3c]">
                  <s.icon className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span>
                  <span className="block font-display text-[15px] font-black leading-none sm:text-base">{s.top}</span>
                  <span className="block text-[11.5px] font-semibold text-purple-200">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* wave */}
        <svg viewBox="0 0 1440 70" className="relative block w-full text-white" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,25 C960,50 1200,70 1440,30 L1440,70 L0,70 Z" fill="currentColor" />
        </svg>
      </section>

      {/* ============ TICKER ============ */}
      <div className="overflow-hidden border-b-[3px] border-[#1e0a3c] bg-yellow-300 py-2.5">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap font-display text-[14px] font-black uppercase tracking-wide text-[#1e0a3c]">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-8">
              {[
                "No experience needed",
                "Get paid in pounds £",
                "1–2 hrs daily",
                "Works for students & 9–5 workers",
                "2026 updated list",
                "523+ verified reviews",
                "Phone + data only",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> {t} <span className="ml-6">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ PAIN / PROBLEM ============ */}
      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1e0a3c] bg-red-50 px-4 py-1.5 text-[12px] font-black uppercase tracking-wide text-red-700">
              <AlertTriangle className="h-4 w-4" /> Be honest with yourself
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              E Choke? Salary Dey Finish Before <span className="rounded-lg bg-[#6d28d9] px-2 text-white">Month End?</span>
            </h2>
            <p className="mt-4 text-[15px] font-medium leading-relaxed text-gray-600 sm:text-lg">
              If any of these sound like you, no be your fault — economy hard. But you <em>can</em> do
              something about it this week:
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                emoji: "😩",
                title: "Salary enters, wahala follows",
                body: "Rent, fuel, food, data, black tax… before 15th, account don red. You work hard but nothing to show.",
              },
              {
                emoji: "📱",
                title: "You press phone 5hrs daily for free",
                body: "TikTok, X, WhatsApp status — you already have the only tool you need. You just never got paid for your screen time.",
              },
              {
                emoji: "🚫",
                title: "You don try ‘online biz’ before",
                body: "Crypto, forex, dropshipping — all need big capital or tech skills. Surveys need neither. Just follow steps.",
              },
              {
                emoji: "🎓",
                title: "Student / Corper / Job seeker?",
                body: "Pocket money no dey. Job market tight. You need something legit you can start with ₦0 extra capital.",
              },
              {
                emoji: "👩🏾‍💼",
                title: "9–5 worker wey no fit resign",
                body: "You love stability but need a second leg. 1–2 hrs at night or weekends is enough. No boss, no target.",
              },
              {
                emoji: "💸",
                title: "Dollar don cost, Naira don fall",
                body: "Why earn only in Naira when £1 = ₦1,900+? Small pounds = big Naira. That's the real hack.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="rounded-2xl border-[2.5px] border-[#1e0a3c] bg-white p-5 shadow-[5px_5px_0_0_#1e0a3c] transition-transform hover:-translate-y-1"
              >
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="mt-2 font-display text-[17px] font-black leading-snug">{c.title}</h3>
                <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-gray-600">{c.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-[2.5px] border-dashed border-[#6d28d9] bg-purple-50 p-5 text-center">
            <p className="font-display text-lg font-black sm:text-xl">
              “It's not laziness. You just never had the <span className="text-[#6d28d9]">right plug</span>.”
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-600">
              This guide is that plug — updated for 2026, simplified for total beginners.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DREAM / OPPORTUNITY ============ */}
      <section className="relative overflow-hidden bg-[#1e0a3c] px-4 py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#6d28d9]/60 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-300 px-4 py-1.5 text-[12px] font-black uppercase text-[#1e0a3c]">
                <Zap className="h-4 w-4" /> The opportunity
              </span>
              <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] sm:text-[44px]">
                Imagine Waking Up To <span className="text-yellow-300">Pound Alerts</span> While You
                Still Keep Your Job
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-purple-100 sm:text-[17px]">
                Big foreign companies pay <strong className="text-white">£5 – £50 per survey</strong>{" "}
                for your opinion — to improve Netflix, Tesco, Nike, Spotify. They don't care where you
                live. They just need real humans.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  ["No be trading, no be betting", "No risk, no capital. You answer simple questions, you get paid. Period."],
                  ["Do am for bed, bus, or lunch break", "Phone + data is enough. 30–60 mins per survey, anytime you free."],
                  ["Withdraw straight to your Naira account", "Via Grey, Geegpay or Payoneer — step-by-step inside the guide."],
                  ["Up-to-date 2026 methods", "Old YouTube videos don expire. This is the current working list + profile tricks."],
                ].map(([t, b]) => (
                  <li key={t} className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-400 text-[#052e16]">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </span>
                    <span>
                      <span className="block font-display text-[15px] font-black">{t}</span>
                      <span className="block text-[13.5px] text-purple-100">{b}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl border-[3px] border-white/80 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
                <img
                  src="https://images.pexels.com/photos/33837432/pexels-photo-33837432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                  alt="Young Nigerian woman smiling at her phone in Abuja cafe"
                  className="h-72 w-full object-cover sm:h-80"
                  loading="lazy"
                />
                <div className="bg-white p-4 text-[#1e0a3c]">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-black uppercase tracking-wide text-[#6d28d9]">
                      From her hostel room in UNILAG…
                    </p>
                    <Stars />
                  </div>
                  <p className="mt-1 font-display text-[17px] font-black leading-snug">
                    “My first £38 came in 9 days. I screamed! Now na my data + upkeep money.”
                  </p>
                  <p className="mt-1 text-[12.5px] font-bold text-gray-500">— Adaeze O., 21 • Student</p>
                </div>
              </div>

              {/* mini payout stack */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  ["£18.40", "Swagbucks"],
                  ["£42.70", "Prolific"],
                  ["$56.20", "Branded"],
                ].map(([amt, site]) => (
                  <div key={site} className="rounded-2xl border-2 border-yellow-300/60 bg-white/10 p-3 text-center backdrop-blur">
                    <p className="font-display text-lg font-black text-yellow-300">{amt}</p>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-purple-100">{site}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11.5px] font-medium text-purple-200">
                *Sample payouts shared by students. Results vary with consistency. See disclaimer below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-purple-50 px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border-2 border-[#1e0a3c] bg-white px-4 py-1.5 text-[12px] font-black uppercase">
              ⚡ Simple 3-step system
            </span>
            <h2 className="mt-4 font-display text-3xl font-black sm:text-5xl">
              If You Can Press Phone, <span className="text-[#6d28d9]">You Can Do This</span>
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "STEP 1",
                icon: BookOpen,
                title: "Get the guide + join in 5 mins",
                body: "Pay once, get instant access. No waiting. Read on your phone — simple English, screenshots for every click.",
              },
              {
                n: "STEP 2",
                icon: Smartphone,
                title: "Set up your profile the RIGHT way",
                body: "This is where 90% fail. You'll copy our high-approval profile templates so you qualify for MORE & higher-paying surveys.",
              },
              {
                n: "STEP 3",
                icon: Banknote,
                title: "Answer & cash out in pounds",
                body: "Do 1–3 surveys daily. Withdraw via Grey / Payoneer to your Naira account. Repeat. Even on weekends.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl border-[3px] border-[#1e0a3c] bg-white p-6 shadow-[6px_6px_0_0_#1e0a3c]"
              >
                <span className="absolute -top-3.5 left-6 rounded-full border-2 border-[#1e0a3c] bg-yellow-300 px-3 py-1 text-[11px] font-black">
                  {s.n}
                </span>
                <span className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6d28d9] text-white">
                  <s.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-display text-xl font-black leading-snug">{s.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-gray-600">{s.body}</p>
                {i < 2 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full border-2 border-[#1e0a3c] bg-yellow-300 p-1 md:block" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Earnings calculator */}
          <div className="mt-10 overflow-hidden rounded-3xl border-[3px] border-[#1e0a3c] bg-[#1e0a3c] text-white shadow-[8px_8px_0_0_#6d28d9]">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 sm:p-8">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-black uppercase tracking-wide">
                  <TrendingUp className="h-4 w-4 text-yellow-300" /> Try it: your potential
                </p>
                <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                  How much fit enter your pocket?
                </h3>
                <p className="mt-1 text-sm text-purple-200">
                  Drag the sliders. Most beginners do ₦1,200 – ₦4,200 per hour of surveys.
                </p>
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-sm font-black">
                      <span>⏱ Hours per day: {calcHours}hr</span>
                      <span className="rounded bg-yellow-300 px-2 py-0.5 text-[#1e0a3c]">{calcHours} hrs</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="mt-2 w-full accent-yellow-300"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-black">
                      <span>📅 Days per week: {calcDays} days</span>
                      <span className="rounded bg-yellow-300 px-2 py-0.5 text-[#1e0a3c]">{calcDays} days</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={7}
                      value={calcDays}
                      onChange={(e) => setCalcDays(Number(e.target.value))}
                      className="mt-2 w-full accent-yellow-300"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-6 text-center text-[#1e0a3c] sm:p-8">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6d28d9]">
                  Your estimated monthly range
                </p>
                <p className="mt-2 font-display text-4xl font-black sm:text-5xl">
                  {fmt(estimatedLow)} – {fmt(estimatedHigh)}
                </p>
                <p className="mt-2 max-w-xs text-[13px] font-semibold text-gray-500">
                  That's {calcHours}hr × {calcDays} days/week. Enough for upkeep, savings, or to stop
                  borrowing before month end.
                </p>
                <CTAButton href={affLink} source="calculator" className="mt-5 w-full max-w-sm">
                  START EARNING →
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE / CURRICULUM ============ */}
      <section id="inside" className="bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6d28d9] px-4 py-1.5 text-[12px] font-black uppercase text-white">
                <GraduationCap className="h-4 w-4" /> Inside the guide
              </span>
              <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] sm:text-[44px]">
                Everything Is <span className="underline decoration-yellow-400 decoration-[6px] underline-offset-4">Step-By-Step.</span> No Guesswork.
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-gray-600">
                6 beginner-proof modules. Short lessons, screenshots, copy-paste templates. Even if
                na today you hear about surveys, you'll finish setup the same day.
              </p>
              <div className="mt-5 overflow-hidden rounded-2xl border-2 border-[#1e0a3c]">
                <img
                  src="https://images.pexels.com/photos/6749967/pexels-photo-6749967.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Nigerian man working from home with laptop and phone"
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border-[2.5px] border-[#1e0a3c] bg-yellow-300 p-4">
                <Timer className="h-10 w-10 shrink-0" />
                <p className="text-[13.5px] font-black leading-snug">
                  Total learning time: ~3 hours. You can finish it this weekend & take your first
                  survey same day.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  m: "MODULE 1",
                  t: "Survey Money Foundations (Start Here)",
                  d: "How the pound-paying system really works, what to expect in month 1, and the 5 costly mistakes that make Nigerians get rejected — so you avoid them from day one.",
                  tags: ["Beginner friendly", "30 mins"],
                },
                {
                  m: "MODULE 2",
                  t: "The 2026 List: 30+ Legit Sites That Pay Nigerians",
                  d: "Our updated, tested database: Prolific, Branded, Swagbucks, Toluna + 26 more — ranked by pay, with direct links, who accepts NG, and how often they pay.",
                  tags: ["Updated 2026", "Direct links"],
                  hot: true,
                },
                {
                  m: "MODULE 3",
                  t: "High-Approval Profile Setup (Get MORE Surveys)",
                  d: "Copy-paste bio templates, category selection secrets & verification walkthrough. This alone can 3x your invites.",
                  tags: ["Templates included"],
                },
                {
                  m: "MODULE 4",
                  t: "Answer Like a Pro, Earn Like a Pro",
                  d: "How to qualify more, avoid disqualifications & bans, manage multiple sites without burnout. Plus daily routine for 9–5 workers (1hr plan).",
                  tags: ["1-hr daily plan"],
                },
                {
                  m: "MODULE 5",
                  t: "Collect Your Pounds in Naira (Withdrawal Mastery)",
                  d: "Full Grey, Geegpay & Payoneer setup with screenshots. How to link to your bank, avoid charges, and what to do if a site delays payment.",
                  tags: ["Screenshots", "Zero confusion"],
                  hot: true,
                },
                {
                  m: "MODULE 6",
                  t: "Scale to £500+/Month + Avoid Scams Forever",
                  d: "Stack 4–5 sites, referral bonuses, red-flag checklist for fake ‘paying’ sites, and 2026 updates for life.",
                  tags: ["Scale-up", "Lifetime updates"],
                },
              ].map((mod, i) => (
                <motion.div
                  key={mod.m}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.05 }}
                  className="relative rounded-2xl border-[2.5px] border-[#1e0a3c] bg-white p-5 shadow-[5px_5px_0_0_#ede9fe] hover:shadow-[5px_5px_0_0_#6d28d9]"
                >
                  {mod.hot && (
                    <span className="absolute -top-3 right-4 rounded-full border-2 border-[#1e0a3c] bg-red-600 px-3 py-0.5 text-[11px] font-black uppercase text-white">
                      🔥 Most loved
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1e0a3c] font-display text-lg font-black text-yellow-300">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6d28d9]">{mod.m}</p>
                      <h3 className="mt-0.5 font-display text-[18px] font-black leading-snug">{mod.t}</h3>
                      <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-gray-600">{mod.d}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {mod.tags.map((t) => (
                          <span key={t} className="rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-black text-[#4c1d95]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <CTAButton href={affLink} source="curriculum" subtext="Instant download • Read on any phone">
                GET INSTANT ACCESS TO ALL 6 MODULES →
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RESULTS / TESTIMONIALS ============ */}
      <section id="results" className="relative overflow-hidden bg-[#2e1065] px-4 py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-grid-white opacity-70" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[12px] font-black uppercase text-[#2e1065]">
              <BadgeCheck className="h-4 w-4" /> Proven results • {SITE_CONFIG.socialProof.ratings}+ ratings
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] sm:text-5xl">
              Real Nigerians. Real <span className="text-yellow-300">Pound Alerts.</span> No Hype.
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Stars className="h-5 w-5" />
              <span className="text-sm font-bold text-purple-100">4.8 out of 5 average • Updated 2026 methods</span>
            </div>
          </div>

          {/* WhatsApp style cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Dora K.",
                meta: "Corper • Ibadan",
                init: "BK",
                color: "bg-emerald-500",
                text: "I was skeptical ehn! But Module 5 withdrawal guide worked. First Grey alert: $15. My PPA mate don buy am too. This thing legit!",
                amt: "$15.00 withdrawn",
                time: "2 weeks in",
                img: "/pictures/WhatsApp Image 2026-09-21 at 16.29.34.jpeg"
              },
              {
                name: "Tunde A.",
                meta: "9–5 Banker • Lagos",
                init: "TA",
                color: "bg-orange-500",
                text: "I do surveys 8–9pm after work. Last month na $20. No be millions, but fuel + savings sorted. Omo, pounds sweet!",
                amt: "$20.00 last month",
                time: "2 months in",
                img: "/pictures/WhatsApp Image 2026-09-21 at 16.29.34 (2).jpeg"
              },
              {
                name: "Fatima S.",
                meta: "Nursing mum • Abuja",
                init: "FS",
                color: "bg-pink-500",
                text: "With baby, I can't do full business. I answer surveys while baby sleeps. Made $111.13 first month. Guide is SO simple, even my sister understood.",
                amt: "$111.13 first month",
                time: "1 month in",
                img: "/pictures/WhatsApp Image 2026-09-21 at 16.29.33 (1).jpeg"
              },
              {
                name: "Chidi O.",
                meta: "Student • UNN",
                init: "CO",
                color: "bg-sky-500",
                text: "Prolific accepted me after using the profile template. Na the Module 3 hack! First survey paid $26.64 for 25 mins. I don off data begging.",
                amt: "$26.64 in 25 mins",
                time: "9 days in",
                img: "/pictures/WhatsApp Image 2026-09-21 at 16.29.33 (2).jpeg"
              },
              {
                name: "Adaeze O.",
                meta: "Student • UNILAG",
                init: "AO",
                color: "bg-purple-500",
                text: "Mummy thought na scam until I showed her Grey receipt. Now she wants link 😂. Support group dey answer questions fast fast.",
                amt: "£36.38 withdrawn",
                time: "3 weeks in",
                img: "/pictures/WhatsApp Image 2026-09-21 at 16.29.33.jpeg"
              },
              {
                name: "Ibrahim M.",
                meta: "NYSC • Kano",
                init: "IM",
                color: "bg-yellow-500",
                text: "Allaah! Swagbucks + Toluna combo dey pay me steady. Not rich yet but allowee don get elder brother. Worth every naira of the ₦9,900.",
                amt: "$143.00 total",
                time: "6 weeks in",
                img: "/pictures/WhatsApp Image 2026-09-21 at 16.29.34 (1).jpeg"
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="rounded-2xl border-2 border-white/20 bg-white p-5 text-[#1e0a3c] shadow-[5px_5px_0_0_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-black text-white ${t.color}`}>
                    {t.init}
                  </span>
                  <div className="flex-1">
                    <p className="flex items-center gap-1 text-[14px] font-black">
                      {t.name} <BadgeCheck className="h-4 w-4 text-green-600" />
                    </p>
                    <p className="text-[12px] font-semibold text-gray-500">{t.meta}</p>
                  </div>
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="relative mt-3 rounded-xl rounded-tl-none bg-[#dcf8c6] p-3 text-[13.5px] font-medium leading-relaxed">
                  “{t.text}”
                  <div style={{
                    padding: "8px",
                  }}></div>
                  <img src={t.img} style={{
                    height: "530px",
                    width: "100%"
                  }}/>
                  <span className="mt-1 block text-right text-[11px] font-bold text-gray-500">✓✓ {t.time}</span>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-purple-50 px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[13px] font-black text-[#4c1d95]">
                    <CircleCheck className="h-4 w-4 text-green-600" /> {t.amt}
                  </span>
                  <Stars className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[12px] font-medium leading-relaxed text-purple-200">
            Testimonials reflect individual effort & consistency. Survey income varies — this is a skill +
            information guide, not a get-rich-quick scheme. See earnings disclaimer in footer.
          </p>
        </div>
      </section>

      {/* ============ WHO FOR / NOT FOR ============ */}
      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-black sm:text-5xl">
            Is This <span className="text-[#6d28d9]">For You?</span> Let's Be Clear
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border-[3px] border-[#1e0a3c] bg-green-50 p-6 shadow-[6px_6px_0_0_#16a34a]">
              <p className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-1.5 text-[13px] font-black uppercase text-white">
                <Check className="h-4 w-4" strokeWidth={3} /> This is for you if…
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Student, corper, job seeker, 9–5 worker or stay-at-home parent",
                  "You have a smartphone + data and 1–2 free hours daily",
                  "You want legit side income WITHOUT quitting your job",
                  "You can follow simple instructions & stay consistent for 30 days",
                  "You want to earn in pounds/dollars to beat Naira wahala",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[14.5px] font-bold">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border-[3px] border-[#1e0a3c] bg-red-50 p-6 shadow-[6px_6px_0_0_#dc2626]">
              <p className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-[13px] font-black uppercase text-white">
                <X className="h-4 w-4" strokeWidth={3} /> NOT for you if…
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "You want ₦1M overnight with zero work (abeg, go elsewhere)",
                  "You won't open the guide or do even 30 mins daily",
                  "You're looking for betting, forex signals or MMM-style returns",
                  "You don't have a phone, data, or valid ID for payment setup",
                  "You hate following instructions and want a ‘magic button’",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[14.5px] font-bold text-gray-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                      <X className="h-4 w-4" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* personas */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: GraduationCap, label: "Students", sub: "Upkeep + data money" },
              { icon: Briefcase, label: "9–5 Workers", sub: "Second income leg" },
              { icon: Baby, label: "Stay-at-home mums", sub: "Earn from home" },
              { icon: Laptop, label: "Corpers & Seekers", sub: "Start with ₦0 capital" },
            ].map((p) => (
              <div key={p.label} className="rounded-2xl border-2 border-[#1e0a3c] bg-purple-50 p-4 text-center">
                <p.icon className="mx-auto h-7 w-7 text-[#6d28d9]" />
                <p className="mt-1.5 font-display text-[15px] font-black">{p.label}</p>
                <p className="text-[12px] font-semibold text-gray-600">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COACH ============ */}
      <section className="bg-purple-50 px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border-[3px] border-[#1e0a3c] bg-white shadow-[8px_8px_0_0_#1e0a3c]">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[280px] bg-[#2e1065]">
              <img
                src="https://images.pexels.com/photos/17791808/pexels-photo-17791808.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Course creator working remotely with laptop and phone"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a3c] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-3 backdrop-blur">
                <p className="flex items-center gap-1.5 font-display text-[15px] font-black">
                  <Crown className="h-5 w-5 text-yellow-500" /> CentralAfCo™ Team
                </p>
                <p className="text-[12px] font-bold text-gray-600">Helped 3,800+ Nigerians start earning online since 2022</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6d28d9]">Why listen to us?</p>
              <h3 className="mt-2 font-display text-2xl font-black leading-tight sm:text-3xl">
                We Tested 60+ Sites So You Don't Waste 6 Months Like We Did
              </h3>
              <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-gray-600">
                We started like you — confused by outdated YouTube videos, banned accounts, sites that
                don't pay Nigerians. So we documented <strong>only what works in 2026</strong>: which
                sites accept NG, how to set up profiles that get invites, and how to withdraw without
                stories.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ["3,847+", "Students"],
                  ["523", "Reviews"],
                  ["2026", "Updated"],
                ].map(([a, b]) => (
                  <div key={b} className="rounded-xl bg-purple-50 px-2 py-3">
                    <p className="font-display text-xl font-black text-[#6d28d9]">{a}</p>
                    <p className="text-[11px] font-black uppercase text-gray-500">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-yellow-100 p-3 text-[13px] font-bold">
                <Quote className="h-5 w-5 shrink-0 text-[#6d28d9]" />
                “No grammar. No upsell confusion. Just open, follow screenshots, take surveys, withdraw.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BONUSES ============ */}
      <section id="bonuses" className="bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-[#1e0a3c] bg-yellow-300 px-4 py-1.5 text-[12px] font-black uppercase">
              <Gift className="h-4 w-4" /> Free bonuses when you join today
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-black leading-[1.05] sm:text-5xl">
              You Don't Just Get A Guide. You Get A <span className="text-[#6d28d9]">Full Starter Pack</span>
            </h2>
          </div>
          <div className="mt-8 space-y-3.5">
            {[
              {
                tag: "BONUS 1 • Worth ₦15,000",
                title: "2026 VIP List: 30+ Sites Ranked By Pay (With Direct Links)",
                body: "Skip trial-and-error. Know exactly where to start today, which pay weekly, and which to avoid. Updated quarterly.",
              },
              {
                tag: "BONUS 2 • Worth ₦10,000",
                title: "Pound-to-Naira Withdrawal Blueprint (Grey + Geegpay + Payoneer)",
                body: "Screenshot setup for each option, how to verify with NIN, link your bank & dodge hidden charges.",
              },
              {
                tag: "BONUS 3 • Worth ₦7,500",
                title: "Copy-Paste High-Approval Profile Templates",
                body: "The exact bio, demographics & category answers our top students used to 3x their survey invites.",
              },
              {
                tag: "BONUS 4 • Worth ₦12,000",
                title: "Private WhatsApp Support Community",
                body: "Ask questions, see others' payout proofs, get new site alerts. You never walk alone.",
              },
            ].map((b, i) => (
              <motion.div
                key={b.tag}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-2xl border-[2.5px] border-[#1e0a3c] bg-gradient-to-r from-purple-50 to-white p-5 shadow-[5px_5px_0_0_#6d28d9]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6d28d9] font-display text-lg font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="inline-block rounded-full bg-[#1e0a3c] px-2.5 py-0.5 text-[11px] font-black uppercase text-yellow-300">
                    {b.tag}
                  </p>
                  <h3 className="mt-1.5 font-display text-[17px] font-black leading-snug sm:text-lg">{b.title}</h3>
                  <p className="mt-1 text-[13.5px] font-medium text-gray-600">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* value stack table */}
          <div className="mt-8 overflow-hidden rounded-3xl border-[3px] border-[#1e0a3c] shadow-[8px_8px_0_0_#1e0a3c]">
            <div className="bg-[#1e0a3c] px-6 py-4 text-center text-white">
              <p className="font-display text-xl font-black">TOTAL VALUE: ₦79,500 — TODAY: ₦{priceNow}</p>
            </div>
            <div className="divide-y-2 divide-dashed divide-purple-100 bg-white">
              {[
                ["Simplified Online Survey Guide (6 modules)", "₦45,000"],
                ["Bonus 1: 2026 VIP paying-sites list", "₦15,000"],
                ["Bonus 2: Withdrawal blueprint", "₦10,000"],
                ["Bonus 3: Profile templates", "₦7,500"],
                ["Bonus 4: WhatsApp community", "₦12,000"],
              ].map(([a, b]) => (
                <div key={a} className="flex items-center justify-between px-5 py-3 text-[14px] font-bold sm:px-6">
                  <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" strokeWidth={3} /> {a}</span>
                  <span className="text-gray-500">{b}</span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-yellow-300 px-5 py-4 sm:px-6">
                <span className="font-display text-[16px] font-black uppercase">You pay today (one-time)</span>
                <span className="font-display text-2xl font-black">₦{priceNow}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING / OFFER ============ */}
      <section id="pricing" className="relative overflow-hidden bg-[#2e1065] px-4 py-14 text-white sm:py-20">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute left-1/2 top-10 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/50 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-[12px] font-black uppercase">
              <Timer className="h-4 w-4" /> Limited-time 60% discount
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] sm:text-5xl">
              Get Everything For Less Than <span className="text-yellow-300">One Pizza + Shawarma</span>
            </h2>
            <p className="mt-3 text-purple-100">
              One survey payout can cover this. Everything after na profit.
            </p>
          </div>

          {/* countdown */}
          <div className="mx-auto mt-6 flex w-fit items-center gap-2.5 rounded-2xl border-2 border-yellow-300/50 bg-white/10 p-3 backdrop-blur sm:gap-3 sm:p-4">
            <span className="mr-1 hidden text-[12px] font-black uppercase tracking-widest text-yellow-300 sm:block">
              Offer<br />ends in
            </span>
            {[
              [pad(h), "Hours"],
              [pad(m), "Mins"],
              [pad(s), "Secs"],
            ].map(([v, l]) => (
              <div key={l} className="min-w-[68px] rounded-xl border-2 border-[#1e0a3c] bg-white px-3 py-2 text-center text-[#1e0a3c] sm:min-w-[80px]">
                <p className="font-mono text-2xl font-black tabular-nums sm:text-3xl">{v}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6d28d9]">{l}</p>
              </div>
            ))}
          </div>

          {/* price card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 overflow-hidden rounded-[28px] border-[3px] border-white bg-white text-[#1e0a3c] shadow-[10px_10px_0_0_rgba(0,0,0,0.45)]"
          >
            <div className="bg-yellow-300 px-6 py-3 text-center">
              <p className="text-[13px] font-black uppercase tracking-wide">
                🔥 {SITE_CONFIG.pricing.slotsLeft} of {SITE_CONFIG.pricing.totalSlots} discounted slots left at this price
              </p>
              <div className="mx-auto mt-2 h-2.5 max-w-sm overflow-hidden rounded-full bg-[#1e0a3c]/15">
                <div
                  className="h-full rounded-full bg-[#1e0a3c]"
                  style={{ width: `${(SITE_CONFIG.pricing.slotsLeft / SITE_CONFIG.pricing.totalSlots) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-6 text-center sm:p-8">
              <p className="text-[12px] font-black uppercase tracking-[0.25em] text-gray-500">
                Simplified Online Survey Guide + 4 bonuses
              </p>
              <div className="mt-2 flex items-end justify-center gap-3">
                <span className="pb-2 text-xl font-bold text-gray-400 line-through">₦{priceOld}</span>
                <span className="font-display text-6xl font-black tracking-tight text-[#6d28d9] sm:text-7xl">
                  ₦{priceNow}
                </span>
              </div>
              <p className="mt-1 text-[13px] font-bold text-gray-500">
                (~{SITE_CONFIG.pricing.dollarCurrent} instead of {SITE_CONFIG.pricing.dollarOld} • One-time • Lifetime access)
              </p>

              <div className="mx-auto mt-5 max-w-md space-y-2.5 text-left">
                {[
                  "All 6 modules + screenshots & templates",
                  "2026 list of 30+ paying sites + direct links",
                  "Withdrawal blueprint (Grey / Geegpay / Payoneer)",
                  "Private WhatsApp community + updates for life",
                  "7-day action-based guarantee",
                ].map((t) => (
                  <p key={t} className="flex items-start gap-2 text-[14px] font-bold">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" /> {t}
                  </p>
                ))}
              </div>

              <CTAButton href={affLink} source="pricing" className="mx-auto mt-6 max-w-md" subtext="Secure Selar checkout • Pay with card, transfer or USSD">
                CLAIM MY 60% DISCOUNT NOW →
              </CTAButton>

              <div className="mx-auto mt-4 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] font-bold text-gray-500">
                <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> 256-bit secured</span>
                <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" /> Card / Transfer / USSD</span>
                <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Instant delivery</span>
              </div>
            </div>
          </motion.div>

          {/* guarantee */}
          <div className="mt-6 grid gap-4 rounded-[28px] border-2 border-white/20 bg-white/5 p-6 backdrop-blur sm:grid-cols-[auto_1fr] sm:items-center sm:p-7">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-yellow-300 bg-[#6d28d9] text-center">
              <div>
                <ShieldCheck className="mx-auto h-8 w-8 text-yellow-300" />
                <p className="font-display text-[13px] font-black leading-tight text-white">7-DAY<br />GUARANTEE</p>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-black">Try It Risk-Free. Action-Takers Are Protected.</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-purple-100">
                Go through the guide, set up at least 3 sites and take surveys for 7 days. If you feel it's
                not for you, message support with proof of action and we'll make it right per the policy on
                the checkout page. No long story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="rounded-full bg-purple-100 px-4 py-1.5 text-[12px] font-black uppercase text-[#4c1d95]">
              Still thinking? Fair.
            </span>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">
              Questions? <span className="text-[#6d28d9]">Answered.</span>
            </h2>
          </div>
          <div className="mt-7 space-y-3">
            {[
              {
                q: "I be complete beginner. I fit do am?",
                a: "Yes — na beginners we design am for. Simple English, screenshots for every step, plus templates to copy. If you can use WhatsApp, you can do this. 60%+ of our students had zero online-earning experience.",
              },
              {
                q: "Do these survey sites really pay Nigerians?",
                a: "Yes — but NOT all sites. That's why the guide exists. We give you the 2026-tested list of 30+ sites that accept Nigerians (or work with our profile method) and show how to receive money via Grey, Geegpay or Payoneer straight to your Naira account.",
              },
              {
                q: "How much can I realistically make?",
                a: "Be sincere: beginners typically make £30–£150 in month 1 doing 1–2hrs daily, growing as you stack sites. Some do more, some less. It's a side income, not a salary replacement overnight. One payout can cover the ₦9,900 cost many times over.",
              },
              {
                q: "I have a full-time job / school. Time go reach?",
                a: "That's exactly who this is for. The guide includes a 1-hour daily plan (and weekend plan). Surveys save progress — do them on lunch break, in traffic, or 8–9pm. No meetings, no boss.",
              },
              {
                q: "Do I need a laptop or capital?",
                a: "No. Smartphone + data is enough. No capital needed to join the survey sites. You only pay once for the guide (₦9,900 today) — no monthly fee.",
              },
              {
                q: "How do I receive the guide after payment?",
                a: "Instantly. Once you pay via the secure Selar checkout (card, transfer or USSD), you'll get download + WhatsApp community links immediately on screen and by email. Read on any phone.",
              },
              {
                q: "What if it doesn't work for me?",
                a: "Follow the 7-day action plan inside. If after genuine action you feel it's not for you, contact support as described on the checkout page. Plus you keep lifetime updates — the list only gets better.",
              },
              {
                q: "Is this betting, forex or crypto?",
                a: "No. No risk, no trading, no referrals required. Foreign research companies pay for opinions. You answer questions, they pay. That's all.",
              },
            ].map((f, i) => {
              const open = faqOpen === i;
              return (
                <div
                  key={f.q}
                  className={`overflow-hidden rounded-2xl border-[2.5px] transition-all ${
                    open ? "border-[#6d28d9] bg-purple-50 shadow-[4px_4px_0_0_#6d28d9]" : "border-[#1e0a3c] bg-white"
                  }`}
                >
                  <button
                    onClick={() => setFaqOpen(open ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="font-display text-[15px] font-black sm:text-[16px]">{f.q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#1e0a3c] ${open ? "bg-[#6d28d9] text-white" : "bg-yellow-300"}`}>
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={3} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 text-[14px] font-medium leading-relaxed text-gray-700">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border-[2.5px] border-dashed border-[#6d28d9] bg-purple-50 p-5 text-center">
            <p className="font-display text-[16px] font-black">Still have a question? Chat with us 👇</p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl border-[2.5px] border-[#1e0a3c] bg-green-500 px-5 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0_0_#1e0a3c] hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-[#1e0a3c] px-4 py-14 text-center text-white sm:py-20">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-96 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6d28d9]/60 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="inline-block rounded-full bg-yellow-300 px-4 py-1.5 text-[12px] font-black uppercase text-[#1e0a3c]">
            ⚠️ Last chance — price increases when timer hits zero
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-[1.05] sm:text-5xl">
            In 6 Months You'll Wish You Started <span className="text-yellow-300">Today.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-purple-100 sm:text-lg">
            Every week you wait na pounds you for don earn. Your phone is already in your hand —
            make it pay you. Join {SITE_CONFIG.socialProof.students}+ Nigerians inside.
          </p>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3 font-mono text-2xl font-black">
            {[pad(h), pad(m), pad(s)].map((v, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="rounded-xl bg-white px-3 py-1.5 text-[#1e0a3c]">{v}</span>
                {i < 2 && <span className="text-yellow-300">:</span>}
              </span>
            ))}
          </div>
          <CTAButton href={affLink} source="final" className="mx-auto mt-6 max-w-md" subtext="Instant access • 7-day action guarantee">
            YES, GIVE ME ACCESS NOW →
          </CTAButton>
          <div className="mt-5 flex items-center justify-center gap-2 text-[13px] font-bold text-purple-200">
            <Phone className="h-4 w-4" /> Prefer to ask first?{" "}
            <a href={waLink} target="_blank" rel="noreferrer" className="text-yellow-300 underline underline-offset-2">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#120626] px-4 py-10 text-purple-200">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <Logo variant="light" />
              <p className="mt-3 text-[13px] leading-relaxed">
                Simplified Online Survey Guide by {SITE_CONFIG.brand.name}. Helping everyday Nigerians
                earn legitimate side income in foreign currency since 2022.
              </p>
            </div>
            {/* <div className="text-[13px]">
              <p className="font-black uppercase tracking-widest text-white">Quick links</p>
              <div className="mt-2 flex flex-col gap-1.5 font-semibold">
                <a href="#inside" className="hover:text-yellow-300">What's inside</a>
                <a href="#results" className="hover:text-yellow-300">Student results</a>
                <a href="#bonuses" className="hover:text-yellow-300">Bonuses</a>
                <a href="#pricing" className="hover:text-yellow-300">Get access</a>
                <a href={waLink} target="_blank" rel="noreferrer" className="hover:text-yellow-300">Contact support</a>
              </div>
            </div> */}
            {/* <div className="text-[13px]">
              <p className="font-black uppercase tracking-widest text-white">Affiliate / Owner?</p>
              <p className="mt-2 leading-relaxed">
                All “Get Access” buttons point to your checkout link. To change it without editing code,
                tap the <strong className="text-white">⚙️ purple button</strong> (bottom-left) → paste your
                Selar / Stakecut link → Save. You can also update price & WhatsApp number there.
              </p>
              <p className="mt-2 rounded-lg bg-white/5 p-2 font-mono text-[11px] break-all">
                Current checkout: {affLink}
              </p>
            </div> */}
          </div>
          <div className="mt-8 border-t border-white/10 pt-5 text-[11.5px] leading-relaxed text-purple-300">
            <p>
              <strong className="text-white">Earnings disclaimer:</strong> This is an educational
              information product. We do not guarantee income. Survey earnings depend on your effort,
              consistency, demographics and availability of surveys. Testimonials shown are individual
              experiences and are not typical or a promise of results. Foreign exchange rates fluctuate.
            </p>
            <p className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <span>© 2026 {SITE_CONFIG.brand.name}. All rights reserved.</span>
              <span>Made with 💜 in Nigeria • Secure checkout via Selar</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ============ STICKY MOBILE BAR ============ */}
      {SITE_CONFIG.showStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t-[3px] border-[#1e0a3c] bg-white/95 px-3 py-2.5 backdrop-blur-md">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-black uppercase">
                60% off ends in <span className="font-mono text-[#6d28d9]">{pad(h)}:{pad(m)}:{pad(s)}</span>
              </p>
              <p className="text-[13px] font-black">
                ₦{priceNow} <span className="font-bold text-gray-400 line-through">₦{priceOld}</span>
              </p>
            </div>
            <a
              href={affLink}
              target="_blank"
              rel="noreferrer"
              className="animate-pulse-ring shrink-0 rounded-xl border-[2.5px] border-[#1e0a3c] bg-yellow-300 px-5 py-3 text-[14px] font-black uppercase text-[#1e0a3c]"
            >
              Claim →
            </a>
          </div>
        </div>
      )}

      {/* ============ WHATSAPP FLOAT ============ */}
      {SITE_CONFIG.showWhatsappFloat && (
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-20 right-4 z-50 flex h-13 w-13 items-center justify-center rounded-full border-[2.5px] border-[#1e0a3c] bg-green-500 p-3.5 text-white shadow-[4px_4px_0_0_#1e0a3c] transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
        </a>
      )}

      {/* ============ CUSTOMIZE (affiliate) PANEL TRIGGER ============ */}
      {/* <button
        onClick={() => setShowCustomize(true)}
        aria-label="Customize links"
        className="fixed bottom-20 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-white bg-[#6d28d9] text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] transition-transform hover:scale-105 sm:bottom-6"
      >
        <Settings2 className="h-5 w-5" />
      </button> */}

      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center"
            onClick={() => setShowCustomize(false)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border-[3px] border-[#1e0a3c] bg-white p-6 shadow-[8px_8px_0_0_#6d28d9]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-black">⚙️ Make It Yours</h3>
                  <p className="text-[13px] font-semibold text-gray-500">
                    Paste your affiliate checkout link once — every CTA updates instantly.
                  </p>
                </div>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="rounded-full border-2 border-[#1e0a3c] bg-gray-100 p-1.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-left">
                <div>
                  <label className="text-[12px] font-black uppercase">🔗 Affiliate checkout link</label>
                  <input
                    value={affLink}
                    onChange={(e) => setAffLink(e.target.value)}
                    placeholder="https://selar.com/7210p5?affiliate=YOURCODE"
                    className="mt-1 w-full rounded-xl border-2 border-[#1e0a3c] px-3 py-2.5 text-[13px] font-semibold outline-none focus:border-[#6d28d9]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-black uppercase">💰 Price now (₦)</label>
                    <input
                      value={priceNow}
                      onChange={(e) => setPriceNow(e.target.value)}
                      className="mt-1 w-full rounded-xl border-2 border-[#1e0a3c] px-3 py-2.5 text-[13px] font-black outline-none focus:border-[#6d28d9]"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-black uppercase">Old price (₦)</label>
                    <input
                      value={priceOld}
                      onChange={(e) => setPriceOld(e.target.value)}
                      className="mt-1 w-full rounded-xl border-2 border-[#1e0a3c] px-3 py-2.5 text-[13px] font-bold outline-none focus:border-[#6d28d9]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-black uppercase">💬 WhatsApp number</label>
                  <input
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    placeholder="2349163440242"
                    className="mt-1 w-full rounded-xl border-2 border-[#1e0a3c] px-3 py-2.5 text-[13px] font-semibold outline-none focus:border-[#6d28d9]"
                  />
                </div>
              </div>
              <button
                onClick={saveCustom}
                className="mt-4 w-full rounded-xl border-[2.5px] border-[#1e0a3c] bg-[#6d28d9] py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0_0_#1e0a3c]"
              >
                Save & update all buttons →
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("smng_aff");
                  localStorage.removeItem("smng_wa");
                  localStorage.removeItem("smng_price");
                  localStorage.removeItem("smng_old");
                  setAffLink(SITE_CONFIG.affiliateLink);
                  setWaNumber(SITE_CONFIG.whatsappNumber);
                  setPriceNow(SITE_CONFIG.pricing.current);
                  setPriceOld(SITE_CONFIG.pricing.old);
                }}
                className="mt-2 w-full text-center text-[12px] font-bold text-gray-500 underline"
              >
                Reset to defaults
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ EXIT / TIMED POPUP ============ */}
      <AnimatePresence>
        {showExit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ y: 50, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border-[3px] border-[#1e0a3c] bg-white text-center shadow-[8px_8px_0_0_#6d28d9]"
            >
              <div className="bg-[#1e0a3c] px-6 py-5 text-white">
                <p className="inline-block rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-black uppercase text-[#1e0a3c]">
                  Wait! Don't miss your discount
                </p>
                <h3 className="mt-2 font-display text-2xl font-black leading-tight">
                  Before You Go… Your 60% OFF Is Still Reserved 👀
                </h3>
              </div>
              <div className="p-6">
                <p className="text-[14px] font-semibold text-gray-600">
                  Join in the next <strong className="font-mono text-[#6d28d9]">{pad(h)}:{pad(m)}:{pad(s)}</strong> and
                  keep all 4 bonuses (worth ₦44,500) FREE.
                </p>
                <CTAButton href={affLink} source="popup" className="mt-4">
                  CLAIM IT NOW — ₦{priceNow} →
                </CTAButton>
                <button
                  onClick={() => setShowExit(false)}
                  className="mt-3 text-[13px] font-bold text-gray-400 underline"
                >
                  No thanks, I like earning only in Naira
                </button>
              </div>
              <button
                onClick={() => setShowExit(false)}
                className="absolute right-3 top-3 rounded-full bg-white/15 p-1.5 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* spacer for sticky bar */}
      <div className="h-[68px] bg-[#120626]" />
    </div>
  );
}
