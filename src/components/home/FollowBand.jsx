import React from "react";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "../decor/InstagramIcon";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "../../lib/whatsapp";
import { getInstagramDmUrl, getInstagramProfileUrl } from "../../lib/instagram";

export function FollowBand({ className = "" }) {
  const { followBand } = siteContent;
  const instagramProfileUrl = getInstagramProfileUrl();
  const instagramDmUrl = getInstagramDmUrl();
  const hasWhatsApp = isWhatsAppConfigured(siteConfig.whatsappNumber);

  const whatsappUrl = hasWhatsApp
    ? buildWhatsAppUrl({
        number: siteConfig.whatsappNumber,
        message: "Hi The Little Corner! I would love to stay updated on your handmade collections.",
      })
    : null;

  return (
    <section className={`py-12 sm:py-16 ${className}`} aria-label="Stay Connected">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-r from-[#FDE9EF] via-[#FAD5E1] to-[#FFF5F8] border border-blush-200 shadow-soft p-8 sm:p-12">
          {/* Decorative background envelope / heart illustration */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-15 pointer-events-none text-rose-600" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 88.5l-5.6-5.1C24.4 65.2 11 53 11 38c0-12.1 9.9-22 22-22 6.8 0 13.4 3.2 17 8.3 3.6-5.1 10.2-8.3 17-8.3 12.1 0 22 9.9 22 22 0 15-13.4 27.2-33.4 45.4L50 88.5z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
            {/* Cute envelope icon */}
            <div className="w-12 h-12 rounded-full bg-white/90 mx-auto flex items-center justify-center text-rose-600 shadow-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-plum-950">
              {followBand.title}
            </h3>

            <p className="text-sm sm:text-base text-plum-700 leading-relaxed">
              {followBand.description}
            </p>

            {/* Action buttons: Follow on Instagram, Message on Instagram, plus optional secondary WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {/* Follow on Instagram (Profile URL) */}
              {instagramProfileUrl && (
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-plum-950 hover:bg-plum-900 text-white font-medium text-sm transition-colors shadow-soft btn-lift"
                >
                  <InstagramIcon className="w-4 h-4 text-rose-300" />
                  <span>{followBand.instagramCta}</span>
                </a>
              )}

              {/* Message us on Instagram (DM URL) */}
              {instagramDmUrl && (
                <a
                  href={instagramDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition-colors shadow-soft btn-lift"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{followBand.dmCta || "Message us on Instagram"}</span>
                </a>
              )}

              {/* Secondary WhatsApp button only if configured or showPlaceholderBadges is true */}
              {hasWhatsApp && whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-blush-50 text-plum-950 font-medium text-xs border border-blush-300 transition-colors shadow-xs btn-lift"
                >
                  <MessageCircle className="w-4 h-4 text-rose-600" />
                  <span>{followBand.whatsappCta}</span>
                </a>
              ) : siteConfig.features.showPlaceholderBadges ? (
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    disabled
                    title="WhatsApp number not set yet"
                    aria-label="WhatsApp (number not configured)"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blush-200 text-plum-400 text-xs font-medium bg-white/60 cursor-not-allowed opacity-75"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-plum-300" />
                    <span>WhatsApp</span>
                  </button>
                  <span className="text-[10px] text-plum-500 mt-0.5">
                    WhatsApp number not set yet
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
