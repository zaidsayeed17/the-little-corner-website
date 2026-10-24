import React from "react";

export function WashiTape({ className = "w-28 h-6 bg-blush-300/80 shadow-xs" }) {
  return (
    <div
      className={`relative inline-block backdrop-blur-xs select-none pointer-events-none ${className}`}
      style={{
        clipPath:
          "polygon(0% 15%, 4% 0%, 96% 0%, 100% 20%, 97% 85%, 100% 100%, 4% 100%, 0% 80%)",
        borderTop: "1px dashed rgba(255, 255, 255, 0.4)",
        borderBottom: "1px dashed rgba(255, 255, 255, 0.4)",
      }}
      aria-hidden="true"
    />
  );
}
