import React from "react";
import { Sparkles, Flower2, KeyRound, Gift, HeartHandshake } from "lucide-react";
import { categories } from "../../data/categories";

const iconMap = {
  Sparkles,
  Flower2,
  KeyRound,
  Gift,
  HeartHandshake,
};

export function CategoryStrip({ activeCategory, onSelectCategory, className = "" }) {
  const handleClick = (catId) => {
    if (catId === "custom") {
      const el = document.getElementById("custom-order");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  return (
    <div className={`relative max-w-[1000px] mx-auto px-4 ${className}`}>
      {/* Container with soft shadow and translucent background */}
      <div className="relative rounded-[24px] bg-white/75 backdrop-blur-md border border-blush-200 shadow-soft p-3 sm:p-4">
        {/* Edge fade masks on mobile */}
        <div className="absolute left-3 top-3 bottom-3 w-5 bg-gradient-to-r from-white to-transparent pointer-events-none sm:hidden z-10 rounded-l-[20px]" aria-hidden="true" />
        <div className="absolute right-3 top-3 bottom-3 w-5 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden z-10 rounded-r-[20px]" aria-hidden="true" />

        {/* Horizontal scroll container on mobile, flex on desktop */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 sm:gap-0 divide-y-0 sm:divide-x divide-blush-200">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleClick(cat.id)}
                aria-pressed={isSelected}
                className={`flex-1 min-w-[110px] sm:min-w-0 py-2 sm:py-3 px-3 flex flex-col items-center justify-center gap-2 rounded-2xl transition-all duration-200 snap-center group ${
                  isSelected
                    ? "bg-blush-100/80 shadow-xs"
                    : "hover:bg-blush-50/70"
                }`}
              >
                {/* Icon inside blush circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isSelected
                      ? "bg-rose-600 text-white shadow-soft"
                      : "bg-blush-100 text-rose-600 group-hover:bg-blush-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <span
                  className={`font-serif text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                    isSelected ? "text-rose-700" : "text-plum-950 group-hover:text-rose-600"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
