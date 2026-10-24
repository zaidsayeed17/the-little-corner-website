import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { DoodleHeart } from "../decor/DoodleHeart";
import { Sparkle } from "../decor/Sparkle";
import { HeroCollage } from "./HeroCollage";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";

export function HeroSection() {
  return (
    <section className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            {/* Script Eyebrow with sparkles */}
            <div className="inline-flex items-center gap-2 text-rose-600">
              <Sparkle className="w-4 h-4 text-rose-500" />
              <span className="font-script text-2xl sm:text-3xl font-semibold tracking-wide">
                {siteContent.hero.eyebrow}
              </span>
              <Sparkle className="w-3.5 h-3.5 text-rose-400" />
            </div>

            {/* Huge Serif Headline with rose italic accent and tucked heart */}
            <h1 className="font-serif font-bold text-plum-950 text-[35px] min-[390px]:text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.04] tracking-tight">
              <span>{siteContent.hero.headlineLine1}</span>
              <br />
              <span className="text-rose-600 italic inline-flex items-baseline gap-2">
                {siteContent.hero.headlineLine2}
                <DoodleHeart className="w-8 h-8 sm:w-11 sm:h-11 text-rose-600 inline-block shrink-0 -mb-1" />
              </span>
            </h1>

            {/* Short Supporting Paragraph (< 25 words) */}
            <p className="text-base sm:text-lg text-plum-700 leading-relaxed max-w-md">
              {siteContent.hero.paragraph}
            </p>

            {/* CTAs: Dark plum pill & Outlined rose pill */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-plum-950 text-ivory text-sm sm:text-base font-medium hover:bg-plum-900 transition-colors shadow-soft btn-lift"
              >
                <span>{siteContent.hero.shopCta}</span>
                <ArrowRight className="w-4 h-4 text-rose-300" />
              </Link>

              <a
                href="#custom-order"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent border-2 border-rose-500 text-rose-700 hover:bg-blush-100/60 transition-colors text-sm sm:text-base font-medium btn-lift"
              >
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>{siteContent.hero.customCta}</span>
              </a>

              {/* Tertiary link for direct Instagram inquiry */}
              <a
                href={siteConfig.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-700 hover:text-rose-800 hover:underline py-1 px-2"
                aria-label="Message us on Instagram (opens in a new tab)"
              >
                <span>{siteContent.hero.dmCta || "Message us on Instagram"}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Scrapbook Collage */}
          <div className="lg:col-span-6 w-full">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}
