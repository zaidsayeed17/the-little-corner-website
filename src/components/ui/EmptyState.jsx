import React, { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { InstagramOrderButton } from "./InstagramOrderButton";
import { OrderInquiryPanel } from "./OrderInquiryPanel";
import { WhatsAppSecondaryButton } from "./WhatsAppSecondaryButton";
import { customOrderInquiryMessage } from "../../lib/instagram";
import { customOrderMessage } from "../../lib/whatsapp";

export function EmptyState({
  title = "No gifts found",
  message = "Nothing in this category yet. Message us on Instagram for a custom piece.",
  onReset,
  showCustomOrderCta = true,
  className = "",
}) {
  const [showInquiry, setShowInquiry] = useState(false);

  const igInquiryMsg = customOrderInquiryMessage({
    notes: "I was browsing your website and wanted to inquire about a custom piece.",
  });
  const waInquiryMsg = customOrderMessage({
    notes: "I was browsing your website and wanted to inquire about a custom piece.",
  });

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white/70 border border-blush-200 shadow-soft max-w-md mx-auto my-8 ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center text-rose-600 mb-4 shadow-xs">
        <Sparkles className="w-7 h-7" />
      </div>

      <h3 className="font-serif text-xl font-bold text-plum-950 mb-2">{title}</h3>
      <p className="text-sm text-plum-700 leading-relaxed mb-6">{message}</p>

      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-blush-300 text-plum-900 bg-white hover:bg-blush-50 transition-colors btn-lift"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              Clear filters
            </button>
          )}

          {showCustomOrderCta && (
            <InstagramOrderButton
              label="Order custom piece"
              productName="Custom piece"
              fullWidth={!onReset}
              onClick={() => setShowInquiry(true)}
            />
          )}
        </div>

        {/* Inquiry message copy panel */}
        {showCustomOrderCta && showInquiry && (
          <OrderInquiryPanel
            isOpen={showInquiry}
            onClose={() => setShowInquiry(false)}
            message={igInquiryMsg}
            productName="Custom piece"
            className="w-full mt-2"
          />
        )}

        {/* Secondary WhatsApp button */}
        {showCustomOrderCta && (
          <div className="pt-1">
            <WhatsAppSecondaryButton
              message={waInquiryMsg}
              productName="Custom piece"
            />
          </div>
        )}
      </div>
    </div>
  );
}
