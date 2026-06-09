import React from 'react';
import { Coffee, Menu, Send } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  onOpenSignUp: () => void;
}

export default function Navbar({ onScrollTo, onOpenSignUp }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-150/50" id="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand/Logo */}
          <div 
            onClick={() => onScrollTo('hero-section')}
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo-nav"
          >
            <div className="w-10 h-10 bg-[#a73926] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#a73926]/20 group-hover:scale-105 transition-transform">
              <Coffee className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold text-gray-800 tracking-tight group-hover:text-brand-primary transition-colors">
                Dine<span className="text-[#a73926]">Dash</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#336852] block tracking-widest leading-none">
                Ethiopia
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <button 
              onClick={() => onScrollTo('features-section')}
              className="hover:text-brand-primary cursor-pointer transition-colors"
              id="nav-link-features"
            >
              Features
            </button>
            <button 
              onClick={() => onScrollTo('steps-section')}
              className="hover:text-brand-primary cursor-pointer transition-colors"
              id="nav-link-how-it-works"
            >
              How It Works
            </button>
            <button 
              onClick={() => onScrollTo('pricing-section')}
              className="hover:text-brand-primary cursor-pointer transition-colors"
              id="nav-link-pricing"
            >
              Pricing
            </button>
            <button 
              onClick={() => onScrollTo('registration-section')}
              className="hover:text-brand-primary cursor-pointer transition-colors"
              id="nav-link-restaurants"
            >
              For Restaurants
            </button>
            <button 
              onClick={() => onScrollTo('faq-section')}
              className="hover:text-brand-primary cursor-pointer transition-colors"
              id="nav-link-faq"
            >
              FAQ
            </button>
          </nav>

          {/* Actions CTA buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onScrollTo('registration-section')}
              className="hidden sm:inline-block px-5 py-2.5 bg-[#a73926] hover:bg-[#8e2e1c] text-white text-xs font-bold rounded-full transition-colors font-display shadow-md shadow-[#a73926]/10 cursor-pointer"
              id="nav-cta-register"
            >
              Get Started Free
            </button>
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => onScrollTo('features-section')}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 cursor-pointer"
              id="nav-mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
