import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "../product/ProductGrid";
import { EmptyState } from "../ui/EmptyState";
import { Sparkle } from "../decor/Sparkle";
import { siteContent } from "../../config/content";

export function FeaturedSection({
  products = [],
  onResetCategory,
  className = "",
}) {
  return (
    <section className={`py-12 sm:py-16 ${className}`} aria-labelledby="featured-picks-title">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-rose-600">
            <Sparkle className="w-3.5 h-3.5" />
            <span className="font-script text-xl sm:text-2xl font-semibold">
              {siteContent.featuredProducts.eyebrow}
            </span>
            <Sparkle className="w-3.5 h-3.5" />
          </div>

          <h2
            id="featured-picks-title"
            className="font-serif text-3xl sm:text-4xl font-bold text-plum-950 tracking-tight"
          >
            {siteContent.featuredProducts.title}
          </h2>

          <p className="text-sm sm:text-base text-plum-700 leading-relaxed">
            {siteContent.featuredProducts.subtitle}
          </p>
        </div>

        {/* Product Grid or Empty State */}
        {products.length > 0 ? (
          <div className="space-y-12">
            <ProductGrid products={products} />

            {/* View All Gifts CTA Pill */}
            <div className="text-center pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm sm:text-base transition-colors shadow-soft btn-lift"
              >
                <span>{siteContent.featuredProducts.viewAllCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No handmade pieces found"
            message={siteContent.featuredProducts.emptyMessage}
            onReset={onResetCategory}
            showCustomOrderCta={true}
          />
        )}
      </div>
    </section>
  );
}
