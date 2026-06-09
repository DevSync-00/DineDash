import React from 'react';

export default function Stats() {
  const statsList = [
    { value: '200+', label: 'Restaurants' },
    { value: '12k+', label: 'Monthly Orders' },
    { value: '99.9%', label: 'Uptime' },
    { value: '15m', label: 'Avg. Support Response' }
  ];

  return (
    <section className="bg-teal-800 text-white py-12 md:py-16" id="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {statsList.map((stat, idx) => (
            <div key={idx} className="space-y-1.5 md:px-4 pt-4 md:pt-0 first:pt-0">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#b3ecd0] tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#dfc0ba]/80">
                {stat.label}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
