import React, { useState } from "react";
import { ChevronDown, AlertCircle, HelpCircle } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { siteContent } from "../config/content";
import { siteConfig } from "../config/site";

export function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const { faqs } = siteContent;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Helpful questions and answers about ordering handmade flowers, keychains, and custom gifts from The Little Corner."
        path="/faqs"
      />

      <div className="py-12 sm:py-20">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center text-rose-600 mx-auto shadow-xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-plum-950">
              {faqs.title}
            </h1>
            <p className="text-sm sm:text-base text-plum-700">
              {faqs.subtitle}
            </p>
          </div>

          {/* Draft Notice Banner */}
          {siteConfig.features.showPlaceholderBadges && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-blush-100/80 border border-blush-300 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Draft Content Notice: </span>
                {faqs.draftNotice}
              </div>
            </div>
          )}

          {/* Accordion */}
          <div className="space-y-3.5">
            {faqs.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const headingId = `faq-heading-${idx}`;
              const panelId = `faq-panel-${idx}`;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-blush-200 shadow-soft overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left hover:bg-blush-50/50 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-plum-950 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-rose-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      className="px-5 sm:px-6 pb-5 pt-1 text-sm text-plum-700 leading-relaxed border-t border-blush-100"
                    >
                      <p>{item.answer}</p>
                      {!item.confirmed && siteConfig.features.showPlaceholderBadges && (
                        <p className="mt-2 text-[11px] font-mono text-rose-700 font-semibold">
                          [Draft placeholder — to be confirmed by brand owner]
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
