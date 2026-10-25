import React, { useEffect, useRef, useState } from "react";
import { X, Heart, Trash2, ArrowRight, Check, Copy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedItems } from "../../hooks/useSavedItems";
import { ImageWithSkeleton } from "../media/ImageWithSkeleton";
import { PriceTag } from "../ui/PriceTag";
import { InstagramIcon } from "../decor/InstagramIcon";
import { WhatsAppSecondaryButton } from "../ui/WhatsAppSecondaryButton";
import {
  getInstagramDmUrl,
  savedListInquiryMessage,
  copyToClipboard,
} from "../../lib/instagram";
import { savedListMessage } from "../../lib/whatsapp";

export function SavedDrawer({ isOpen, onClose }) {
  const { savedProducts, toggleSaved, clearSaved, count } = useSavedItems();
  const [copied, setCopied] = useState(false);
  const drawerRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        drawerRef.current?.focus();
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

  const instagramDmUrl = getInstagramDmUrl();
  const igMessage = savedListInquiryMessage(savedProducts);
  const waMessage = savedListMessage(savedProducts);

  const handleInstagramClick = async () => {
    // Attempt automatic silent copy
    try {
      const ok = await copyToClipboard(igMessage);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // Manual copy fallback below
    }
  };

  const handleCopyList = async () => {
    const ok = await copyToClipboard(igMessage);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
      ref={drawerRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-end bg-plum-950/60 backdrop-blur-xs transition-opacity focus:outline-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-ivory h-full shadow-2xl flex flex-col border-l border-blush-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-blush-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 id="saved-drawer-title" className="font-serif text-lg font-bold text-plum-950">
              Saved Gifts ({count})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved drawer"
            className="p-1.5 text-plum-500 hover:text-plum-900 rounded-lg hover:bg-blush-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent>
          {savedProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blush-100 mx-auto flex items-center justify-center text-rose-500">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-semibold text-plum-950">
                No saved pieces yet. Tap the heart on anything you like.
              </h3>
              <p className="text-sm text-plum-700 max-w-xs mx-auto">
                Explore our handmade flowers, keychains, and gift collections.
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 rounded-full text-xs font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors btn-lift"
              >
                Explore gifts
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-plum-500 pb-1">
                <span>Items stored in your browser</span>
                <button
                  type="button"
                  onClick={clearSaved}
                  className="text-rose-700 hover:text-rose-800 hover:underline font-medium"
                >
                  Clear all
                </button>
              </div>

              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blush-200 shadow-xs"
                >
                  <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-blush-100">
                    <ImageWithSkeleton
                      src={product.image?.src}
                      alt={product.image?.alt || product.name}
                      placeholderTone={product.image?.placeholderTone || "blush"}
                      placeholderIcon={
                        product.category === "flowers"
                          ? "flower"
                          : product.category === "keychains"
                          ? "keychain"
                          : "gift"
                      }
                      showPlaceholderBadge={false}
                      objectPosition={product.image?.objectPosition || "center"}
                      aspectRatio="aspect-4/5"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-semibold text-plum-950 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-plum-500 capitalize">{product.category}</p>
                    <div className="mt-1">
                      <PriceTag price={product.price} />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaved(product.id)}
                    aria-label={`Remove ${product.name} from saved items`}
                    className="p-2 text-plum-500 hover:text-rose-600 rounded-lg hover:bg-blush-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {savedProducts.length > 0 && (
          <div className="p-6 border-t border-blush-200 bg-white space-y-3.5">
            {/* Primary Order on Instagram */}
            {instagramDmUrl ? (
              <a
                href={instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleInstagramClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition-colors shadow-soft btn-lift"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Order saved items on Instagram</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Instagram link not set yet"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-rose-600/50 text-white font-medium text-sm cursor-not-allowed opacity-75"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram link not set yet</span>
              </button>
            )}

            {/* Copyable saved items block */}
            <div className="p-3 bg-blush-50 border border-blush-200 rounded-xl space-y-2 text-left">
              <div className="flex items-center justify-between text-xs font-semibold text-plum-950">
                <span>Saved Pieces Inquiry:</span>
                {instagramDmUrl && (
                  <a
                    href={instagramDmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-rose-700 hover:underline"
                  >
                    <span>Open DM</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <textarea
                readOnly
                value={igMessage}
                rows={3}
                aria-label="Saved items message to paste into Instagram DM"
                className="w-full text-xs font-mono bg-white border border-blush-200 rounded-lg p-2 text-plum-900 select-all resize-none focus:outline-hidden"
                onClick={(e) => e.target.select()}
              />
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleCopyList}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-plum-950 hover:bg-plum-900 text-white text-xs font-medium transition-colors btn-lift"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-rose-300" />
                      <span>Copied list!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy list</span>
                    </>
                  )}
                </button>
                <div aria-live="polite" className="text-[11px] text-plum-700">
                  {copied ? "List copied to clipboard" : "Paste in Instagram DM"}
                </div>
              </div>
            </div>

            {/* Secondary WhatsApp Button */}
            <div className="flex justify-center pt-1">
              <WhatsAppSecondaryButton
                message={waMessage}
                productName="Saved items"
                label="Inquire saved on WhatsApp"
              />
            </div>

            <p className="text-[11px] text-center text-plum-500">
              Instagram will open in a new tab. Paste the copied list into your message to chat with the maker.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
