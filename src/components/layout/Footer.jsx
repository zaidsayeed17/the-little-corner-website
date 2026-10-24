import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, ArrowUp, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "../decor/InstagramIcon";
import { Logo } from "./Logo";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "../../lib/whatsapp";
import { getInstagramDmUrl, getInstagramProfileUrl } from "../../lib/instagram";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const instagramProfileUrl = getInstagramProfileUrl();
  const instagramDmUrl = getInstagramDmUrl();
  const hasWhatsApp = isWhatsAppConfigured(siteConfig.whatsappNumber);

  const whatsappUrl = hasWhatsApp
    ? buildWhatsAppUrl({
        number: siteConfig.whatsappNumber,
        message: "Hi The Little Corner! I would like to get in touch.",
      })
    : null;

  return (
    <footer className="relative bg-white/70 border-t border-blush-200 pt-16 pb-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-blush-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-plum-700 max-w-sm leading-relaxed">
              {siteContent.footer.description}
            </p>

            {/* Handle & DM Ordering Row */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-semibold text-rose-700 block">
                @{siteConfig.instagramHandle}
              </span>
              {instagramDmUrl && (
                <a
                  href={instagramDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-plum-900 hover:text-rose-600 transition-colors underline"
                  aria-label="DM us to order on Instagram (opens in a new tab)"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-rose-600" />
                  <span>{siteContent.footer.dmPrompt || "DM us to order"}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {instagramProfileUrl && (
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit The Little Corner on Instagram @${siteConfig.instagramHandle}`}
                  className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {hasWhatsApp && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message The Little Corner on WhatsApp"
                  className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Contact info rendered ONLY if configured */}
            {(siteConfig.email || siteConfig.address) && (
              <div className="pt-2 space-y-1.5 text-xs text-plum-700">
                {siteConfig.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-rose-600" />
                    <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                      {siteConfig.email}
                    </a>
                  </div>
                )}
                {siteConfig.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>{siteConfig.address}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-plum-950 uppercase tracking-wider">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-sm">
              {siteContent.footer.shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-plum-700 hover:text-rose-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Info & Story */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-plum-950 uppercase tracking-wider">
              About Us
            </h4>
            <ul className="space-y-2 text-sm">
              {siteContent.footer.infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-plum-700 hover:text-rose-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-plum-950 uppercase tracking-wider">
              Care &amp; Policies
            </h4>
            <ul className="space-y-2 text-sm">
              {siteContent.footer.policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-plum-700 hover:text-rose-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-plum-500">
          <p className="flex items-center gap-1">
            © {currentYear} {siteConfig.brandName}. Made with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline" aria-hidden="true" />
            <span className="sr-only">love</span> for handmade keepsakes.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-plum-700 hover:text-rose-600 transition-colors py-1 px-2 rounded-lg hover:bg-blush-50"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
