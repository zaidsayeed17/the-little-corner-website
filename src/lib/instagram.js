/**
 * Instagram integration and clipboard utilities for The Little Corner.
 * Instagram DM is the primary order-inquiry channel.
 */
import { siteConfig } from "../config/site";
import { customOrderMessage } from "./whatsapp";

/**
 * Returns the Instagram DM URL or null if unconfigured.
 * @returns {string|null}
 */
export function getInstagramDmUrl() {
  const url = siteConfig.instagramDmUrl;
  return url && typeof url === "string" && url.trim() ? url.trim() : null;
}

/**
 * Builds the Instagram DM URL with an optional best-effort prefilled message.
 * Reads siteConfig.instagramDmUrl; returns null if missing/empty.
 * If features.tryPrefilledDmText is true and message is given, returns the DM URL with ?text= (or &text=).
 * Otherwise returns the plain DM URL.
 *
 * @param {string} [message]
 * @returns {string|null}
 */
export function buildInstagramDmUrl(message) {
  const rawUrl = siteConfig.instagramDmUrl;
  if (!rawUrl || typeof rawUrl !== "string" || !rawUrl.trim()) {
    return null;
  }
  const baseUrl = rawUrl.trim();
  const shouldPrefill = Boolean(siteConfig.features?.tryPrefilledDmText);
  if (shouldPrefill && message && typeof message === "string" && message.length > 0) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

/**
 * Returns the Instagram profile URL or null if unconfigured.
 * @returns {string|null}
 */
export function getInstagramProfileUrl() {
  const url = siteConfig.instagramUrl;
  return url && typeof url === "string" && url.trim() ? url.trim() : null;
}

/**
 * Creates pre-filled inquiry text for an individual product.
 * Returns: "Hi! I'm interested in the <productName>. Please share its price and details."
 * If the name is missing or empty, returns:
 * "Hi! I'm interested in one of your handmade pieces. Please share its price and details."
 * Never outputs "undefined".
 *
 * @param {string|{ name?: string }} [productOrName]
 * @returns {string}
 */
export function productInquiryMessage(productOrName) {
  let name = "";
  if (typeof productOrName === "string") {
    name = productOrName.trim();
  } else if (
    productOrName &&
    typeof productOrName === "object" &&
    typeof productOrName.name === "string"
  ) {
    name = productOrName.name.trim();
  }

  if (!name) {
    return "Hi! I'm interested in one of your handmade pieces. Please share its price and details.";
  }

  return `Hi! I'm interested in the ${name}. Please share its price and details.`;
}

/**
 * Creates readable multi-line custom order inquiry message.
 * Begins with "Hi The Little Corner! I'd like to ask about a custom order."
 * and builds strictly from filled fields.
 *
 * @param {{ occasion?: string, itemType?: string, notes?: string }} details
 * @returns {string}
 */
export function customOrderInquiryMessage(details = {}) {
  return customOrderMessage(details);
}

/**
 * Creates an inquiry message listing saved items.
 *
 * @param {Array<{ name: string }>} products
 * @returns {string}
 */
export function savedListInquiryMessage(products = []) {
  if (!products || products.length === 0) {
    return "Hi The Little Corner! I'm interested in your handmade gifts.";
  }

  const items = products
    .filter((p) => p && p.name)
    .map((p) => `• ${p.name}`)
    .join("\n");

  return `Hi The Little Corner! I'm interested in these pieces:\n${items}\n\nCould you share availability, price details, and how to order?`;
}

/**
 * Safely copies text to the clipboard.
 * Uses navigator.clipboard with graceful fallback to hidden textarea + execCommand.
 * Always resolves to a boolean and NEVER throws.
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  if (!text || typeof text !== "string") {
    return false;
  }

  // 1. Try modern navigator.clipboard API
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Proceed to fallback
  }

  // 2. Fallback to textarea + document.execCommand
  try {
    if (typeof document !== "undefined" && document.body) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      textArea.setAttribute("readonly", "");
      textArea.setAttribute("aria-hidden", "true");
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = typeof document.execCommand === "function" ? document.execCommand("copy") : false;
      document.body.removeChild(textArea);
      return Boolean(successful);
    }
  } catch {
    return false;
  }

  return false;
}
