import React from 'react';
import { Coffee, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  return (
    <footer className="bg-gray-100" id="site-footer">
      
      {/* Pre-footer Call to Action Banner (reddish brown) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <div 
          className="bg-gradient-to-br from-[#a73926] to-[#670a00] rounded-[2.5rem] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl"
          id="pre-footer-cta-banner"
        >
          {/* Faded Background Coffee Cup Icon */}
          <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none">
            <Coffee className="w-64 h-64 rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to modernize your restaurant?
            </h2>
            <p className="text-[#ffdad3] text-sm sm:text-base leading-relaxed font-normal">
              Join the waitlist today and get your first 3 months of the Growth plan completely free. Let us handle the queue so you can focus on beautiful food.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <button
                onClick={() => onScrollTo('registration-section')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#a73926] hover:bg-[#ffdad3] text-xs font-bold font-display rounded-full transition-color cursor-pointer shadow-md"
                id="pre-footer-cta-start"
              >
                Get Started Now
              </button>
              <button
                onClick={() => alert('Demo booking is currently active! We will call you within 2-4 business hours. Please complete the registration form above to schedule your live walkthrough.')}
                className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-white/40 text-white text-xs font-bold font-display rounded-full transition-colors cursor-pointer"
                id="pre-footer-cta-demo"
              >
                Book a Free Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onScrollTo('hero-section')}>
              <div className="w-8 h-8 bg-[#a73926] text-white rounded-lg flex items-center justify-center">
                <Coffee className="w-4.5 h-4.5" />
              </div>
              <span className="font-display text-lg font-black text-gray-800 tracking-tight">
                DineDash
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs font-normal">
              Modernizing the Ethiopian dining experience, one table at a time. Empowering cafes, quick service spots, and cozy bistros natively built for Ethiopia’s local payment rhythm.
            </p>
            <div className="text-[11px] text-gray-400 flex items-center gap-1">
              <span>Made in Ethiopia with</span>
              <span className="text-[#a73926] animate-pulse font-normal font-sans">❤️</span>
            </div>
          </div>

          {/* Links Col 1 (Product) */}
          <div className="md:col-span-2.5 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8b716c]">Product</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-500">
              <li><button onClick={() => onScrollTo('features-section')} className="hover:text-brand-primary cursor-pointer">Features</button></li>
              <li><button onClick={() => alert('Dynamic QR Menu Builder is launching soon! Check back soon.')} className="hover:text-brand-primary cursor-pointer flex items-center gap-1"><span>Menu Builder</span><ArrowUpRight className="w-3 h-3 text-[9px] text-[#336852]" /></button></li>
              <li><button onClick={() => onScrollTo('steps-section')} className="hover:text-brand-primary cursor-pointer">Ordering System</button></li>
              <li><button onClick={() => onScrollTo('features-section')} className="hover:text-[#336852] cursor-pointer">Offline Status</button></li>
            </ul>
          </div>

          {/* Links Col 2 (Resources) */}
          <div className="md:col-span-2.5 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8b716c]">Resources</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-500">
              <li><button onClick={() => onScrollTo('steps-section')} className="hover:text-[#a73926] cursor-pointer">How It Works</button></li>
              <li><button onClick={() => onScrollTo('pricing-section')} className="hover:text-[#a73926] cursor-pointer">Pricing Plans</button></li>
              <li><button onClick={() => alert('Success stories from our local Bole and Keldi partners are coming soon!')} className="hover:text-[#a73926] cursor-pointer">Success Stories</button></li>
              <li><button onClick={() => alert('Become a DineDash brand affiliate! Receive commissions for every registered restaurant.')} className="hover:text-[#a73926] cursor-pointer">Refer a Partner</button></li>
            </ul>
          </div>

          {/* Links Col 3 (Support) */}
          <div className="md:col-span-3 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8b716c]">Support</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-500">
              <li><button onClick={() => onScrollTo('faq-section')} className="hover:text-brand-primary cursor-pointer">Help Center / FAQ</button></li>
              <li><a href="mailto:support@dinedash.et" className="hover:text-brand-primary">support@dinedash.et</a></li>
              <li><button onClick={() => alert('Support lines active 24/7 at +251 900 123456.')} className="hover:text-brand-primary cursor-pointer">Terms of Service</button></li>
              <li><button onClick={() => alert('Privacy policy is standard and safe under local regulations.')} className="hover:text-brand-primary cursor-pointer">Privacy Policy</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} DineDash. Proudly serving Ethiopia's restaurant community.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-gray-600 cursor-pointer">Security</span>
            <span className="hover:text-gray-600 cursor-pointer">Site Map</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
