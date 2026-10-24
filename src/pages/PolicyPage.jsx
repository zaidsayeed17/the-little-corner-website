import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { siteContent } from "../config/content";

export function PolicyPage() {
  const { slug } = useParams();
  const policy = siteContent.policies[slug];

  if (!policy) {
    return <Navigate to="/404" replace />;
  }

  const allPolicies = [
    { slug: "shipping-delivery", label: "Shipping & Delivery" },
    { slug: "returns-custom-orders", label: "Returns & Custom Orders" },
    { slug: "privacy", label: "Privacy Policy" },
  ];

  return (
    <>
      <Seo
        title={policy.title}
        description={policy.description}
        path={`/policies/${slug}`}
      />

      <div className="py-12 sm:py-20">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 space-y-10">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-rose-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-widest text-rose-700">
                Store Policy &amp; Terms
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-plum-950">
              {policy.title}
            </h1>
            <p className="text-sm sm:text-base text-plum-700">
              {policy.description}
            </p>
          </div>

          {/* Draft Notice Banner */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-blush-100 border border-blush-300 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Draft Policy Notice: </span>
              {policy.draftNotice}
            </div>
          </div>

          {/* Content Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-blush-200 shadow-soft space-y-4 text-sm sm:text-base text-plum-700 leading-relaxed">
            {policy.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="pt-4 border-t border-blush-100 text-xs text-plum-500">
              Questions regarding this draft policy? Message us on WhatsApp and we will gladly clarify.
            </div>
          </div>

          {/* Related Policies Nav */}
          <div className="pt-6 border-t border-blush-200">
            <p className="text-xs uppercase font-bold text-plum-500 mb-3 tracking-wider">
              Other Policies
            </p>
            <div className="flex flex-wrap gap-2">
              {allPolicies.map((p) => (
                <Link
                  key={p.slug}
                  to={`/policies/${p.slug}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    p.slug === slug
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-blush-100 hover:bg-blush-200 text-plum-900 border border-blush-200"
                  }`}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
