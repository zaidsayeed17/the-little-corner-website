import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, RotateCcw } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { CategoryStrip } from "../components/home/CategoryStrip";
import { ProductGrid } from "../components/product/ProductGrid";
import { EmptyState } from "../components/ui/EmptyState";
import { products } from "../data/products";
import { filterProducts } from "../lib/filters";
import { useDebounce } from "../hooks/useDebounce";

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query and category from searchParams
  const categoryParam = searchParams.get("category") || "all";
  const queryParam = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(queryParam);
  const debouncedQuery = useDebounce(searchInput, 200);

  // Sync debounced search input to URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim());
    } else {
      params.delete("q");
    }
    setSearchParams(params, { replace: true });
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  // When category changes from strip, update URL
  const handleSelectCategory = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId && catId !== "all") {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = categoryParam !== "all" || Boolean(queryParam);

  // Filter products
  const filteredItems = useMemo(() => {
    return filterProducts(products, {
      category: categoryParam,
      query: debouncedQuery,
    });
  }, [categoryParam, debouncedQuery]);

  return (
    <>
      <Seo
        title="Shop Handmade Flowers, Keychains &amp; Gifts"
        description="Browse all handcrafted flowers, cute keychains, and thoughtful handmade gifts from The Little Corner."
        path="/shop"
      />

      <div className="py-10 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-10">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-plum-950">
              Handmade Collection
            </h1>
            <p className="text-sm sm:text-base text-plum-700">
              Browse our sample handcrafted pieces. Tap any item to inquire or order on Instagram.
            </p>
          </div>

          {/* Search bar & filter controls */}
          <div className="max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-rose-600 absolute left-4 pointer-events-none" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or description..."
                aria-label="Search handmade items"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-blush-300 text-plum-950 text-sm shadow-xs focus:outline-hidden transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Strip */}
          <CategoryStrip
            activeCategory={categoryParam}
            onSelectCategory={handleSelectCategory}
          />

          {/* Results Summary & Clear filter button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div aria-live="polite" className="text-sm text-plum-700 font-medium">
              Showing <span className="font-bold text-plum-950">{filteredItems.length}</span> sample {filteredItems.length === 1 ? "piece" : "pieces"}
              {categoryParam !== "all" && <span> in <span className="capitalize font-semibold text-rose-600">{categoryParam}</span></span>}
              {queryParam && <span> matching &quot;<span className="italic font-semibold">{queryParam}</span>&quot;</span>}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:underline py-1 px-2.5 rounded-full bg-blush-100 border border-blush-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </div>

          {/* Product Grid or Empty State */}
          {filteredItems.length > 0 ? (
            <ProductGrid products={filteredItems} />
          ) : (
            <EmptyState
              title="No pieces found"
              message="No sample items match your active search or category. Message us for a custom piece or clear filters."
              onReset={handleClearFilters}
              showCustomOrderCta={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
