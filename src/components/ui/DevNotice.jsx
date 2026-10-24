import React, { useState } from "react";
import { AlertCircle, ChevronUp, ChevronDown, X } from "lucide-react";
import { useSiteReadiness } from "../../hooks/useSiteReadiness";

export function DevNotice() {
  const { isReady, missingItems } = useSiteReadiness();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Only render in development mode, when not dismissed and items are missing
  if (!import.meta.env.DEV || isDismissed || isReady) {
    return null;
  }

  return (
    <aside
      aria-label="Development Readiness Notice"
      className="fixed bottom-4 left-4 z-50 max-w-sm rounded-xl bg-plum-950/95 text-blush-50 p-3 shadow-xl backdrop-blur-md border border-rose-500/30 text-xs transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-medium text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Launch Checklist ({missingItems.length} placeholders)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse checklist" : "Expand checklist"}
            className="p-1 text-blush-200 hover:text-white rounded hover:bg-white/10"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss development notice"
            className="p-1 text-blush-200 hover:text-white rounded hover:bg-white/10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2.5 pt-2.5 border-t border-white/15 space-y-1.5">
          <p className="text-[11px] text-blush-200">
            Before launching, supply actual values for these placeholders:
          </p>
          <ul className="space-y-1 pl-1">
            {missingItems.map((item) => (
              <li key={item.id} className="flex flex-col text-[11px]">
                <span className="font-semibold text-rose-300">• {item.label}</span>
                <span className="text-[10px] text-blush-300 font-mono pl-3">{item.location}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
