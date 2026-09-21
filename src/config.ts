// ============================================================
// ⚙️ AFFILIATE CUSTOMIZATION CENTER
// Edit ONLY this file to make this landing page yours.
// All buttons, pricing links and contact details pull from here.
// ============================================================

export const SITE_CONFIG = {
  // 🔗 YOUR AFFILIATE LINK — paste your Selar / Stakecut / Expertnaire link here
  // Example: "https://selar.com/7210p5?affiliate=YOURCODE"
  affiliateLink: "https://selar.com/7210p5",

  // 💬 Your WhatsApp number for support (include country code, no +)
  whatsappNumber: "2349163440242",
  whatsappMessage:
    "Hello! I want to ask about the Simplified Online Survey Guide (Get Paid in Pounds).",

  brand: {
    name: "CentralAfCo™",
    product: "SIMPLIFIED ONLINE SURVEY GUIDE",
    tagline: "GET PAID IN POUNDS",
    logoText: "SurveyMastery",
    logoSuffix: "NG",
  },

  pricing: {
    currency: "₦",
    current: "9,900",
    currentRaw: 9900,
    old: "25,000",
    oldRaw: 35000,
    dollarCurrent: "$10.00",
    dollarOld: "$22.12",
    discountPercent: "60% OFF",
    // countdown ends in hours from first visit
    countdownHours: 11,
    countdownMinutes: 47,
    slotsLeft: 17,
    totalSlots: 50,
  },

  socialProof: {
    students: "3,847",
    ratings: "523",
    avgRating: "4.8",
    countries: "UK • US • CA",
  },

  // Toggle sections on/off without touching code
  showStickyBar: true,
  showWhatsappFloat: true,
};

export const getAffiliateLink = (source: string) => {
  const base = SITE_CONFIG.affiliateLink;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}src=${source}`;
};
