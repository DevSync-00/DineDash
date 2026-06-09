import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Pricing({ onScrollTo }: PricingProps) {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      period: '/forever',
      features: [
        'Bilingual Digital Menu Only',
        'Up to 10 Tables mapping',
        'Basic QR code generation',
        'Standard scan analytics'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'border-gray-150 bg-white'
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 'ETB 499',
      period: '/month',
      features: [
        'Dynamic Ordering & Payments',
        'Unlimited Table structures',
        'Telebirr & CBE Birr Wallet integration',
        'Priority Technical Support (phone)',
        '3 months FREE with waitlist'
      ],
      cta: 'Go Pro',
      popular: true,
      color: 'border-[#a73926] bg-white ring-4 ring-[#fdf0ed]'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Multiple dining branches mapping',
        'Custom local POS API integrations',
        '24/7 Account manager assigned',
        'Dedicated server instance configuration'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'border-gray-150 bg-white'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Transparent plans for every stage
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Start free and scale as your restaurant grows. No hidden credit card or service fees.
          </p>
        </div>

        {/* Pricing Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`p-8 rounded-[2rem] border relative flex flex-col justify-between transition-all hover:scale-102 ${plan.color}`}
              id={`pricing-plan-${plan.id}`}
            >
              <div>
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#a73926] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular
                  </span>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-display font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{plan.price}</span>
                    <span className="text-xs text-gray-400 font-semibold ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <ul className="mb-8 space-y-3.5 text-left text-xs sm:text-sm text-gray-600">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={() => onScrollTo('registration-section')}
                className={`w-full py-3 px-6 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  plan.popular 
                    ? 'bg-[#a73926] text-white hover:bg-[#8e2e1c] shadow-lg shadow-[#a73926]/20' 
                    : 'bg-gray-100 text-[#57423d] hover:bg-gray-150'
                }`}
                id={`plan-cta-btn-${plan.id}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
