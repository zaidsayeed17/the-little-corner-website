import React from "react";
import { getInstagramDmUrl, buildInstagramDmUrl } from "../../lib/instagram";
import { InstagramIcon } from "../decor/InstagramIcon";

export function InstagramOrderButton({
  productName,
  message,
  href,
  ariaLabel,
  variant = "rose", // "rose" | "plum" | "outline"
  fullWidth = true,
  label = "I'm Interested",
  onClick,
  className = "",
  disabled = false,
}) {
  const targetUrl = href || (message ? buildInstagramDmUrl(message) : getInstagramDmUrl());
  const isAvailable = Boolean(targetUrl && !disabled);

  const computedAriaLabel =
    ariaLabel ||
    (productName
      ? `I'm interested in ${productName}, enquire on Instagram, opens in a new tab`
      : "I'm interested, enquire on Instagram, opens in a new tab");

  const variantStyles = {
    rose: "bg-rose-600 hover:bg-rose-700 text-white shadow-xs",
    plum: "bg-plum-950 hover:bg-plum-900 text-ivory shadow-soft",
    outline: "border-2 border-rose-500 text-rose-700 hover:bg-blush-100/60 bg-transparent",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] rounded-full text-xs sm:text-sm font-semibold transition-colors btn-lift focus-visible:outline-2 focus-visible:outline-rose-600 focus-visible:outline-offset-2";
  const widthStyle = fullWidth ? "w-full" : "";

  if (!isAvailable) {
    return (
      <div className={`relative ${widthStyle}`}>
        <button
          type="button"
          disabled
          aria-label={`${computedAriaLabel} (Instagram link not set yet)`}
          title="Instagram link not set yet"
          className={`${baseStyles} ${widthStyle} bg-rose-600/40 text-white/90 cursor-not-allowed opacity-75 ${className}`}
        >
          <InstagramIcon className="w-4 h-4 shrink-0 text-white/80" />
          <span>{label}</span>
        </button>
        <span className="block text-[10px] text-center text-plum-500 mt-1">
          Instagram link not set yet
        </span>
      </div>
    );
  }

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={computedAriaLabel}
      onClick={onClick}
      className={`${baseStyles} ${widthStyle} ${variantStyles[variant] || variantStyles.rose} ${className}`}
    >
      <InstagramIcon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
