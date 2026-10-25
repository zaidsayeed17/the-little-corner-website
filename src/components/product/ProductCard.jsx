import React, { useState } from "react";
import { Heart } from "lucide-react";
import { ImageWithSkeleton } from "../media/ImageWithSkeleton";
import { PriceTag } from "../ui/PriceTag";
import { AvailabilityChip } from "../ui/AvailabilityChip";
import { Badge } from "../ui/Badge";
import { InstagramOrderButton } from "../ui/InstagramOrderButton";
import { OrderInquiryPanel } from "../ui/OrderInquiryPanel";
import { WhatsAppSecondaryButton } from "../ui/WhatsAppSecondaryButton";
import { useSavedItems } from "../../hooks/useSavedItems";
import { siteConfig } from "../../config/site";
import { productInquiryMessage, copyToClipboard } from "../../lib/instagram";
import { productMessage } from "../../lib/whatsapp";

export function ProductCard({ product }) {
  const [showInquiry, setShowInquiry] = useState(false);
  const [copyStatus, setCopyStatus] = useState("idle");
  const { isSaved, toggleSaved } = useSavedItems();
  const saved = isSaved(product.id);

  const isSoldOut = product.availability === "sold-out";
  const showSampleTag = product.isPlaceholder && siteConfig.features.showPlaceholderBadges;

  const igMessage = productInquiryMessage(product);
  const waMessage = productMessage(product);

  const handleOrderClick = async () => {
    setShowInquiry(true);
    try {
      const success = await copyToClipboard(igMessage);
      setCopyStatus(success ? "copied" : "failed");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <article className="group flex flex-col bg-white rounded-[20px] overflow-hidden border border-blush-200 shadow-soft hover-lift">
      {/* 4:5 Product Image Box */}
      <div className="relative aspect-4/5 w-full bg-blush-50 overflow-hidden">
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
          showPlaceholderBadge={Boolean(product.isPlaceholder && siteConfig.features.showPlaceholderBadges)}
          objectPosition={product.image?.objectPosition || "center"}
          aspectRatio="aspect-4/5"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {product.badge && (
            <Badge variant="rose" className="shadow-xs">
              {product.badge}
            </Badge>
          )}
          {showSampleTag && (
            <Badge variant="sample">
              Sample
            </Badge>
          )}
        </div>

        {/* Heart Save Toggle */}
        <button
          type="button"
          onClick={() => toggleSaved(product.id)}
          aria-pressed={saved}
          aria-label={`Save ${product.name}`}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-plum-900 hover:text-rose-600 shadow-xs transition-transform active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? "text-rose-600 fill-rose-600" : "text-plum-700"
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              {product.category}
            </span>
            <AvailabilityChip availability={product.availability} />
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-plum-950 group-hover:text-rose-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-plum-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-2 border-t border-blush-100 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <PriceTag price={product.price} />
          </div>

          {/* Primary & Secondary Order Actions */}
          {isSoldOut ? (
            <button
              type="button"
              disabled
              className="w-full py-2.5 px-3 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-400 cursor-not-allowed text-center"
            >
              Sold out
            </button>
          ) : (
            <div className="space-y-2">
              <InstagramOrderButton
                productName={product.name}
                message={igMessage}
                label="I'm Interested"
                variant="rose"
                fullWidth={true}
                onClick={handleOrderClick}
              />

              {/* Inquiry Message Helper Popover/Panel */}
              <OrderInquiryPanel
                isOpen={showInquiry}
                onClose={() => setShowInquiry(false)}
                message={igMessage}
                productName={product.name}
                copyStatus={copyStatus}
                onCopyStatusChange={setCopyStatus}
              />

              {/* Subordinate WhatsApp secondary channel */}
              <div className="pt-1 flex justify-center">
                <WhatsAppSecondaryButton
                  productName={product.name}
                  message={waMessage}
                  disabled={isSoldOut}
                  fullWidth={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
