import React from 'react';
import { ChefHat, Smartphone, Wallet, Utensils } from 'lucide-react';

export default function ThreeSteps() {
  const steps = [
    {
      stepNumber: '01',
      title: 'Set Up Your Menu',
      description: 'Upload your dishes, photos, and prices in minutes. We support Amharic and English natively.',
      icon: ChefHat,
      color: 'bg-rose-50 text-[#a73926] border-rose-100',
    },
    {
      stepNumber: '02',
      title: 'Guests Scan & Order',
      description: 'Customers scan the QR code on their table to browse and send orders directly to your kitchen.',
      icon: Smartphone,
      color: 'bg-emerald-50 text-[#336852] border-emerald-100',
    },
    {
      stepNumber: '03',
      title: 'Pay & Go',
      description: 'Secure payments via Telebirr or CBE Birr. Faster turnover means more happy customers every day.',
      icon: Wallet,
      color: 'bg-sky-50 text-sky-700 border-sky-100',
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="steps-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Three steps to modern dining
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
            We've made the transition to digital ordering as smooth as a fresh cup of Buna.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#fcf9f8] p-8 rounded-3xl border border-gray-150 relative transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gray-200 z-10"
                id={`step-card-${idx}`}
              >
                {/* Step Index bubble */}
                <span className="absolute top-6 right-8 text-xs font-mono font-bold tracking-wider text-gray-400 bg-white px-2.5 py-1 rounded-full border border-gray-100">
                  Step {step.stepNumber}
                </span>

                {/* Styled icon container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${step.color}`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Text labels */}
                <h3 className="text-lg font-display font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{step.description}</p>
                
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
