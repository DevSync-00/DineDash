import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do customers need to download an app?',
      a: 'No! Guests simply scan the QR code using their standard iPhone or Android camera, and the bilingual digital menu instantly loads in their default web browser. No registration, login, or downloads required.'
    },
    {
      q: 'How do payments work?',
      a: 'When guests are ready to checkout, they choose their preferred local wallet (Telebirr, CBE Birr, or HelloCash) directly on their mobile browser. The payment is processed via safe, secure API handshakes, and your kitchen dashboard alerts you of the cleared transaction instantly.'
    },
    {
      q: 'Can I use it for multiple branches?',
      a: 'Yes! The DineDash Enterprise plan allows you to manage multiple branches, sync varying menus per location, map layout structures, and analyze cumulative sales from a unified manager cockpit.'
    },
    {
      q: 'What happens if my internet goes down?',
      a: 'DineDash supports intelligent offline fallback state mechanics. Guests can still scan, review, and assemble orders in their browser locally. Waitstaff can then verify the screen assembly, keeping restaurant table service running smoothly.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Everything you need to know about the digital transition in dining.
          </p>
        </div>

        {/* Accoridon list */}
        <div className="space-y-4" id="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-gray-150 rounded-2xl overflow-hidden transition-all duration-300"
                id={`faq-item-${idx}`}
              >
                {/* Title Trigger bar */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full font-display text-left font-bold text-gray-800 text-xs sm:text-sm p-5 md:p-6 bg-gray-50/50 hover:bg-gray-50 flex justify-between items-center cursor-pointer"
                  id={`faq-trigger-${idx}`}
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#a73926] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#8b716c] shrink-0" />
                  )}
                </button>

                {/* Content Panel */}
                {isOpen && (
                  <div className="p-5 md:p-6 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-650 leading-relaxed text-left font-normal animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
