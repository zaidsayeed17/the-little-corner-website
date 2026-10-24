import React from "react";
import { DoodleHeart } from "./DoodleHeart";

export function StickyNote({
  text = "small things,\nmade with love",
  className = "",
  rotation = "-rotate-3",
}) {
  return (
    <div
      className={`relative bg-[#FDE9EF] text-plum-900 px-5 py-4 rounded-md shadow-md border border-blush-200/80 max-w-[170px] select-none transition-transform hover:rotate-0 duration-200 ${rotation} ${className}`}
      style={{
        boxShadow: "0 6px 18px -4px rgba(168, 48, 95, 0.22)",
      }}
    >
      {/* Top tape piece */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/70 backdrop-blur-xs rotate-1 border border-white/50 shadow-xs" />

      {/* Script handwriting */}
      <p className="font-script text-xl leading-snug text-rose-700 whitespace-pre-line text-center pt-1">
        {text}
      </p>

      {/* Tiny heart doodle in corner */}
      <div className="mt-2 flex justify-center text-rose-500">
        <DoodleHeart className="w-4 h-4" />
      </div>
    </div>
  );
}
