import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Mail, Clock, Calendar } from 'lucide-react';
import { QRRequestData } from '../types';

interface QRSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QRRequestData | null;
}

export default function QRSuccessModal({ isOpen, onClose, data }: QRSuccessModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="success-modal-backdrop">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-gray-150 shadow-2xl p-6 md:p-8 overflow-hidden text-center"
        id="qr-success-modal"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
            <CheckCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Registration Received</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-all"
            id="close-success-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Celebratory Icon */}
        <div className="mx-auto w-16 h-16 bg-[#fdf0ed] text-[#a73926] rounded-full flex items-center justify-center mb-6">
          <Mail className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900 leading-tight">
          Thank you, {data.ownerName}!
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-600 mt-3 max-w-md mx-auto leading-relaxed">
          Application for <span className="font-bold text-gray-800">{data.restaurantName}</span> has been received successfully.
        </p>

        {/* Custom Confirmation Highlight Box */}
        <div className="my-6 p-5 bg-[#fdf0ed]/40 rounded-2xl border border-[#dfc0ba]/15 text-left space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#a73926]/10 text-[#a73926] rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs text-gray-600">
              <span className="font-bold text-gray-800 block">DineDash Notified Successfully</span>
              We have dispatched your registration parameters securely to the DineDash integration desk.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs text-gray-600">
              <span className="font-bold text-teal-800 block">Onboarding Specialist Assignment</span>
              An integration technician from DineDash will contact you at <span className="font-semibold text-gray-900">{data.phoneNumber}</span> or <span className="font-semibold text-gray-900">{data.emailAddress}</span>.
            </div>
          </div>
        </div>

        {/* Main call to action button to dismiss */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-[#a73926] hover:bg-[#8e2e1c] text-white text-xs font-bold font-display rounded-2xl transition-all cursor-pointer shadow-md"
          id="close-success-btn-main"
        >
          Got it, thank you!
        </button>

        <p className="text-[10px] text-gray-400 mt-4 text-center">
          DineDash Ethiopia. All rights reserved.
        </p>

      </motion.div>
    </div>
  );
}
