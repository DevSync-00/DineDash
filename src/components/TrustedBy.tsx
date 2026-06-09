import React from 'react';
import { Star } from 'lucide-react';

export default function TrustedBy() {
  const logos = [
    { name: 'Tomoca', subtitle: 'est. 1953' },
    { name: "Kaldi's", subtitle: 'Coffee' },
    { name: 'Gardenia', subtitle: 'Cafe' },
    { name: "Maru's", subtitle: 'Delicatessen' },
    { name: 'Bahir Dar Cafe', subtitle: 'Traditional' }
  ];

  return (
    <section className="bg-[#fdf0ed]/40 border-y border-[#dfc0ba]/10 py-10" id="trusted-by-section">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        
        {/* Helper title label */}
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#8b716c] uppercase block">
          Trusted by 200+ restaurants across Ethiopia
        </span>

        {/* Brand typographic logo deck */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-16">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-display font-black text-lg md:text-xl text-[#57423d] opacity-80 uppercase tracking-widest">
                {logo.name}
              </span>
              <span className="text-[8px] font-semibold text-[#8b716c] uppercase tracking-widest leading-none mt-0.5 opacity-60">
                {logo.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* Stars rating panel */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="flex items-center gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-600">
            <span className="font-bold text-gray-800">4.9/5</span> Average Rating
          </span>
        </div>

      </div>
    </section>
  );
}
