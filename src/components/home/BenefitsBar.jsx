import React from "react";
import { Sparkles, Heart, Gift, MessageCircle } from "lucide-react";
import { siteConfig } from "../../config/site";

const iconMap = {
  Sparkles,
  Heart,
  Gift,
  MessageCircle,
};

export function BenefitsBar({ className = "" }) {
  const { trustItems, features } = siteConfig;

  if (!trustItems || trustItems.length === 0) return null;

  return (
    <section className={`py-6 sm:py-8 ${className}`} aria-label="Brand Highlights">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="rounded-[24px] bg-white/70 backdrop-blur-xs border border-blush-200 shadow-soft p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-blush-200">
            {trustItems.map((item, index) => {
              const Icon = iconMap[item.icon] || Sparkles;
              const isUnconfirmed = !item.confirmed && features.showPlaceholderBadges;

              return (
                <div
                  key={item.id || index}
                  className={`flex items-start gap-4 ${
                    index > 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center text-rose-600 shrink-0 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-bold text-plum-950">
                        {item.title}
                      </h3>
                      {isUnconfirmed && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-sm bg-blush-200 text-rose-700 font-medium">
                          to confirm
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-plum-700 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
