import React, { useState } from 'react';
import { Phone, Mail, User, Building2, MapPin, Layers, Coffee, ArrowRight } from 'lucide-react';
import { QRRequestData } from '../types';

interface QRGeneratorFormProps {
  onSubmitRequest: (data: QRRequestData) => void;
  isSubmitting?: boolean;
}

export default function QRGeneratorForm({ onSubmitRequest, isSubmitting = false }: QRGeneratorFormProps) {
  const [formData, setFormData] = useState<QRRequestData>({
    restaurantName: '',
    ownerName: '',
    phoneNumber: '+251 ',
    emailAddress: '',
    city: 'Addis Ababa',
    numberOfTables: 12,
    restaurantType: 'Cafe / Bakery'
  });

  const cities = ['Addis Ababa', 'Hawassa', 'Adama', 'Bahir Dar', 'Mekelle', 'Dire Dawa'];
  const restaurantTypes = ['Cafe / Bakery', 'Traditional Ethiopian', 'Fine Dining', 'Bar / Grill', 'Pizzeria', 'Fast Food'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfTables' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.restaurantName || !formData.ownerName || !formData.emailAddress) {
      alert('Please fill out all required fields.');
      return;
    }
    onSubmitRequest(formData);
  };

  return (
    <section className="py-16 md:py-24 bg-[#fdf0ed]/30 border-y border-[#dfc0ba]/10 scroll-mt-20" id="registration-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
              Ready to upgrade your guest experience?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Join the hundred of restaurants in Addis Ababa and beyond making dining better with DineDash. Get your QR codes delivered to your doorstep in 24 hours.
            </p>

            {/* Referral Banner Panel */}
            <div className="bg-white p-6 rounded-3xl border border-gray-150 space-y-3.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#336852] bg-brand-mint px-3 py-1 rounded-full border border-brand-sage/10">
                Refer a fellow restaurateur
              </span>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Refer another restaurant and get <span className="font-bold text-[#a73926]">3 months of the Growth plan for free</span> once they sign up. No limits on number of referrals!
              </p>
              <button 
                onClick={() => alert("Referral system is active! Simply share your customized link from your DineDash dashboard once registered.")}
                className="text-xs font-bold text-[#a73926] hover:text-[#8e2e1c] flex items-center gap-1 cursor-pointer transition-colors"
                id="referral-link-btn"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7" id="qr-request-form-container">
            <div className="bg-white border border-gray-150 p-6 md:p-8 rounded-[2rem] shadow-xl">
              
              <div className="text-left mb-6">
                <h3 className="text-xl font-display font-bold text-gray-900">Get Your Free QR Code</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Claim your starter kit now. Instant QR generated for your review.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inputs Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#8b716c]" />
                      Restaurant Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="restaurantName"
                      required
                      placeholder="e.g. Addis Cafe"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#a73926] focus:border-[#a73926] transition-all font-semibold text-gray-700"
                      id="input-restaurant-name"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#8b716c]" />
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="ownerName"
                      required
                      placeholder="Full Name"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#a73926] focus:border-[#a73926] transition-all font-semibold text-gray-700"
                      id="input-owner-name"
                    />
                  </div>
                </div>

                {/* Inputs Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#8b716c]" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="phoneNumber"
                      required
                      placeholder="+251 900 123456"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#a73926] focus:border-[#a73926] transition-all font-semibold text-gray-700"
                      id="input-phone-number"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#8b716c]" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="emailAddress"
                      required
                      placeholder="owner@restaurant.com"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#a73926] focus:border-[#a73926] transition-all font-semibold text-gray-700"
                      id="input-email-address"
                    />
                  </div>
                </div>

                {/* Inputs Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8b716c]" />
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-white focus:outline-none focus:ring-1 focus:ring-[#336852]"
                      id="select-city"
                    >
                      {cities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#8b716c]" />
                      Number of Tables
                    </label>
                    <input 
                      type="number" 
                      name="numberOfTables"
                      min={1}
                      max={200}
                      value={formData.numberOfTables}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-gray-50/50 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#336852] focus:border-[#336852]"
                      id="input-num-tables"
                    />
                  </div>
                </div>

                {/* Dropdown Row */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#8b716c]" />
                    Restaurant Type
                  </label>
                  <select
                    name="restaurantType"
                    value={formData.restaurantType}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-150 bg-white focus:outline-none focus:ring-1 focus:ring-[#336852]"
                    id="select-restaurant-type"
                  >
                    {restaurantTypes.map(rt => (
                      <option key={rt} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-white text-sm font-bold rounded-2xl transition-colors shadow-lg shadow-[#a73926]/10 block mt-6 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#a73926] hover:bg-[#8e2e1c] cursor-pointer'
                  }`}
                  id="submit-qr-request-btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Processing Registration...</span>
                    </span>
                  ) : (
                    'Get My Free QR Code'
                  )}
                </button>

                <p className="text-[10px] text-gray-400 text-center select-none pt-1">
                  By signing up, you agree to our Terms of Service.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
