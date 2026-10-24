/**
 * Filtering utilities for products.
 */

/**
 * Filters a product array by category and case-insensitive search query.
 *
 * @param {Array} products
 * @param {{ category?: string, query?: string }} options
 * @returns {Array}
 */
export function filterProducts(products = [], { category, query } = {}) {
  if (!Array.isArray(products)) return [];

  const trimmedQuery = (query || "").trim().toLowerCase();
  const activeCategory = (category || "").trim();

  return products.filter((product) => {
    if (!product) return false;

    // Filter by category
    if (activeCategory && activeCategory !== "all" && activeCategory !== "custom") {
      if (product.category !== activeCategory) {
        return false;
      }
    }

    // Filter by query (matches name or shortDescription)
    if (trimmedQuery) {
      const nameMatch = (product.name || "").toLowerCase().includes(trimmedQuery);
      const descMatch = (product.shortDescription || "").toLowerCase().includes(trimmedQuery);
      if (!nameMatch && !descMatch) {
        return false;
      }
    }

    return true;
  });
}
