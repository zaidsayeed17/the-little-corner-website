import React from "react";
import { formatPrice } from "../../lib/format";
import { siteConfig } from "../../config/site";

export function PriceTag({ price, currency = siteConfig.currency, className = "" }) {
  const formatted = formatPrice(price, currency);

  if (!formatted) {
    return (
      <span className={`text-sm font-medium text-rose-700 italic ${className}`}>
        Message for price
      </span>
    );
  }

  return (
    <span className={`font-serif text-lg font-bold text-plum-950 ${className}`}>
      {formatted}
    </span>
  );
}
