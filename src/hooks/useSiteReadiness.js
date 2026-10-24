import { useMemo } from "react";
import { siteConfig } from "../config/site";
import { products } from "../data/products";

/**
 * Hook to inspect site readiness and report missing production configuration.
 * Instagram DM is configured and active. WhatsApp is optional.
 *
 * @returns {{ isReady: boolean, missingItems: Array<{ id: string, label: string, location: string, optional?: boolean }> }}
 */
export function useSiteReadiness() {
  return useMemo(() => {
    const missing = [];

    // WhatsApp is secondary and optional
    if (!siteConfig.whatsappNumber || !siteConfig.whatsappNumber.trim()) {
      missing.push({
        id: "whatsapp",
        label: "WhatsApp phone number (Optional secondary channel)",
        location: "src/config/site.js (whatsappNumber)",
        optional: true,
      });
    }

    if (!siteConfig.siteUrl || !siteConfig.siteUrl.trim()) {
      missing.push({
        id: "siteUrl",
        label: "Canonical site URL (for SEO / OG tags)",
        location: "src/config/site.js (siteUrl)",
        optional: false,
      });
    }

    const hasRealImages = products.some((p) => p.image && p.image.src !== null);
    if (!hasRealImages) {
      missing.push({
        id: "photos",
        label: "Real product photographs (currently using placeholders)",
        location: "public/images/ & src/data/products.js",
        optional: false,
      });
    }

    const hasRealPrices = products.some((p) => p.price !== null);
    if (!hasRealPrices) {
      missing.push({
        id: "prices",
        label: "Product prices (currently all null 'Message for price')",
        location: "src/data/products.js",
        optional: false,
      });
    }

    const requiredMissing = missing.filter((m) => !m.optional);

    return {
      isReady: requiredMissing.length === 0,
      missingItems: missing,
      missingCount: missing.length,
    };
  }, []);
}
