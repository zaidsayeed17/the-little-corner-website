import React from "react";

export function FloralSprig({ className = "w-8 h-8 text-leaf-500" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 32 C14 26 22 18 32 8" />
      <path d="M16 24 C14 20 16 16 20 18 C20 22 18 24 16 24 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M22 18 C26 16 28 18 26 22 C22 22 20 20 22 18 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M26 14 C26 10 30 8 32 10 C32 14 28 16 26 14 Z" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}
