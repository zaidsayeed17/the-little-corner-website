import React from "react";
import { Flower2, KeyRound, Gift, Heart, Sparkles } from "lucide-react";
import { siteConfig } from "../../config/site";

const toneGradients = {
  rose: "from-[#FAD5E1] via-[#FFF5F8] to-[#F5B9CD]",
  blush: "from-[#FFF5F8] via-[#FDE9EF] to-[#FAD5E1]",
  cream: "from-[#F8EDE0] via-[#FFFAF5] to-[#FAD5E1]",
  leaf: "from-[#BFD0B2]/40 via-[#FFF5F8] to-[#FAD5E1]",
};

const toneIconColors = {
  rose: "text-rose-500",
  blush: "text-rose-600",
  cream: "text-plum-700",
  leaf: "text-leaf-500",
};

/**
 * Renders an artistic placeholder gradient with soft handmade icon
 * and a clear "Placeholder photo" tag.
 */
export function PlaceholderImage({
  tone = "blush",
  icon = "flower",
  alt = "Placeholder image",
  showBadge = true,
  className = "",
  aspectRatio = "aspect-4/5",
}) {
  const gradient = toneGradients[tone] || toneGradients.blush;
  const iconColor = toneIconColors[tone] || toneIconColors.blush;

  const renderIcon = () => {
    const iconProps = { className: `w-14 h-14 ${iconColor} opacity-75 stroke-[1.25]`, "aria-hidden": "true" };
    switch (icon) {
      case "keychain":
        return <KeyRound {...iconProps} />;
      case "gift":
        return <Gift {...iconProps} />;
      case "heart":
        return <Heart {...iconProps} />;
      case "sparkle":
        return <Sparkles {...iconProps} />;
      case "flower":
      default:
        return <Flower2 {...iconProps} />;
    }
  };

  const shouldShowBadge = showBadge && siteConfig.features.showPlaceholderBadges;

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full ${aspectRatio} bg-gradient-to-br ${gradient} flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Soft concentric background circle */}
      <div className="absolute w-28 h-28 rounded-full bg-white/40 blur-xs pointer-events-none" />

      {/* Primary crafted icon */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 p-4 text-center">
        {renderIcon()}
      </div>

      {/* Non-negotiable placeholder label */}
      {shouldShowBadge && (
        <div className="absolute bottom-2.5 right-2.5 z-20">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-white/90 text-rose-700 backdrop-blur-xs border border-blush-200 shadow-xs">
            Placeholder photo
          </span>
        </div>
      )}
    </div>
  );
}
