import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { siteConfig } from "../../config/site";

const STORAGE_KEY = "tlc_announcement_dismissed";

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed && siteConfig.announcement?.enabled) {
        setIsDismissed(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (isDismissed || !siteConfig.announcement?.enabled) {
    return null;
  }

  return (
    <aside
      aria-label="Announcement"
      className="bg-plum-950 text-ivory text-xs sm:text-sm py-2 px-4 relative z-40"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <p className="flex-1 text-center font-medium tracking-wide pr-6 pl-6 truncate">
          {siteConfig.announcement.text}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="p-1 text-ivory/80 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
