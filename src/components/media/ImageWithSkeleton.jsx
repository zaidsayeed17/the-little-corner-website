import React, { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

/**
 * Image component with smooth shimmer loading state,
 * error handling, and fallback to PlaceholderImage.
 */
export function ImageWithSkeleton({
  src,
  alt,
  placeholderTone = "blush",
  placeholderIcon = "flower",
  showPlaceholderBadge = true,
  aspectRatio = "aspect-4/5",
  className = "",
  imgClassName = "",
  loading = "lazy",
  objectPosition = "center",
  style = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If no src or failed to load, fall back directly to PlaceholderImage
  if (!src || hasError) {
    return (
      <PlaceholderImage
        tone={placeholderTone}
        icon={placeholderIcon}
        alt={alt}
        showBadge={showPlaceholderBadge}
        aspectRatio={aspectRatio}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden ${aspectRatio} ${className}`}>
      {/* Blush shimmer skeleton before image finishes loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 z-10 animate-shimmer"
          aria-hidden="true"
        />
      )}

      {/* Real image with fade-in transition */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ objectPosition, ...style }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        {...props}
      />
    </div>
  );
}
