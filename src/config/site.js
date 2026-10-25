/**
 * Site configuration for The Little Corner.
 * Instagram DM is the primary order-inquiry channel.
 * WhatsApp is a secondary optional channel (number currently unconfigured).
 */
const rawConfig = {
  brandName: "The Little Corner",
  tagline: "handmade with love", // draft copy, editable
  instagramHandle: "thelittlecornerbytasbiii",
  instagramUrl: "https://www.instagram.com/thelittlecornerbytasbiii/",
  instagramDmUrl: "https://ig.me/m/thelittlecornerbytasbiii",
  whatsappNumber: "", // TODO: digits only with country code; leave empty until the owner supplies it
  email: "", // optional TODO: e.g. hello@thelittlecorner.com
  address: "", // optional TODO: studio or city location
  siteUrl: "https://the-littlecorner.vercel.app",
  currency: {
    code: "INR",
    locale: "en-IN",
  }, // TODO: confirm store currency
  announcement: {
    enabled: true,
    text: "Handmade flowers, keychains & gifts. Order by Instagram DM.",
  },
  features: {
    primaryOrderChannel: "instagram",
    tryPrefilledDmText: true, // Instagram may ignore prefilled text; the copy-message fallback always works.
    newsletter: false, // Set to true only when a real newsletter submission URL is configured
    instagramGallery: true,
    savedList: true,
    showPlaceholderBadges: true, // Shows dev/draft badges for unconfirmed items and placeholder images
  },
  trustItems: [
    {
      id: "handmade",
      icon: "Sparkles",
      title: "Handmade",
      text: "Crafted individually by hand with love and care.",
      confirmed: false, // TODO: confirm copy
    },
    {
      id: "care",
      icon: "Heart",
      title: "Made with care",
      text: "Thoughtful designs made to be given and kept.",
      confirmed: false, // TODO: confirm copy
    },
    {
      id: "personal",
      icon: "Gift",
      title: "Personal touches",
      text: "Custom notes and personalized packaging available.",
      confirmed: false, // TODO: confirm copy
    },
    {
      id: "order-channel",
      icon: "MessageCircle",
      title: "Order by Instagram DM",
      text: "Message the maker directly to place or customize orders.",
      confirmed: false, // TODO: confirm copy
    },
  ],
};

// Derive profile & DM URLs if handle is updated without explicit URLs
if (rawConfig.instagramHandle) {
  const cleanHandle = rawConfig.instagramHandle.replace(/^@/, "").trim();
  if (cleanHandle) {
    if (!rawConfig.instagramUrl) {
      rawConfig.instagramUrl = `https://www.instagram.com/${cleanHandle}/`;
    }
    if (!rawConfig.instagramDmUrl) {
      rawConfig.instagramDmUrl = `https://ig.me/m/${cleanHandle}`;
    }
  }
}

export const siteConfig = rawConfig;
