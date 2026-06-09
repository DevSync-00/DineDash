import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
  onOpenLiveDemo: () => void;
  heroImageSrc: string;
}

export default function Hero({ onScrollTo, onOpenLiveDemo, heroImageSrc }: HeroProps) {
  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-b from-[#fcf9f8] to-white overflow-hidden" id="hero-section">
      {/* Decorative Warm Accents */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-[#fdf0ed]/50 blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-64 w-96 h-96 rounded-full bg-brand-mint/40 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            
            {/* Green Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint text-brand-sage rounded-full border border-brand-sage/10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#336852] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                QR Menus · Ordering · Payments
              </span>
            </div>

            {/* Large Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] max-w-2xl">
              Your restaurant menu, in every customer's hand.
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-normal">
              DineDash lets your guests browse, order, and pay — all by scanning a QR code at their table. No app needed. Fast, friendly, and built for Ethiopia.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={() => onScrollTo('registration-section')}
                className="px-8 py-4 bg-[#a73926] hover:bg-[#8e2e1c] text-white font-display text-sm font-bold rounded-full transition-all shadow-lg shadow-[#a73926]/20 cursor-pointer flex items-center justify-center gap-2 group"
                id="hero-cta-register"
              >
                <span>Register Your Restaurant</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollTo('steps-section')}
                className="px-8 py-4 border border-gray-200 hover:border-[#a73926]/40 text-[#57423d] font-display text-sm font-bold rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
                id="hero-cta-how-it-works"
              >
                See How It Works
              </button>
            </div>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2.5 text-[#57423d]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">Free to start</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#57423d]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">No app download</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#57423d]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">Setup in 24 hours</span>
              </div>
            </div>

          </div>

          {/* Right Imagery Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative max-w-md lg:max-w-none w-full" id="hero-img-container">
              {/* Photo Frame */}
              <div className="bg-white p-4.5 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-150 rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
                <img 
                  src={heroImageSrc} 
                  alt="Customer scanning DineDash QR Code at table" 
                  className="rounded-[2rem] w-full object-cover aspect-[4/3] sm:aspect-square md:aspect-[4/3] group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  id="hero-scan-img"
                />
              </div>

              {/* Floating Pill-Badge: Try Live Demo */}
              <div className="absolute -bottom-8 left-5 sm:-left-6 lg:-left-10 z-20" id="floating-live-demo-pill">
                <button
                  onClick={onOpenLiveDemo}
                  className="flex items-center gap-4 bg-white p-4.5 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 hover:border-[#a73926]/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-1 active:scale-97 transition-all text-left cursor-pointer group/pill"
                >
                  <div className="w-14 h-14 bg-[#fdf0ed] text-[#a73926] rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover/pill:bg-[#a73926] group-hover/pill:text-white transition-all duration-300">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <div className="pr-4 sm:pr-6 select-none">
                    <span className="text-[10px] uppercase font-bold text-[#8b716c]/70 block tracking-[0.12em] leading-none">
                      Instant Scan
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-gray-900 block mt-1.5 tracking-tight group-hover/pill:text-[#a73926] transition-colors leading-none">
                      Try Live Demo
                    </span>
                  </div>
                </button>
              </div>

              {/* Decorative design elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-teal-50 text-[#336852] rounded-full flex items-center justify-center border border-teal-100 shadow-lg shrink-0 -z-10 rotate-12">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
