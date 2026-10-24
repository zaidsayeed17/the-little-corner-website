import React from "react";

export function Badge({ children, variant = "default", className = "" }) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide";
  
  const variants = {
    default: "bg-blush-100 text-rose-700 border border-blush-200",
    rose: "bg-rose-600 text-white shadow-xs",
    white: "bg-white/95 text-plum-900 border border-blush-200 shadow-xs backdrop-blur-xs",
    sample: "bg-blush-200/90 text-rose-700 border border-rose-300 font-semibold text-[11px]",
    leaf: "bg-leaf-300/30 text-plum-900 border border-leaf-300",
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
