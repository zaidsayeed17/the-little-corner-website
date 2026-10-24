/**
 * Formatting helpers for currency and text.
 */

/**
 * Formats a numeric price using Intl.NumberFormat.
 * Returns null if price is null, undefined, or invalid.
 *
 * @param {number|null|undefined} price
 * @param {{ code?: string, locale?: string }} [currency]
 * @returns {string|null}
 */
export function formatPrice(price, currency = { code: "INR", locale: "en-IN" }) {
  if (price === null || price === undefined || typeof price !== "number" || Number.isNaN(price)) {
    return null;
  }

  try {
    const code = currency?.code || "INR";
    const locale = currency?.locale || "en-IN";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `₹${price}`;
  }
}
