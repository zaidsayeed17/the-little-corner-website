import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

/**
 * Handles smooth scrolling to top on route change,
 * or smooth scrolling to element if hash is present,
 * integrated with Lenis.
 */
export function ScrollToTopAndAnchor() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      // Allow DOM to render then scroll to anchor
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -80, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  }, [pathname, hash, lenis]);

  return null;
}
