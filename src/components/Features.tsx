import React, { useState } from 'react';
import { 
  CreditCard, Languages, TrendingUp, Bell, Sparkles, RefreshCw, Check 
} from 'lucide-react';

interface FeaturesProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Features({ onScrollTo }: FeaturesProps) {
  // Mini interactive state for payment method preview
  const [selectedPay, setSelectedPay] = useState<'telebirr' | 'cbe'>('telebirr');
  
  // Bilingual translator sentence preview toggler
  const [isAmharic, setIsAmharic] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gray-50 bg-[radial-gradient(#dfc0ba_1px,transparent_1px)] [background-size:16px_16px]" id="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 text-left max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Built for the Ethiopian hospitality rhythm
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Everything you need to run a modern, efficient floor without the technical headache.
            </p>
          </div>
          <button 
            onClick={() => onScrollTo('registration-section')}
            className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-display text-xs font-bold rounded-full transition-colors cursor-pointer whitespace-nowrap shadow-sm shrink-0"
            id="view-features-cta"
          >
            Create Your Account Now
          </button>
        </div>

        {/* Features Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Local Payments Integrated */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-150 p-6 md:p-8 hover:shadow-lg transition-transform hover:-translate-y-0.5 flex flex-col justify-between gap-6" id="feature-card-payments">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#a73926] flex items-center justify-center border border-rose-100">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">Local Payments Integrated</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Accept Telebirr, CBE Birr, and HelloCash instantly. No extra hardware required at the table. Customers scan, choose their wallet, approve, and the chef is instantly notified of successful clearance.
              </p>
            </div>

            {/* Interactive Selector Mockup */}
            <div className="bg-gray-50 border border-gray-150 rounded-2.5xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between" id="payments-sync-preview">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Simulated Checkout ledger</span>
                <span className="text-xs text-gray-700 font-semibold block mt-0.5">Payment Method at table</span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedPay('telebirr')}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    selectedPay === 'telebirr'
                      ? 'bg-white border-[#336852] text-[#336852] ring-2 ring-teal-100 shadow-sm'
                      : 'bg-white/50 border-gray-200 text-gray-400'
                  }`}
                  id="checkout-option-telebirr"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1da1f2]"></div>
                    <span>Telebirr Wallet</span>
                  </div>
                  {selectedPay === 'telebirr' && <Check className="w-3.5 h-3.5 text-[#336852]" />}
                </button>

                <button
                  onClick={() => setSelectedPay('cbe')}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    selectedPay === 'cbe'
                      ? 'bg-white border-[#336852] text-[#336852] ring-2 ring-teal-100 shadow-sm'
                      : 'bg-white/50 border-gray-200 text-gray-400'
                  }`}
                  id="checkout-option-cbe"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-600"></div>
                    <span>CBE Birr Wallet</span>
                  </div>
                  {selectedPay === 'cbe' && <Check className="w-3.5 h-3.5 text-[#336852]" />}
                </button>
              </div>
            </div>
          </div>

          {/* Feature 2: Fully Bilingual */}
          <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 hover:shadow-lg transition-transform hover:-translate-y-0.5 flex flex-col justify-between gap-6 font-normal" id="feature-card-bilingual">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#336852] flex items-center justify-center border border-emerald-100">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">Fully Bilingual</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Switch between Amharic and English with one tap. Ensure every guest feels at home and ordering is smooth.
              </p>
            </div>

            {/* Interactive Sentence Bilingual Translator Tool */}
            <div className="bg-[#fcf9f8] p-4 rounded-2.5xl border border-gray-100 font-sans text-left relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-150 pb-2 mb-2.5">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-gray-400">Localized Display Preview</span>
                <button
                  onClick={() => setIsAmharic(!isAmharic)}
                  className="px-2.5 py-1 text-[10px] font-bold bg-[#a73926] text-white hover:bg-[#8e2e1c] rounded-full transition-all cursor-pointer select-none"
                  id="bilingual-demo-btn"
                >
                  Translate to {isAmharic ? 'English' : 'Amharic'}
                </button>
              </div>
              <div className="space-y-1.5" id="bilingual-text-box">
                <div className="text-[10px] text-gray-400">Welcome note:</div>
                <div className="text-xs font-semibold text-gray-800 transition-all duration-300">
                  {isAmharic ? 'እንኳን ደህና መጡ! እባክዎ ከታች ያለውን ማውጫ ይመርምሩ።' : 'Welcome! Please browse our delicious menu selections below.'}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Sales Dashboard */}
          <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 hover:shadow-lg transition-transform hover:-translate-y-0.5 space-y-4" id="feature-card-dashboard">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900">Sales Dashboard</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Monitor daily revenue, peak hours, and popular dishes from anywhere. Stay in absolute control of busy restaurants with full ledger tracking.
            </p>
          </div>

          {/* Feature 4: Instant Alerts */}
          <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 hover:shadow-lg transition-transform hover:-translate-y-0.5 space-y-4" id="feature-card-alerts">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 animate-swing">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900">Instant Alerts</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Kitchen and waitstaff get notified immediately on their terminals on screen when an order is submitted or when a table requests service.
            </p>
          </div>

          {/* Feature 5: Live Menu Sync */}
          <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-8 hover:shadow-lg transition-transform hover:-translate-y-0.5 space-y-4" id="feature-card-sync">
            <div className="w-12 h-12 rounded-2xl bg-[#fdf0ed] text-[#a73926] flex items-center justify-center border border-[#dfc0ba]/40">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900">Live Menu Sync</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Sold out of a dish? Disable it instantly on the digital menu so guests cannot order it, avoiding customer disappointments in real time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
