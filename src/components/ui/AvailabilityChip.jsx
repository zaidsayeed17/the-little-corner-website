import React from "react";

export function AvailabilityChip({ availability = "ask", className = "" }) {
  const configs = {
    available: {
      text: "Available",
      style: "bg-[#BFD0B2]/30 text-plum-900 border-[#BFD0B2]",
      dot: "bg-leaf-500",
    },
    limited: {
      text: "Limited pieces",
      style: "bg-blush-100 text-rose-700 border-rose-300",
      dot: "bg-rose-500",
    },
    "sold-out": {
      text: "Sold out",
      style: "bg-neutral-100 text-neutral-500 border-neutral-200",
      dot: "bg-neutral-400",
    },
    ask: {
      text: "Ask for availability",
      style: "bg-blush-50 text-plum-700 border-blush-200",
      dot: "bg-rose-400",
    },
  };

  const current = configs[availability] || configs.ask;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${current.style} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} aria-hidden="true" />
      {current.text}
    </span>
  );
}
