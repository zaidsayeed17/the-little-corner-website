import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import { filterProducts } from "../../lib/filters";

export function SearchDialog({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      if (previouslyFocusedElement.current && previouslyFocusedElement.current.focus) {
        previouslyFocusedElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/shop?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleSelectProduct = (product) => {
    navigate(`/shop?q=${encodeURIComponent(product.name)}`);
    onClose();
  };

  if (!isOpen) return null;

  const quickMatches = searchTerm.trim()
    ? filterProducts(products, { query: searchTerm }).slice(0, 4)
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-plum-950/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-ivory rounded-2xl shadow-lift border border-blush-200 overflow-hidden transform transition-all">
        {/* Header search bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3.5 border-b border-blush-200 bg-white">
          <Search className="w-5 h-5 text-rose-600 shrink-0 mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            id="search-dialog-title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search flowers, keychains, gifts..."
            className="w-full bg-transparent text-plum-950 text-base placeholder:text-plum-500 focus:outline-hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-plum-500 hover:text-plum-900 rounded-lg hover:bg-blush-50 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Live suggestions or quick links */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() ? (
            quickMatches.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                  Matches
                </p>
                <div className="divide-y divide-blush-100">
                  {quickMatches.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className="w-full py-2.5 px-3 flex items-center justify-between text-left hover:bg-blush-50 rounded-xl transition-colors group"
                    >
                      <div>
                        <span className="font-serif text-sm font-semibold text-plum-950 group-hover:text-rose-600">
                          {product.name}
                        </span>
                        <p className="text-xs text-plum-500 capitalize">{product.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full mt-2 py-2 text-center text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
                >
                  View all results for &quot;{searchTerm}&quot; →
                </button>
              </div>
            ) : (
              <p className="text-sm text-plum-700 text-center py-6">
                No items match &quot;{searchTerm}&quot;. Press Enter to search the shop.
              </p>
            )
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-plum-500">
                Popular Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Flowers", cat: "flowers" },
                  { label: "Keychains", cat: "keychains" },
                  { label: "Gifts", cat: "other-gifts" },
                ].map((item) => (
                  <button
                    key={item.cat}
                    type="button"
                    onClick={() => {
                      navigate(`/shop?category=${item.cat}`);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-blush-50 hover:bg-blush-100 text-plum-900 border border-blush-200 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
