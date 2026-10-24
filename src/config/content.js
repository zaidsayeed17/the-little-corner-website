/**
 * Centralized content and copy for The Little Corner.
 * All draft copy is editable here and marked for verification.
 * Instagram DM is the primary order-inquiry channel.
 */
export const siteContent = {
  hero: {
    eyebrow: "handmade with love",
    headlineLine1: "Little gifts,",
    headlineLine2: "made by hand.",
    paragraph: "Handmade flowers, keychains and thoughtful little gifts, made to be given and kept.",
    shopCta: "Shop Gifts",
    customCta: "Custom Order",
    dmCta: "Message us on Instagram",
    stickyNote: "small things, made with love",
    isDraft: true,
  },
  categories: {
    title: "Browse by Category",
    subtitle: "Explore our sample handmade collections",
    isDraft: true,
  },
  featuredProducts: {
    eyebrow: "handcrafted with warmth",
    title: "Handmade Picks",
    subtitle: "A few of our favourites. Message us on Instagram to order.",
    viewAllCta: "View all gifts",
    emptyMessage: "Nothing in this category yet. Message us on Instagram for a custom piece.",
    isDraft: true,
  },
  story: {
    eyebrow: "our little story",
    title: "Made slowly, given warmly.",
    paragraph1:
      "The Little Corner is a small craft space where flowers, keychains, and keepsake gifts are handmade with care and patience.",
    paragraph2:
      "Every piece is handcrafted one at a time. Whether you are celebrating a special milestone or simply brightening someone's day, we make heartfelt gifts to cherish.",
    howItWorksTitle: "How it works",
    steps: [
      {
        step: "1",
        title: "Pick a piece or share an idea",
        description: "Browse our sample creations or dream up a custom colorway.",
        confirmed: false, // owner to confirm process
      },
      {
        step: "2",
        title: "Message us on Instagram",
        description: "Chat directly with us in Instagram DM to discuss details, price, and availability.",
        confirmed: false, // owner to confirm process
      },
      {
        step: "3",
        title: "We handcraft it for you",
        description: "Each order is handmade and prepared with sweet personal touches.",
        confirmed: false, // owner to confirm process
      },
    ],
    cta: "Message us on Instagram",
    isDraft: true,
  },
  packaging: {
    eyebrow: "gift ready",
    title: "Wrapped with care",
    checklist: [
      { text: "Handmade details", confirmed: false },
      { text: "Pretty presentation", confirmed: false },
      { text: "Personal touches", confirmed: false },
      { text: "Ready to gift", confirmed: false },
    ],
    showcaseCards: [
      { id: "wrap-1", caption: "Gift wrapping", tone: "blush" },
      { id: "wrap-2", caption: "Personal notes", tone: "rose" },
      { id: "wrap-3", caption: "Little details", tone: "cream" },
      { id: "wrap-4", caption: "Ready to give", tone: "leaf" },
    ],
    isDraft: true,
  },
  customOrder: {
    eyebrow: "bespoke creations",
    title: "Custom Order Planner",
    subtitle: "Looking for specific flower colors, keychain charms, or bespoke gifts? Let us know!",
    disclaimer: "Instagram opens in a new tab. Paste this message into your DM. Nothing is sent or stored by this website.",
    form: {
      occasionLabel: "Occasion",
      occasionPlaceholder: "Select an occasion...",
      occasionOptions: ["Birthday", "Anniversary", "Wedding", "Thank you", "Just because", "Other"],
      itemTypeLabel: "What would you like?",
      itemTypePlaceholder: "Select item type...",
      itemTypeOptions: ["Flowers", "Keychain", "Other gift", "Not sure"],
      notesLabel: "Notes or ideas",
      notesPlaceholder: "Tell us about preferred colors, names, or special requests (optional)...",
      submitButton: "Continue on Instagram",
      secondaryWhatsAppButton: "Send on WhatsApp",
    },
    isDraft: true,
  },
  instagram: {
    eyebrow: "our craft journey",
    title: "Follow along",
    followButton: "Follow on Instagram",
    dmButton: "Message on Instagram",
    isDraft: true,
  },
  followBand: {
    title: "Stay in the loop",
    description: "See new handmade pieces on Instagram and DM us directly to order.",
    instagramCta: "Follow on Instagram",
    dmCta: "Message us on Instagram",
    whatsappCta: "Message on WhatsApp",
    isDraft: true,
  },
  footer: {
    description: "Handmade flowers, keychains and heartfelt crafted gifts, made slowly with love.",
    dmPrompt: "DM us to order",
    shopLinks: [
      { label: "All Items", href: "/shop" },
      { label: "Handmade Flowers", href: "/shop?category=flowers" },
      { label: "Crafted Keychains", href: "/shop?category=keychains" },
      { label: "Thoughtful Gifts", href: "/shop?category=other-gifts" },
    ],
    infoLinks: [
      { label: "Our Story", href: "/#story" },
      { label: "Packaging", href: "/#packaging" },
      { label: "Custom Orders", href: "/#custom-order" },
      { label: "Frequently Asked Questions", href: "/faqs" },
    ],
    policyLinks: [
      { label: "Shipping & Delivery", href: "/policies/shipping-delivery" },
      { label: "Returns & Custom Orders", href: "/policies/returns-custom-orders" },
      { label: "Privacy Policy", href: "/policies/privacy" },
    ],
    isDraft: true,
  },
  faqs: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our handmade items and ordering process.",
    draftNotice: "Draft answers. Final terms and timelines to be confirmed by the owner.",
    items: [
      {
        question: "How do I order?",
        answer: "Message us on Instagram from any product or the custom order form. WhatsApp will be available once the number is added.",
        confirmed: true,
      },
      {
        question: "How long does an order take?",
        answer: "TODO: owner to provide. Handmade items generally take a few days to create depending on current queue and customization requirements.",
        confirmed: false,
      },
      {
        question: "Do you deliver?",
        answer: "TODO: owner to provide delivery locations, pickup options, and shipping partners.",
        confirmed: false,
      },
      {
        question: "Can I request a custom design?",
        answer: "TODO: owner to provide custom order scope, accepted customization types, and color palettes.",
        confirmed: false,
      },
      {
        question: "What payment methods do you accept?",
        answer: "TODO: owner to provide accepted payment options (e.g. UPI, bank transfer, etc.).",
        confirmed: false,
      },
    ],
  },
  policies: {
    "shipping-delivery": {
      title: "Shipping & Delivery",
      description: "Information regarding order dispatch, delivery timelines, and transit handling.",
      draftNotice: "TODO: owner to provide official shipping coverage, courier partners, and transit timelines.",
      paragraphs: [
        "All items from The Little Corner are handcrafted with care. Dispatch timelines vary according to whether your piece is in stock or made to order.",
        "Detailed shipping rates, estimated transit days, and domestic coverage will be updated here prior to official store launch.",
      ],
    },
    "returns-custom-orders": {
      title: "Returns & Custom Orders",
      description: "Guidelines regarding order cancellations, exchanges, and personalized pieces.",
      draftNotice: "TODO: owner to provide cancellation window and handcrafted item return policy.",
      paragraphs: [
        "Because our flowers, keychains, and gifts are crafted by hand (and many are personalized to individual requests), returns and exchanges are evaluated on a case-by-case basis.",
        "Official return policies, damage in transit reporting windows, and exchange terms will be confirmed by the brand owner before opening orders.",
      ],
    },
    privacy: {
      title: "Privacy Policy",
      description: "How we respect your personal details and order information.",
      draftNotice: "TODO: owner to confirm customer data protection and communication preferences.",
      paragraphs: [
        "The Little Corner does not run online tracking ads or sell customer data. When you reach out via Instagram DM or WhatsApp, your contact info is only used to coordinate your specific order.",
        "No payment card numbers or passwords are ever collected through this website.",
      ],
    },
  },
};
