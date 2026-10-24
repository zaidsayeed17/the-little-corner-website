import { useState, useEffect, useCallback, useMemo } from "react";
import { safeGet, safeSet } from "../lib/storage";
import { products } from "../data/products";

const STORAGE_KEY = "the_little_corner_saved";

/**
 * Hook to manage saved/favorited items in localStorage.
 */
export function useSavedItems() {
  const [savedIds, setSavedIds] = useState(() => safeGet(STORAGE_KEY, []));

  useEffect(() => {
    safeSet(STORAGE_KEY, savedIds);
  }, [savedIds]);

  const toggleSaved = useCallback((id) => {
    if (!id) return;
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const isSaved = useCallback(
    (id) => {
      return savedIds.includes(id);
    },
    [savedIds]
  );

  const clearSaved = useCallback(() => {
    setSavedIds([]);
  }, []);

  const savedProducts = useMemo(() => {
    return products.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  return {
    savedIds,
    isSaved,
    toggleSaved,
    clearSaved,
    savedProducts,
    count: savedIds.length,
  };
}
