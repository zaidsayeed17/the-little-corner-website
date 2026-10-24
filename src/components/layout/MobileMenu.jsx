import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, MessageCircle } from "lucide-react";
import { InstagramIcon } from "../decor/InstagramIcon";
import { siteConfig } from "../../config/site";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "../../lib/whatsapp";
import { getInstagramDmUrl, getInstagramProfileUrl } from "../../lib/instagram";

export function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const menuRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        menuRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      if (previouslyFocusedElement.current && previouslyFocusedElement.current.focus) {
        previouslyFocusedElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Handmade Flowers", href: "/shop?category=flowers" },
    { label: "Crafted Keychains", href: "/shop?category=keychains" },
    { label: "Thoughtful Gifts", href: "/shop?category=other-gifts" },
    { label: "Our Story", href: "/#story" },
    { label: "Custom Orders", href: "/#custom-order" },
    { label: "FAQs", href: "/faqs" },
  ];

  const instagramDmUrl = getInstagramDmUrl();
  const instagramProfileUrl = getInstagramProfileUrl();
  const hasWhatsApp = isWhatsAppConfigured(siteConfig.whatsappNumber);
  const whatsappUrl = hasWhatsApp
    ? buildWhatsAppUrl({
        number: siteConfig.whatsappNumber,
        message: "Hi The Little Corner! I'd love to ask a question about your handmade gifts.",
      })
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
      ref={menuRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex bg-plum-950/60 backdrop-blur-xs transition-opacity lg:hidden focus:outline-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-4/5 max-w-sm bg-ivory h-full shadow-2xl flex flex-col border-r border-blush-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-blush-200 bg-white flex items-center justify-between">
          <div>
            <span id="mobile-nav-title" className="font-script text-2xl text-plum-950 font-semibold">
              {siteConfig.brandName}
            </span>
            <p className="text-[10px] uppercase tracking-widest text-rose-700">
              {siteConfig.tagline}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 text-plum-500 hover:text-plum-900 rounded-lg hover:bg-blush-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`block py-3 px-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-blush-100 text-rose-600 font-semibold"
                    : "text-plum-900 hover:bg-blush-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-6 border-t border-blush-200 bg-white space-y-3">
          {/* Primary Order on Instagram */}
          {instagramDmUrl ? (
            <a
              href={instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on Instagram (opens in a new tab)"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-rose-600 text-white font-medium text-sm transition-colors shadow-xs btn-lift"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Order on Instagram</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="Instagram link not set yet"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-rose-600/50 text-white font-medium text-sm cursor-not-allowed opacity-70"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram not configured</span>
            </button>
          )}

          {/* Profile follow link */}
          {instagramProfileUrl && (
            <a
              href={instagramProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-blush-300 text-plum-900 font-medium text-xs hover:bg-blush-50 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>Follow @{siteConfig.instagramHandle}</span>
            </a>
          )}

          {/* Secondary WhatsApp Row */}
          <div className="pt-1 flex flex-col items-center">
            {hasWhatsApp && whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-blush-200 text-plum-700 text-xs font-medium hover:bg-blush-50 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Message on WhatsApp</span>
              </a>
            ) : (
              <div className="w-full text-center">
                <button
                  type="button"
                  disabled
                  title="WhatsApp number not set yet"
                  aria-label="WhatsApp (number not configured)"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-blush-200 text-plum-400 text-xs font-medium bg-neutral-50/50 cursor-not-allowed opacity-75"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-plum-300" />
                  <span>WhatsApp</span>
                </button>
                <span className="block text-[10px] text-plum-500 mt-1">
                  WhatsApp number not set yet
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
