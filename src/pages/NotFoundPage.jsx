import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { Seo } from "../components/seo/Seo";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />

      <div className="py-20 sm:py-28 text-center">
        <div className="max-w-md mx-auto px-5 space-y-6">
          <div className="w-16 h-16 rounded-full bg-blush-100 flex items-center justify-center text-rose-600 mx-auto shadow-xs">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="font-script text-2xl text-rose-600">oops!</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-plum-950">
              404
            </h1>
            <p className="text-sm sm:text-base text-plum-700 leading-relaxed">
              We couldn&apos;t find the little corner you were looking for. Let&apos;s get you back to our handmade collection!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-plum-950 hover:bg-plum-900 text-white font-medium text-sm transition-colors shadow-soft btn-lift"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-blush-50 text-plum-950 font-medium text-sm border border-blush-300 transition-colors btn-lift"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
