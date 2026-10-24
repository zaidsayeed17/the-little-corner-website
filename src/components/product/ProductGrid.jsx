import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products = [], className = "" }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
