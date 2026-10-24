import React from "react";
import { PlaceholderImage } from "../media/PlaceholderImage";
import { StickyNote } from "../decor/StickyNote";
import { WashiTape } from "../decor/WashiTape";
import { DoodleHeart } from "../decor/DoodleHeart";
import { Sparkle } from "../decor/Sparkle";
import { FloralSprig } from "../decor/FloralSprig";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";

export function HeroCollage() {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-[540px] mx-auto select-none">
      {/* Floating decorative elements around collage */}
      <div className="absolute -top-6 -left-4 z-30 animate-gentle-float text-rose-500 hidden sm:block" aria-hidden="true">
        <DoodleHeart className="w-8 h-8 fill-blush-200/50" />
      </div>
      <div className="absolute -bottom-5 right-2 sm:right-6 z-30 animate-gentle-float text-rose-600" aria-hidden="true">
        <DoodleHeart className="w-7 h-7" />
      </div>
      <div className="absolute top-1/2 right-0 sm:-right-4 z-30 text-rose-400" aria-hidden="true">
        <Sparkle className="w-6 h-6 animate-pulse" />
      </div>
      <div className="absolute -top-3 right-8 sm:right-12 z-30 text-leaf-500 opacity-80" aria-hidden="true">
        <FloralSprig className="w-10 h-10 rotate-12" />
      </div>

      {/* Overlapping Sticky Note */}
      <div className="absolute -bottom-6 left-0 sm:-left-6 z-30">
        <StickyNote text={siteContent.hero.stickyNote} rotation="-rotate-3" />
      </div>

      {/* 2x2 Scrapbook Collage Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 pb-8">
        {/* Tile 1: Flowers (Left column - slightly staggered lower) */}
        <div className="pt-6">
          <div className="relative rounded-[24px] bg-white p-1.5 shadow-tile rotate-[-2deg] max-[400px]:rotate-0 transition-transform hover:rotate-0 duration-200">
            {/* Washi Tape strip on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <WashiTape className="w-24 h-5 bg-blush-300/80" />
            </div>

            <div className="rounded-[20px] overflow-hidden">
              <PlaceholderImage
                tone="rose"
                icon="flower"
                alt="Handcrafted flower bouquet sample"
                aspectRatio="aspect-4/5"
                showBadge={siteConfig.features.showPlaceholderBadges}
              />
            </div>

            <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-white/95 text-plum-950 font-serif text-xs font-bold shadow-xs border border-blush-100">
              Flowers
            </span>
          </div>
        </div>

        {/* Tile 2: Keychains (Right column) */}
        <div>
          <div className="relative rounded-[24px] bg-white p-1.5 shadow-tile rotate-[2deg] max-[400px]:rotate-0 transition-transform hover:rotate-0 duration-200">
            <div className="rounded-[20px] overflow-hidden">
              <PlaceholderImage
                tone="blush"
                icon="keychain"
                alt="Handcrafted keychain charm sample"
                aspectRatio="aspect-4/5"
                showBadge={siteConfig.features.showPlaceholderBadges}
              />
            </div>

            <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-white/95 text-plum-950 font-serif text-xs font-bold shadow-xs border border-blush-100">
              Keychains
            </span>
          </div>
        </div>

        {/* Tile 3: Gifts (Left column) */}
        <div className="pt-2">
          <div className="relative rounded-[24px] bg-white p-1.5 shadow-tile rotate-[1.5deg] max-[400px]:rotate-0 transition-transform hover:rotate-0 duration-200">
            <div className="rounded-[20px] overflow-hidden">
              <PlaceholderImage
                tone="cream"
                icon="gift"
                alt="Curated handmade gifts bundle sample"
                aspectRatio="aspect-4/5"
                showBadge={siteConfig.features.showPlaceholderBadges}
              />
            </div>

            <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-white/95 text-plum-950 font-serif text-xs font-bold shadow-xs border border-blush-100">
              Gifts
            </span>
          </div>
        </div>

        {/* Tile 4: Made for you (Right column - staggered higher) */}
        <div className="-mt-4">
          <div className="relative rounded-[24px] bg-white p-1.5 shadow-tile rotate-[-2deg] max-[400px]:rotate-0 transition-transform hover:rotate-0 duration-200">
            <div className="rounded-[20px] overflow-hidden">
              <PlaceholderImage
                tone="leaf"
                icon="heart"
                alt="Bespoke handmade piece made with love sample"
                aspectRatio="aspect-4/5"
                showBadge={siteConfig.features.showPlaceholderBadges}
              />
            </div>

            <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-white/95 text-plum-950 font-serif text-xs font-bold shadow-xs border border-blush-100">
              Made for you
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
