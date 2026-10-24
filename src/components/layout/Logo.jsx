import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";

export function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`group inline-flex flex-col items-start focus:outline-hidden ${className}`}
      aria-label={`${siteConfig.brandName} - Return to Homepage`}
    >
      {/* 
        LOGO IMAGE REPLACEMENT SLOT:
        To replace the text wordmark with a real brand image logo:
        Uncomment the <img> tag below and place your file in /public/images/logo.png:
        <img src="/images/logo.png" alt={siteConfig.brandName} className="h-9 w-auto object-contain" />
      */}
      <span className="font-script text-2xl sm:text-3xl text-plum-950 font-semibold tracking-tight transition-colors group-hover:text-rose-600">
        {siteConfig.brandName}
      </span>
      {siteConfig.tagline && (
        <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-rose-700/80 -mt-1 pl-0.5">
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
}
