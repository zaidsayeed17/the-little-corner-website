import React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "../../lib/whatsapp";
import { siteConfig } from "../../config/site";

export function WhatsAppSecondaryButton({
  message,
  productName,
  fullWidth = false,
  label = "WhatsApp",
  className = "",
  disabled = false,
}) {
  const isConfigured = isWhatsAppConfigured(siteConfig.whatsappNumber);
  const isEnabled = isConfigured && !disabled;

  const url = isEnabled
    ? buildWhatsAppUrl({ number: siteConfig.whatsappNumber, message })
    : null;

  const widthClass = fullWidth ? "w-full" : "";
  const ariaLabel = productName
    ? `Inquire about ${productName} on WhatsApp (secondary channel)`
    : "WhatsApp inquiry (secondary channel)";

  if (!isEnabled || !url) {
    return (
      <div className={`inline-flex flex-col items-center ${widthClass}`}>
        <button
          type="button"
          disabled
          aria-label={`${ariaLabel} (WhatsApp number not set yet)`}
          title="WhatsApp number not set yet"
          className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-blush-300 text-plum-500 bg-white/60 cursor-not-allowed opacity-75 ${widthClass} ${className}`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-plum-400" />
          <span>{label}</span>
        </button>
        <span className="text-[10px] text-plum-500 mt-0.5">
          WhatsApp number not set yet
        </span>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-blush-300 text-plum-900 bg-white hover:bg-blush-50 transition-colors ${widthClass} ${className}`}
    >
      <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
      <span>{label}</span>
    </a>
  );
}
