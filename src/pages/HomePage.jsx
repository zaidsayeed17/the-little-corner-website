import React, { useState, useMemo } from "react";
import { Seo } from "../components/seo/Seo";
import { HeroSection } from "../components/home/HeroSection";
import { CategoryStrip } from "../components/home/CategoryStrip";
import { BenefitsBar } from "../components/home/BenefitsBar";
import { FeaturedSection } from "../components/home/FeaturedSection";
import { BrandStorySection } from "../components/home/BrandStorySection";
import { PackagingSection } from "../components/home/PackagingSection";
import { InstagramSection } from "../components/home/InstagramSection";
import { FollowBand } from "../components/home/FollowBand";
import { products } from "../data/products";
import { filterProducts } from "../lib/filters";

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Show up to 8 featured sample products, filtered by category chip
  const displayedProducts = useMemo(() => {
    return filterProducts(products, { category: activeCategory }).slice(0, 8);
  }, [activeCategory]);

  return (
    <>
      <Seo
        title="Handmade Flowers, Keychains &amp; Thoughtful Gifts"
        description="Handcrafted everlasting flowers, bespoke charm keychains, and thoughtful little gifts by The Little Corner. Order directly via Instagram DM."
        path="/"
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Category Filter Strip */}
      <div className="-mt-4 mb-6">
        <CategoryStrip
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
        />
      </div>

      {/* Benefits Highlights Bar */}
      <BenefitsBar />

      {/* Featured Products Grid */}
      <FeaturedSection
        products={displayedProducts}
        activeCategory={activeCategory}
        onResetCategory={() => setActiveCategory("all")}
      />

      {/* Brand Story (#story) */}
      <BrandStorySection />

      {/* Packaging & Custom Orders (#packaging, #custom-order) */}
      <PackagingSection />

      {/* Instagram Community (#instagram) */}
      <InstagramSection />

      {/* Follow / Stay in the loop Band */}
      <FollowBand />
    </>
  );
}
