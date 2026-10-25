import { describe, it, expect } from "vitest";
import {
  buildWhatsAppUrl,
  productMessage,
  customOrderMessage,
  savedListMessage,
  sanitizePhoneNumber,
  isWhatsAppConfigured,
} from "../lib/whatsapp";
import {
  getInstagramDmUrl,
  getInstagramProfileUrl,
  buildInstagramDmUrl,
  productInquiryMessage,
  customOrderInquiryMessage,
  savedListInquiryMessage,
  copyToClipboard,
} from "../lib/instagram";
import { formatPrice } from "../lib/format";
import { filterProducts } from "../lib/filters";
import { siteConfig } from "../config/site";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../data/products";
import { categories } from "../data/categories";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../../public");

describe("site configuration", () => {
  it("configures Instagram profile and DM URLs correctly", () => {
    expect(siteConfig.instagramHandle).toBe("thelittlecornerbytasbiii");
    expect(siteConfig.instagramUrl).toBe(
      "https://www.instagram.com/thelittlecornerbytasbiii/"
    );
    expect(siteConfig.instagramDmUrl).toBe(
      "https://ig.me/m/thelittlecornerbytasbiii"
    );
    expect(siteConfig.features.primaryOrderChannel).toBe("instagram");
    expect(siteConfig.features.tryPrefilledDmText).toBe(true);
  });

  it("leaves whatsappNumber empty as a secondary unconfigured channel", () => {
    expect(siteConfig.whatsappNumber).toBe("");
    expect(isWhatsAppConfigured(siteConfig.whatsappNumber)).toBe(false);
  });

  it("configures the live deployment siteUrl correctly", () => {
    expect(siteConfig.siteUrl).toBe("https://the-littlecorner.vercel.app");
  });
});

describe("instagram utilities", () => {
  it("getInstagramDmUrl and getInstagramProfileUrl return valid URLs from config", () => {
    expect(getInstagramDmUrl()).toBe("https://ig.me/m/thelittlecornerbytasbiii");
    expect(getInstagramProfileUrl()).toBe(
      "https://www.instagram.com/thelittlecornerbytasbiii/"
    );
  });

  it("productInquiryMessage exact string matches requirement for product names", () => {
    expect(productInquiryMessage("Pink Handmade Flower Bouquet")).toBe(
      "Hi! I'm interested in the Pink Handmade Flower Bouquet. Please share its price and details."
    );
  });

  it("different products produce different messages without hardcoded names", () => {
    const msg1 = productInquiryMessage("Rose Keepsake Charm");
    const msg2 = productInquiryMessage("Mini Flower Pot");
    expect(msg1).toBe("Hi! I'm interested in the Rose Keepsake Charm. Please share its price and details.");
    expect(msg2).toBe("Hi! I'm interested in the Mini Flower Pot. Please share its price and details.");
    expect(msg1).not.toBe(msg2);
  });

  it("empty or undefined product name uses generic fallback and never outputs 'undefined' or 'null'", () => {
    const emptyFallback = productInquiryMessage("");
    const undefinedFallback = productInquiryMessage(undefined);
    const nullFallback = productInquiryMessage(null);
    const emptyObjFallback = productInquiryMessage({});

    const expectedFallback =
      "Hi! I'm interested in one of your handmade pieces. Please share its price and details.";

    expect(emptyFallback).toBe(expectedFallback);
    expect(undefinedFallback).toBe(expectedFallback);
    expect(nullFallback).toBe(expectedFallback);
    expect(emptyObjFallback).toBe(expectedFallback);

    expect(undefinedFallback).not.toContain("undefined");
    expect(undefinedFallback).not.toContain("null");
  });

  it("buildInstagramDmUrl returns null when config is missing or empty", () => {
    const originalUrl = siteConfig.instagramDmUrl;
    try {
      siteConfig.instagramDmUrl = "";
      expect(buildInstagramDmUrl("Test")).toBeNull();
      siteConfig.instagramDmUrl = null;
      expect(buildInstagramDmUrl("Test")).toBeNull();
    } finally {
      siteConfig.instagramDmUrl = originalUrl;
    }
  });

  it("buildInstagramDmUrl includes ?text= with correct encoding of apostrophes, spaces and punctuation when tryPrefilledDmText is on", () => {
    const originalFlag = siteConfig.features.tryPrefilledDmText;
    try {
      siteConfig.features.tryPrefilledDmText = true;
      const message = "Hi! I'm interested in the Pink Flower & Charm (Gift's).";
      const url = buildInstagramDmUrl(message);

      expect(url).toBe(
        `https://ig.me/m/thelittlecornerbytasbiii?text=${encodeURIComponent(message)}`
      );
      expect(url).toContain("?text=");
      expect(url).not.toContain(" "); // all spaces encoded
      expect(url).toContain("%20");
      expect(url).toContain("%26"); // '&' encoded
    } finally {
      siteConfig.features.tryPrefilledDmText = originalFlag;
    }
  });

  it("buildInstagramDmUrl returns the plain URL when tryPrefilledDmText flag is off", () => {
    const originalFlag = siteConfig.features.tryPrefilledDmText;
    try {
      siteConfig.features.tryPrefilledDmText = false;
      const url = buildInstagramDmUrl("Hi! I'm interested.");
      expect(url).toBe("https://ig.me/m/thelittlecornerbytasbiii");
      expect(url).not.toContain("?text=");
    } finally {
      siteConfig.features.tryPrefilledDmText = originalFlag;
    }
  });

  it("buildInstagramDmUrl handles a base URL that already has '?' by using '&'", () => {
    const originalUrl = siteConfig.instagramDmUrl;
    const originalFlag = siteConfig.features.tryPrefilledDmText;
    try {
      siteConfig.instagramDmUrl = "https://ig.me/m/thelittlecornerbytasbiii?ref=site";
      siteConfig.features.tryPrefilledDmText = true;
      const message = "Hello";
      const url = buildInstagramDmUrl(message);
      expect(url).toBe(
        `https://ig.me/m/thelittlecornerbytasbiii?ref=site&text=${encodeURIComponent(message)}`
      );
      expect(url).toContain("&text=");
    } finally {
      siteConfig.instagramDmUrl = originalUrl;
      siteConfig.features.tryPrefilledDmText = originalFlag;
    }
  });

  it("customOrderInquiryMessage omits empty fields and begins with correct header", () => {
    const partial = customOrderInquiryMessage({
      occasion: "Birthday",
      notes: "Pastel colors only",
    });
    expect(partial).toContain("Hi The Little Corner! I'd like to ask about a custom order:");
    expect(partial).toContain("• Occasion: Birthday");
    expect(partial).toContain("• Notes: Pastel colors only");
    expect(partial).not.toContain("• Item:");

    const full = customOrderInquiryMessage({
      occasion: "Anniversary",
      itemType: "Flowers",
      notes: "Special ribbon",
    });
    expect(full).toContain("• Occasion: Anniversary");
    expect(full).toContain("• Item: Flowers");
    expect(full).toContain("• Notes: Special ribbon");
  });

  it("savedListInquiryMessage lists every product name", () => {
    const list = savedListInquiryMessage([
      { name: "Pink Crochet Rose" },
      { name: "Initial Keychain Charm" },
      { name: "Mini Gift Box" },
    ]);
    expect(list).toContain("Hi The Little Corner! I'm interested in these pieces:");
    expect(list).toContain("• Pink Crochet Rose");
    expect(list).toContain("• Initial Keychain Charm");
    expect(list).toContain("• Mini Gift Box");
  });

  it("copyToClipboard returns false without throwing when clipboard is unavailable", async () => {
    // When passed null/undefined or in environment without working clipboard
    const res = await copyToClipboard("");
    expect(res).toBe(false);

    // Should never throw
    await expect(copyToClipboard(null)).resolves.toBe(false);
  });
});

describe("whatsapp utilities", () => {
  it("sanitizes phone numbers correctly", () => {
    expect(sanitizePhoneNumber("+91 98765 43210")).toBe("919876543210");
    expect(sanitizePhoneNumber("91-98765-43210")).toBe("919876543210");
    expect(sanitizePhoneNumber("")).toBe("");
    expect(sanitizePhoneNumber(null)).toBe("");
  });

  it("buildWhatsAppUrl returns proper wa.me link with sanitized number", () => {
    const url = buildWhatsAppUrl({ number: "+91 98765 43210", message: "Hello there!" });
    expect(url).toBe("https://wa.me/919876543210?text=Hello%20there!");
  });

  it("buildWhatsAppUrl still returns null for '', whitespace or invalid values", () => {
    expect(buildWhatsAppUrl({ number: "" })).toBeNull();
    expect(buildWhatsAppUrl({ number: "   " })).toBeNull();
    expect(buildWhatsAppUrl({ number: null })).toBeNull();
    expect(buildWhatsAppUrl({ number: "123" })).toBeNull(); // Less than 5 digits
  });

  it("buildWhatsAppUrl properly encodes special characters in message", () => {
    const url = buildWhatsAppUrl({
      number: "919876543210",
      message: "Flowers & Keychains: Are they available?",
    });
    expect(url).toContain("Flowers%20%26%20Keychains%3A%20Are%20they%20available%3F");
  });

  it("productMessage contains the product name and does not fabricate price", () => {
    const msg = productMessage({ name: "Handmade Flower Bouquet" });
    expect(msg).toContain("Handmade Flower Bouquet");
    expect(msg).toContain("Could you share price, availability and how to order?");
    expect(msg).not.toMatch(/₹|\$|\d+/);
  });

  it("customOrderMessage skips empty fields and formats filled fields", () => {
    const partialMsg = customOrderMessage({ occasion: "Birthday", notes: "Pastel pink preferred" });
    expect(partialMsg).toContain("Occasion: Birthday");
    expect(partialMsg).toContain("Notes: Pastel pink preferred");
    expect(partialMsg).not.toContain("Item:");
  });

  it("savedListMessage formats saved products cleanly", () => {
    const msg = savedListMessage([
      { name: "Bouquet Sample" },
      { name: "Keychain Sample" },
    ]);
    expect(msg).toContain("Bouquet Sample");
    expect(msg).toContain("Keychain Sample");
  });

  it("isWhatsAppConfigured correctly validates presence of 5+ digits", () => {
    expect(isWhatsAppConfigured("")).toBe(false);
    expect(isWhatsAppConfigured("1234")).toBe(false);
    expect(isWhatsAppConfigured("+919876543210")).toBe(true);
  });
});

describe("formatPrice utility", () => {
  it("returns null for null, undefined, or NaN", () => {
    expect(formatPrice(null)).toBeNull();
    expect(formatPrice(undefined)).toBeNull();
    expect(formatPrice(NaN)).toBeNull();
  });

  it("formats valid numeric price with configured currency", () => {
    const formatted = formatPrice(599, { code: "INR", locale: "en-IN" });
    expect(formatted).toBeTruthy();
    expect(formatted).toMatch(/599/);
  });
});

describe("filterProducts utility", () => {
  const sampleProducts = [
    { id: "1", name: "Rose Flower Bouquet", category: "flowers", shortDescription: "Handmade roses" },
    { id: "2", name: "Daisy Floral Pot", category: "flowers", shortDescription: "Bright daisies" },
    { id: "3", name: "Initial Charm Keychain", category: "keychains", shortDescription: "Cute charm" },
    { id: "4", name: "Gift Hamper Set", category: "other-gifts", shortDescription: "Curated gift box" },
  ];

  it("returns all products when no filters applied or category is all", () => {
    expect(filterProducts(sampleProducts, { category: "all" })).toHaveLength(4);
    expect(filterProducts(sampleProducts, {})).toHaveLength(4);
  });

  it("filters by category correctly", () => {
    const flowers = filterProducts(sampleProducts, { category: "flowers" });
    expect(flowers).toHaveLength(2);
    expect(flowers.every((p) => p.category === "flowers")).toBe(true);

    const keychains = filterProducts(sampleProducts, { category: "keychains" });
    expect(keychains).toHaveLength(1);
    expect(keychains[0].id).toBe("3");
  });

  it("filters by case-insensitive query in name and description", () => {
    const queryName = filterProducts(sampleProducts, { query: "rose" });
    expect(queryName).toHaveLength(1);
    expect(queryName[0].name).toBe("Rose Flower Bouquet");

    const queryDesc = filterProducts(sampleProducts, { query: "curated" });
    expect(queryDesc).toHaveLength(1);
    expect(queryDesc[0].id).toBe("4");
  });

  it("combines category and query filters", () => {
    const combined = filterProducts(sampleProducts, { category: "flowers", query: "daisy" });
    expect(combined).toHaveLength(1);
    expect(combined[0].name).toBe("Daisy Floral Pot");

    const mismatched = filterProducts(sampleProducts, { category: "keychains", query: "daisy" });
    expect(mismatched).toHaveLength(0);
  });

  it("returns empty array when no matches found", () => {
    const none = filterProducts(sampleProducts, { query: "nonexistent item" });
    expect(none).toEqual([]);
  });
});

describe("catalogue data integrity and categorization", () => {
  it("every product has a unique id and unique slug", () => {
    expect(products.length).toBe(16);

    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(products.length);

    const slugs = products.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(products.length);
  });

  it("every product has non-empty name, non-empty alt text, and valid category", () => {
    const validCategoryIds = categories.map((c) => c.id);

    products.forEach((product) => {
      expect(typeof product.name).toBe("string");
      expect(product.name.trim().length).toBeGreaterThan(0);

      expect(typeof product.image?.alt).toBe("string");
      expect(product.image.alt.trim().length).toBeGreaterThan(0);

      expect(validCategoryIds).toContain(product.category);
    });
  });

  it("every product image.src points to a physically existing file under public/", () => {
    products.forEach((product) => {
      expect(product.image?.src).toBeTruthy();
      const relativePath = product.image.src.replace(/^\//, "");
      const fullPath = path.join(publicDir, relativePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it("category filter counts match catalogue breakdown (flowers: 4, keychains: 11, other-gifts: 1)", () => {
    const flowers = filterProducts(products, { category: "flowers" });
    const keychains = filterProducts(products, { category: "keychains" });
    const otherGifts = filterProducts(products, { category: "other-gifts" });

    expect(flowers).toHaveLength(4);
    expect(keychains).toHaveLength(11);
    expect(otherGifts).toHaveLength(1);
    expect(flowers.length + keychains.length + otherGifts.length).toBe(16);
  });
});
