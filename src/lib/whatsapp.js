/**
 * WhatsApp integration utilities for The Little Corner.
 * Secondary optional communication channel.
 */
import { siteConfig } from "../config/site";

/**
 * Sanitizes phone number string to digits only.
 * @param {string} rawNumber
 * @returns {string} digits only
 */
export function sanitizePhoneNumber(rawNumber) {
  if (!rawNumber || typeof rawNumber !== "string") return "";
  return rawNumber.replace(/\D/g, "");
}

/**
 * Checks if a WhatsApp number is configured and valid.
 *
 * @param {string} [number]
 * @returns {boolean}
 */
export function isWhatsAppConfigured(number = siteConfig.whatsappNumber) {
  const digits = sanitizePhoneNumber(number);
  return Boolean(digits && digits.length >= 5);
}

/**
 * Builds a direct wa.me URL with optional pre-filled message text.
 * Returns null if the number is missing or contains no digits.
 *
 * @param {{ number?: string, message?: string }} options
 * @returns {string|null}
 */
export function buildWhatsAppUrl({ number = siteConfig.whatsappNumber, message } = {}) {
  const digits = sanitizePhoneNumber(number);
  if (!digits || digits.length < 5) {
    return null;
  }

  const baseUrl = `https://wa.me/${digits}`;
  if (!message || typeof message !== "string" || !message.trim()) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Creates pre-filled message for an individual product inquiry.
 * Uses "price" inquiry wording only and never fabricates a price.
 *
 * @param {{ name: string }} product
 * @returns {string}
 */
export function productMessage(product) {
  const productName = product?.name || "this item";
  return `Hi The Little Corner! I'm interested in: ${productName}. Could you share price, availability and how to order?`;
}

/**
 * Creates readable multi-line custom order inquiry built strictly from filled fields.
 *
 * @param {{ occasion?: string, itemType?: string, notes?: string }} details
 * @returns {string}
 */
export function customOrderMessage({ occasion, itemType, notes } = {}) {
  const lines = ["Hi The Little Corner! I'd like to ask about a custom order:"];

  if (occasion && occasion.trim()) {
    lines.push(`• Occasion: ${occasion.trim()}`);
  }
  if (itemType && itemType.trim()) {
    lines.push(`• Item: ${itemType.trim()}`);
  }
  if (notes && notes.trim()) {
    lines.push(`• Notes: ${notes.trim()}`);
  }

  lines.push("Could you share details on timeline, pricing, and how we can personalize it?");
  return lines.join("\n");
}

/**
 * Creates a message summarizing saved favorite items.
 *
 * @param {Array<{ name: string }>} products
 * @returns {string}
 */
export function savedListMessage(products = []) {
  if (!products || products.length === 0) {
    return "Hi The Little Corner! I'm looking for handmade gifts and would love to ask a few questions.";
  }

  const itemsList = products
    .filter((p) => p && p.name)
    .map((p) => `• ${p.name}`)
    .join("\n");

  return [
    "Hi The Little Corner! I saved these items from your website and would love to ask about availability and pricing:",
    itemsList,
    "Could you share how to order them?",
  ].join("\n");
}
