import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Download, ExternalLink, Printer, SpaceIcon, Coffee } from 'lucide-react';
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
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-150 shadow-2xl p-6 md:p-8 overflow-hidden text-center"
        id="qr-success-modal"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
            <CheckCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Account Created & QR Ready</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-all"
            id="close-success-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900 leading-tight">
          Congratulations, {data.ownerName}!
        </h3>
        <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
          We have generated your customized digital dining flyer kit for <span className="font-semibold text-gray-800">{data.restaurantName}</span>. A full batch of {data.numberOfTables} table stands will be processed and dispatched immediately.
        </p>

        {/* Beautiful mock printable Table QR stand flyer */}
        <div className="my-8 flex justify-center" id="flyer-mockup-frame">
          <div className="border border-gray-150 rounded-2.5xl bg-gray-50/50 p-4 max-w-xs w-full shadow-sm">
            <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col items-center gap-4 shadow-inner relative">
              
              {/* Card top branding */}
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-[#a73926] text-white rounded-md flex items-center justify-center">
                  <Coffee className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-gray-800 tracking-tight">DineDash</span>
              </div>

              {/* Table No indicator */}
              <div className="bg-[#fdf0ed] text-[#a73926] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#f4725a]/10 mt-1">
                Table No. 5
              </div>

              {/* Gorgeous procedural SVG QR Code */}
              <div className="w-40 h-40 bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-center relative shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900" id="drawn-svg-qrcode">
                  {/* Outer markers */}
                  <rect x="5" y="5" width="22" height="22" fill="currentColor" rx="2" />
                  <rect x="9" y="9" width="14" height="14" fill="white" />
                  <rect x="12" y="12" width="8" height="8" fill="currentColor" />

                  <rect x="73" y="5" width="22" height="22" fill="currentColor" rx="2" />
                  <rect x="77" y="9" width="14" height="14" fill="white" />
                  <rect x="80" y="12" width="8" height="8" fill="currentColor" />

                  <rect x="5" y="73" width="22" height="22" fill="currentColor" rx="2" />
                  <rect x="9" y="77" width="14" height="14" fill="white" />
                  <rect x="12" y="80" width="8" height="8" fill="currentColor" />

                  {/* Random simulated code pixels */}
                  <rect x="35" y="8" width="6" height="6" fill="currentColor" />
                  <rect x="45" y="5" width="6" height="12" fill="currentColor" />
                  <rect x="60" y="10" width="6" height="6" fill="currentColor" />

                  <rect x="35" y="30" width="12" height="6" fill="currentColor" />
                  <rect x="15" y="40" width="6" height="12" fill="currentColor" />
                  <rect x="55" y="35" width="18" height="6" fill="currentColor" />

                  <rect x="40" y="50" width="6" height="6" fill="currentColor" />
                  <rect x="65" y="45" width="12" height="12" fill="currentColor" />
                  <rect x="80" y="45" width="6" height="6" fill="currentColor" />

                  <rect x="35" y="65" width="12" height="6" fill="currentColor" />
                  <rect x="55" y="65" width="6" height="18" fill="currentColor" />
                  <rect x="75" y="65" width="12" height="6" fill="currentColor" />

                  <rect x="35" y="80" width="6" height="6" fill="currentColor" />
                  <rect x="45" y="85" width="6" height="6" fill="currentColor" />
                  <rect x="80" y="75" width="12" height="12" fill="currentColor" />

                  {/* Tiny logo badge inside the center of QR code */}
                  <rect x="42" y="42" width="16" height="16" fill="white" rx="3" />
                  <path d="M46 50 C 46 44, 54 44, 54 50 C 53 52, 47 52, 46 50" stroke="#a73926" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Instructions */}
              <div className="space-y-1 text-center">
                <span className="text-[11px] font-black text-gray-800 tracking-tight block">
                  Scan to View Multi-lingual Menu
                </span>
                <span className="text-[9px] text-[#336852] font-semibold bg-brand-mint px-2 py-0.5 rounded-full inline-block leading-none uppercase">
                  Telebirr & CBE payments integrated
                </span>
              </div>

              <div className="text-[8px] font-semibold text-gray-300 tracking-widest mt-1">
                Powered by DineDash Ethiopia
              </div>

            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3" id="success-modal-ctas">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 py-3 px-4 border border-gray-200 hover:border-[#a73926]/40 text-gray-700 hover:text-[#a73926] text-xs font-bold rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Sample Stand</span>
          </button>

          <button
            onClick={() => {
              alert('Waitlist VIP starter package details and a printable high-resolution PDF was emailed to: ' + data.emailAddress);
            }}
            className="flex-1 py-3 px-4 bg-[#a73926] hover:bg-[#8e2e1c] text-white text-xs font-bold rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#a73926]/10"
          >
            <Download className="w-4 h-4" />
            <span>Download All ({data.numberOfTables} QR Codes)</span>
          </button>
        </div>

        {/* Credentials reminder */}
        <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-gray-100 text-left mt-6">
          <div className="text-xs font-bold text-gray-700">Next Steps:</div>
          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
            Check your mailbox at <span className="font-semibold text-gray-700">{data.emailAddress}</span>. We sent you an activation link to your owner panel where you can setup your digital menu items!
          </p>
        </div>

      </motion.div>
    </div>
  );
}
