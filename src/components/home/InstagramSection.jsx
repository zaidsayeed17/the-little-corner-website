import { Heart, Sparkles, ExternalLink } from "lucide-react";
import { InstagramIcon } from "../decor/InstagramIcon";
import { PlaceholderImage } from "../media/PlaceholderImage";
import { siteConfig } from "../../config/site";
import { siteContent } from "../../config/content";
import { galleryItems } from "../../data/gallery";

export function InstagramSection({ className = "" }) {
  const { instagramUrl, instagramHandle, features } = siteConfig;
  const isConfigured = Boolean(instagramUrl);

  // If not configured and showPlaceholderBadges is false, hide the whole section per instructions
  if (!isConfigured && !features.showPlaceholderBadges) {
    return null;
  }

  return (
    <section id="instagram" className={`py-16 sm:py-24 scroll-mt-24 ${className}`} aria-labelledby="instagram-title">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-rose-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-script text-xl sm:text-2xl font-semibold">
              {siteContent.instagram.eyebrow}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2
            id="instagram-title"
            className="font-serif text-3xl sm:text-4xl font-bold text-plum-950 tracking-tight"
          >
            {siteContent.instagram.title}
            {instagramHandle && (
              <span className="text-rose-600 block text-2xl sm:text-3xl mt-1">
                {instagramHandle.startsWith("@") ? instagramHandle : `@${instagramHandle}`}
              </span>
            )}
          </h2>

          {!isConfigured && features.showPlaceholderBadges && (
            <p className="text-xs text-rose-700 bg-blush-100 px-3 py-1 rounded-full inline-block font-medium border border-blush-200">
              {siteContent.instagram.unlinkedNotice} (Configure in src/config/site.js)
            </p>
          )}
        </div>

        {/* 6-image grid (3x2 on md+, 2x3 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {galleryItems.map((item, index) => {
            const destination = item.href || instagramUrl;

            const content = (
              <div className="group relative rounded-2xl overflow-hidden shadow-soft border border-blush-200 aspect-square">
                <PlaceholderImage
                  tone={item.tone || "blush"}
                  icon={index % 2 === 0 ? "flower" : "heart"}
                  alt={item.alt}
                  aspectRatio="aspect-square"
                  showBadge={features.showPlaceholderBadges}
                />

                {/* Hover Heart Overlay */}
                <div className="absolute inset-0 bg-plum-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center">
                  <Heart className="w-7 h-7 text-rose-300 fill-rose-300 mb-1 transform group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium tracking-wide">
                    {isConfigured ? "View on Instagram" : "Handmade Craft"}
                  </span>
                </div>
              </div>
            );

            if (destination) {
              return (
                <a
                  key={item.id}
                  href={destination}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Instagram post: ${item.alt}`}
                  className="block focus:outline-hidden"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={item.id} className="block">
                {content}
              </div>
            );
          })}
        </div>

        {/* Follow on Instagram button if configured */}
        {isConfigured && (
          <div className="text-center pt-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-plum-950 hover:bg-plum-900 text-white font-medium text-sm transition-colors shadow-soft btn-lift"
            >
              <InstagramIcon className="w-4 h-4 text-rose-300" />
              <span>{siteContent.instagram.followButton}</span>
              <ExternalLink className="w-3.5 h-3.5 text-blush-200" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
