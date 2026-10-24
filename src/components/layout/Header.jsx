import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, MessageCircle, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";
import { SavedDrawer } from "./SavedDrawer";
import { MobileMenu } from "./MobileMenu";
import { InstagramIcon } from "../decor/InstagramIcon";
import { useSavedItems } from "../../hooks/useSavedItems";
import { siteConfig } from "../../config/site";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "../../lib/whatsapp";
import { getInstagramDmUrl } from "../../lib/instagram";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { count } = useSavedItems();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const instagramDmUrl = getInstagramDmUrl();
  const hasWhatsApp = isWhatsAppConfigured(siteConfig.whatsappNumber);
  const whatsappUrl = hasWhatsApp
    ? buildWhatsAppUrl({
        number: siteConfig.whatsappNumber,
        message: "Hi The Little Corner! I would love to ask about your handmade gifts.",
      })
    : null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Gifts", href: "/shop?category=other-gifts" },
    { label: "Story", href: "/#story" },
    { label: "Custom Orders", href: "/#custom-order" },
  ];

  const isActiveLink = (href) => {
    if (href === "/") {
      return location.pathname === "/" && !location.hash;
    }
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.replace("/", "");
    }
    return location.pathname + location.search === href;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-ivory/90 backdrop-blur-md border-b border-blush-200 shadow-xs py-3"
            : "bg-ivory/70 backdrop-blur-xs py-4"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 -ml-2 rounded-xl text-plum-900 hover:bg-blush-100/70 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Logo />
          </div>

          {/* Center: Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-plum-900 transition-colors hover:text-rose-600 ${
                    active ? "font-semibold text-rose-600" : ""
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search handmade gifts"
              className="p-2 sm:p-2.5 rounded-full text-plum-900 hover:text-rose-600 hover:bg-blush-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Drawer Trigger */}
            <button
              type="button"
              onClick={() => setSavedOpen(true)}
              aria-label={`View saved gifts (${count} items)`}
              className="relative p-2 sm:p-2.5 rounded-full text-plum-900 hover:text-rose-600 hover:bg-blush-100 transition-colors"
            >
              <Heart className={`w-5 h-5 ${count > 0 ? "text-rose-600 fill-rose-600" : ""}`} />
              {count > 0 && (
                <span className="absolute 1 sm:top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border border-ivory">
                  {count}
                </span>
              )}
            </button>

            {/* Instagram DM Primary Action */}
            {instagramDmUrl ? (
              <a
                href={instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on Instagram"
                title="Message on Instagram DM"
                className="p-2 sm:p-2.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs btn-lift ml-1"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Instagram link not set yet"
                aria-label="Message on Instagram (link not configured)"
                className="p-2 sm:p-2.5 rounded-full bg-rose-600/40 text-white/80 cursor-not-allowed ml-1"
              >
                <InstagramIcon className="w-5 h-5" />
              </button>
            )}

            {/* WhatsApp Secondary Channel Icon Button */}
            {hasWhatsApp && whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on WhatsApp (secondary channel)"
                title="Chat with maker on WhatsApp"
                className="p-2 sm:p-2.5 rounded-full border border-blush-300 text-plum-700 hover:text-rose-600 hover:bg-blush-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="WhatsApp number not set yet"
                aria-label="WhatsApp (number not set yet)"
                className="p-2 sm:p-2.5 rounded-full border border-blush-200 text-plum-300 cursor-not-allowed opacity-60"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Dialogs and Drawers */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <SavedDrawer isOpen={savedOpen} onClose={() => setSavedOpen(false)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
