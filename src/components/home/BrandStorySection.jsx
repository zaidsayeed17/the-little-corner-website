import React from "react";
import { PlaceholderImage } from "../media/PlaceholderImage";
import { WashiTape } from "../decor/WashiTape";
import { DoodleHeart } from "../decor/DoodleHeart";
import { Sparkle } from "../decor/Sparkle";
import { InstagramIcon } from "../decor/InstagramIcon";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";

export function BrandStorySection({ className = "" }) {

  return (
    <section id="story" className={`py-16 sm:py-24 scroll-mt-24 ${className}`} aria-labelledby="story-title">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Photo Cluster (3 overlapping polaroids with tape and hearts) */}
          <div className="lg:col-span-5 relative select-none max-w-md mx-auto w-full">
            {/* Background decorative doodles */}
            <div className="absolute -top-6 -right-2 text-rose-500 animate-gentle-float z-20" aria-hidden="true">
              <DoodleHeart className="w-8 h-8" />
            </div>

            <div className="relative h-[380px] sm:h-[440px] w-full">
              {/* Polaroid 1 (Back left) */}
              <div className="absolute top-2 left-2 w-48 sm:w-56 p-2 rounded-[18px] bg-white shadow-soft -rotate-6 transition-transform hover:rotate-0 duration-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <WashiTape className="w-16 h-4 bg-blush-300/70" />
                </div>
                <div className="rounded-[14px] overflow-hidden">
                  <PlaceholderImage
                    tone="rose"
                    icon="flower"
                    alt="Crafting handmade flowers sample"
                    aspectRatio="aspect-square"
                    showBadge={siteConfig.features.showPlaceholderBadges}
                  />
                </div>
                <p className="text-[11px] font-script text-center text-plum-700 pt-1.5">
                  everlasting petals
                </p>
              </div>

              {/* Polaroid 2 (Back right) */}
              <div className="absolute top-10 right-2 w-44 sm:w-52 p-2 rounded-[18px] bg-white shadow-soft rotate-6 transition-transform hover:rotate-0 duration-200">
                <div className="rounded-[14px] overflow-hidden">
                  <PlaceholderImage
                    tone="cream"
                    icon="keychain"
                    alt="Crafting custom keychains sample"
                    aspectRatio="aspect-square"
                    showBadge={siteConfig.features.showPlaceholderBadges}
                  />
                </div>
                <p className="text-[11px] font-script text-center text-plum-700 pt-1.5">
                  personalized charm
                </p>
              </div>

              {/* Polaroid 3 (Front center) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-52 sm:w-60 p-2.5 rounded-[20px] bg-white shadow-tile rotate-1 z-10 transition-transform hover:rotate-0 duration-200">
                <div className="absolute -top-3 left-8 z-10">
                  <WashiTape className="w-20 h-4 bg-rose-200/80" />
                </div>
                <div className="rounded-[16px] overflow-hidden">
                  <PlaceholderImage
                    tone="leaf"
                    icon="gift"
                    alt="Gift presentation box sample"
                    aspectRatio="aspect-4/3"
                    showBadge={siteConfig.features.showPlaceholderBadges}
                  />
                </div>
                <p className="text-xs font-script font-bold text-center text-rose-700 pt-2">
                  crafted with love
                </p>
              </div>
            </div>
          </div>

          {/* Right: Story Copy & 3-Step Process */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-rose-600">
                <Sparkle className="w-3.5 h-3.5" />
                <span className="font-script text-2xl font-semibold">
                  {siteContent.story.eyebrow}
                </span>
              </div>
              <h2
                id="story-title"
                className="font-serif text-3xl sm:text-4xl font-bold text-plum-950 tracking-tight"
              >
                {siteContent.story.title}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-plum-700 leading-relaxed">
              <p>{siteContent.story.paragraph1}</p>
              <p>{siteContent.story.paragraph2}</p>
            </div>

            {/* 3-Step "How it works" */}
            <div className="pt-4 space-y-4">
              <h3 className="font-serif text-lg font-bold text-plum-950">
                {siteContent.story.howItWorksTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {siteContent.story.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-2xl bg-white/80 border border-blush-200 shadow-xs space-y-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-serif font-bold text-sm flex items-center justify-center">
                      {st.step}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-plum-950">{st.title}</h4>
                    <p className="text-xs text-plum-700 leading-normal">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message us on Instagram Link */}
            <div className="pt-2">
              {siteConfig.instagramDmUrl ? (
                <a
                  href={siteConfig.instagramDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition-colors shadow-soft btn-lift"
                  aria-label="Message us on Instagram (opens in a new tab)"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{siteContent.story.cta || "Message us on Instagram"}</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Instagram link not set yet"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600/50 text-white font-medium text-sm cursor-not-allowed opacity-70"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Message us on Instagram (link not set)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
