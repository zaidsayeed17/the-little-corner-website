import React, { useState, useEffect, useRef } from "react";
import { Check, Copy, X, ExternalLink } from "lucide-react";
import { copyToClipboard, getInstagramDmUrl } from "../../lib/instagram";

export function OrderInquiryPanel({
  isOpen,
  onClose,
  message,
  productName,
  className = "",
  copyStatus: controlledCopyStatus,
  onCopyStatusChange,
}) {
  const [internalCopyStatus, setInternalCopyStatus] = useState("idle"); // "idle" | "copied" | "failed"
  const panelRef = useRef(null);

  const copyStatus = controlledCopyStatus !== undefined ? controlledCopyStatus : internalCopyStatus;
  const setStatus = onCopyStatusChange || setInternalCopyStatus;

  useEffect(() => {
    if (isOpen && controlledCopyStatus === undefined) {
      setInternalCopyStatus("idle");
    }
  }, [isOpen, controlledCopyStatus]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      const success = await copyToClipboard(message);
      if (success) {
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    }
  };

  if (!isOpen) return null;

  const dmUrl = getInstagramDmUrl();

  return (
    <div
      ref={panelRef}
      className={`rounded-2xl bg-blush-50 border border-blush-300 p-3.5 sm:p-4 text-left shadow-soft transition-all duration-200 ${className}`}
      role="region"
      aria-label={productName ? `Instagram message for ${productName}` : "Instagram inquiry message"}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 pb-2">
        <div>
          <span className="font-serif text-xs sm:text-sm font-bold text-plum-950 block">
            {productName ? `Inquire about ${productName}` : "Send message in Instagram DM"}
          </span>
          <p className="text-[11px] sm:text-xs text-rose-700 font-medium">
            Instagram will open in a new tab. Paste this message into your DM and review it before sending.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close message panel"
            className="p-1 text-plum-500 hover:text-plum-900 rounded-lg hover:bg-blush-100 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Readonly Message Box */}
      <div className="relative mt-1">
        <textarea
          readOnly
          value={message}
          rows={3}
          aria-label="Suggested inquiry message"
          className="w-full text-xs font-mono bg-white border border-blush-200 rounded-xl p-2.5 text-plum-900 select-all resize-none focus:outline-hidden"
          onClick={(e) => e.target.select()}
        />
      </div>

      {/* Action Footer */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy message"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-colors shadow-xs btn-lift min-h-[36px]"
        >
          {copyStatus === "copied" ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy message</span>
            </>
          )}
        </button>

        {dmUrl && (
          <a
            href={dmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-800 hover:underline"
          >
            <span>Open Instagram DM</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {/* Polite status announcement */}
        <div aria-live="polite" className="text-[11px] text-plum-700">
          {copyStatus === "copied" && (
            <span className="text-leaf-500 font-semibold">Message copied</span>
          )}
          {copyStatus === "failed" && (
            <span className="text-rose-700">
              Couldn&apos;t copy automatically. Please select and copy the message above.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
