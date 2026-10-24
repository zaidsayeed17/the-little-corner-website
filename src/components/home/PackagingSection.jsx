import React from "react";
import { PlaceholderImage } from "../media/PlaceholderImage";
import { DoodleHeart } from "../decor/DoodleHeart";
import { Sparkle } from "../decor/Sparkle";
import { CustomOrderPlanner } from "./CustomOrderPlanner";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";

export function PackagingSection({ className = "" }) {
  const { checklist, showcaseCards } = siteContent.packaging;

  return (
    <section id="packaging" className={`py-16 sm:py-24 scroll-mt-24 ${className}`} aria-labelledby="packaging-title">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-16">
        {/* Top Two-Part Band: Left checklist, Right 4 captioned cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Script eyebrow, serif title, and checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-rose-600">
                <Sparkle className="w-3.5 h-3.5" />
                <span className="font-script text-2xl font-semibold">
                  {siteContent.packaging.eyebrow}
                </span>
              </div>
              <h2
                id="packaging-title"
                className="font-serif text-3xl sm:text-4xl font-bold text-plum-950 tracking-tight"
              >
                {siteContent.packaging.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-plum-700 leading-relaxed">
              Every handmade piece is carefully bundled with beautiful wrapping and personal notes, ready to surprise someone special.
            </p>

            {/* Checklist with heart bullets */}
            <ul className="space-y-3.5 pt-2">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-plum-950 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blush-100 flex items-center justify-center shrink-0 text-rose-600">
                    <DoodleHeart className="w-3.5 h-3.5 fill-rose-600/30" />
                  </div>
                  <span>{item.text}</span>
                  {!item.confirmed && siteConfig.features.showPlaceholderBadges && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-sm bg-blush-200 text-rose-700 font-medium">
                      draft
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: 4 ShowcaseCards in 2x2 grid with slight rotations */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 select-none">
              {showcaseCards.map((card, idx) => {
                const rotations = ["rotate-[-2deg]", "rotate-[2deg]", "rotate-[1.5deg]", "rotate-[-1.5deg]"];
                const rot = rotations[idx % rotations.length];

                return (
                  <div
                    key={card.id}
                    className={`rounded-[22px] bg-white p-2 shadow-soft border border-blush-200 ${rot} transition-transform hover:rotate-0 duration-200`}
                  >
                    <div className="rounded-[16px] overflow-hidden">
                      <PlaceholderImage
                        tone={card.tone}
                        icon={idx % 2 === 0 ? "gift" : "heart"}
                        alt={`${card.caption} sample placeholder`}
                        aspectRatio="aspect-4/3"
                        showBadge={siteConfig.features.showPlaceholderBadges}
                      />
                    </div>
                    <p className="font-serif text-xs sm:text-sm font-semibold text-plum-950 text-center py-2">
                      {card.caption}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Custom Order Planner Form */}
        <CustomOrderPlanner />
      </div>
    </section>
  );
}
