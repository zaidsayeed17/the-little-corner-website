import React, { useState } from "react";
import { Sparkles, Check, Copy, ExternalLink } from "lucide-react";
import { InstagramIcon } from "../decor/InstagramIcon";
import { WhatsAppSecondaryButton } from "../ui/WhatsAppSecondaryButton";
import { siteContent } from "../../config/content";
import {
  customOrderInquiryMessage,
  getInstagramDmUrl,
  copyToClipboard,
} from "../../lib/instagram";
import { customOrderMessage } from "../../lib/whatsapp";

export function CustomOrderPlanner({ className = "" }) {
  const [occasion, setOccasion] = useState("");
  const [itemType, setItemType] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = customOrderInquiryMessage({ occasion, itemType, notes });
    setSubmittedMessage(msg);

    // Open Instagram DM URL in a new tab immediately (synchronous to prevent popup blockers and timing delays)
    const dmUrl = getInstagramDmUrl();
    if (dmUrl && typeof window !== "undefined") {
      window.open(dmUrl, "_blank", "noopener,noreferrer");
    }

    // Try silent copy to clipboard
    try {
      const success = await copyToClipboard(msg);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // Gracefully rely on manual Copy button
    }
  };

  const handleManualCopy = async () => {
    if (!submittedMessage) return;
    const success = await copyToClipboard(submittedMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const { form } = siteContent.customOrder;
  const waCurrentMessage = customOrderMessage({ occasion, itemType, notes });
  const dmUrl = getInstagramDmUrl();

  return (
    <div
      id="custom-order"
      className={`scroll-mt-24 rounded-[28px] bg-gradient-to-br from-[#FFF5F8] via-[#FFFAF5] to-[#FDE9EF] border border-blush-200 shadow-soft p-6 sm:p-10 ${className}`}
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-rose-600">
            <Sparkles className="w-4 h-4" />
            <span className="font-script text-xl sm:text-2xl font-semibold">
              {siteContent.customOrder.eyebrow}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-plum-950">
            {siteContent.customOrder.title}
          </h3>

          <p className="text-xs sm:text-sm text-plum-700 leading-relaxed">
            {siteContent.customOrder.subtitle}
          </p>
        </div>

        {/* Real HTML Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Occasion select */}
            <div className="space-y-1.5">
              <label htmlFor="custom-occasion" className="block text-xs font-bold text-plum-950 uppercase tracking-wider">
                {form.occasionLabel}
              </label>
              <select
                id="custom-occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-blush-200 text-plum-950 text-sm focus:outline-hidden transition-colors"
              >
                <option value="">{form.occasionPlaceholder}</option>
                {form.occasionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Item type select */}
            <div className="space-y-1.5">
              <label htmlFor="custom-item-type" className="block text-xs font-bold text-plum-950 uppercase tracking-wider">
                {form.itemTypeLabel}
              </label>
              <select
                id="custom-item-type"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-blush-200 text-plum-950 text-sm focus:outline-hidden transition-colors"
              >
                <option value="">{form.itemTypePlaceholder}</option>
                {form.itemTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="custom-notes" className="block text-xs font-bold text-plum-950 uppercase tracking-wider">
                {form.notesLabel}
              </label>
              <span className="text-[11px] text-plum-500">
                {notes.length}/500
              </span>
            </div>
            <textarea
              id="custom-notes"
              rows={3}
              maxLength={500}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={form.notesPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-blush-200 text-plum-950 text-sm focus:outline-hidden resize-none transition-colors"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 space-y-3">
            {/* Primary Continue on Instagram Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm sm:text-base transition-colors shadow-soft btn-lift"
            >
              <InstagramIcon className="w-5 h-5" />
              <span>{form.submitButton}</span>
            </button>

            {/* Secondary WhatsApp Button */}
            <div className="flex justify-center pt-1">
              <WhatsAppSecondaryButton
                message={waCurrentMessage}
                productName="Custom piece"
                label={form.secondaryWhatsAppButton || "Send on WhatsApp"}
              />
            </div>
          </div>

          {/* Prompt Wording / Non-negotiable caption */}
          <p className="text-[11px] text-center text-plum-700 pt-1">
            Instagram opens in a new tab. Paste this message into your DM. Nothing is sent or stored by this website.
          </p>

          {/* Revealed Message Block after submit */}
          {submittedMessage && (
            <div
              className="mt-4 p-4 rounded-2xl bg-white border border-blush-300 shadow-soft text-left space-y-2 animate-in fade-in duration-200"
              role="region"
              aria-label="Ready to send custom order message"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold text-plum-950">
                  Ready to paste into your DM:
                </span>
                {dmUrl && (
                  <a
                    href={dmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:underline"
                  >
                    <span>Open DM</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <textarea
                readOnly
                value={submittedMessage}
                rows={4}
                aria-label="Custom order message text"
                className="w-full text-xs font-mono bg-blush-50 border border-blush-200 rounded-xl p-2.5 text-plum-900 select-all focus:outline-hidden"
                onClick={(e) => e.target.select()}
              />

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleManualCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-plum-950 hover:bg-plum-900 text-white text-xs font-medium transition-colors btn-lift"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-rose-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy message</span>
                    </>
                  )}
                </button>

                <div aria-live="polite" className="text-[11px] text-plum-700">
                  {copied ? "Message copied to clipboard" : "Click to copy text"}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
