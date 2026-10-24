import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles smooth scrolling to top on route change,
 * or smooth scrolling to element if hash is present.
 */
export function ScrollToTopAndAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow DOM to render then scroll to anchor
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}
