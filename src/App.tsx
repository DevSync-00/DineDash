import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Check, Sparkles, AlertTriangle, Coffee, QrCode, ArrowUpRight 
} from 'lucide-react';

/* Sub-components */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import ThreeSteps from './components/ThreeSteps';
import Features from './components/Features';
import Cockpit from './components/Cockpit';
import Pricing from './components/Pricing';
import QRGeneratorForm from './components/QRGeneratorForm';
import QRSuccessModal from './components/QRSuccessModal';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LiveDemoModal from './components/LiveDemoModal';

/* Types & Data */
import { MENU_ITEMS, INITIAL_TABLES, INITIAL_ORDERS } from './data';
import { Order, TableStatus, MenuItem, QRRequestData } from './types';

/* Imported Assets */
import heroScanImg from './assets/images/hero_scan_qr_new_1781002228007.png';

export default function App() {
  /* Dynamic App State matching our specifications */
  const [menuList, setMenuList] = useState<MenuItem[]>(
    MENU_ITEMS.map(it => ({ ...it, isSoldOut: false } as any))
  );
  const [tablesList, setTablesList] = useState<TableStatus[]>(INITIAL_TABLES);
  const [ordersQueue, setOrdersQueue] = useState<Order[]>(INITIAL_ORDERS);
  const [totalRevenueToday, setTotalRevenueToday] = useState(12850);

  /* Modals Visibility togglers */
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [requestData, setRequestData] = useState<QRRequestData | null>(null);

  /* Live Notification Toasts list */
  const [toasts, setToasts] = useState<{ id: string; title: string; message: string; type: 'info' | 'success' | 'alert' }[]>([]);

  /* Dynamic scroll-to locator helper */
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Toast dismiss utility drawer */
  const addToast = (title: string, message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    
    // Auto-remove in 5s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5500);
  };

  /* Intercepting Simulated Order placed from Guest mobile view */
  const handlePlaceOrder = (items: { nameEn: string; quantity: number; price: number }[], total: number, paymentMethod: string) => {
    const orderId = `DD-${Math.floor(Math.random() * 9000) + 1000}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    const newOrder: Order = {
      id: orderId,
      tableNumber: 5, // Simulation represents Table 5 scanning
      items,
      totalPrice: total,
      paymentMethod: paymentMethod as any,
      status: 'Received',
      timestamp
    };

    // Update orders queue at top of the stack
    setOrdersQueue(prev => [newOrder, ...prev]);

    // Increase today total revenue counter
    setTotalRevenueToday(prev => prev + total);

    // Update Table status to active browsing eating with bill attached
    setTablesList(prev => {
      return prev.map(t => {
        if (t.number === 5) {
          return {
            ...t,
            status: 'Occupied',
            currentTotal: total
          };
        }
        return t;
      });
    });

    // Alert waitstaff with custom push banner
    addToast(
      'New Order Received! ⚡',
      `Table 5 placed an order for ${items.length} dishes totaling ETB ${total}. Payment settled via ${paymentMethod}.`,
      'success'
    );
  };

  /* Kitchen advancing orders status */
  const handleUpdateOrderStatus = (orderId: string, nextStatus: Order['status']) => {
    setOrdersQueue(prev => {
      return prev.map(order => {
        if (order.id === orderId) {
          // If the order belongs to table 5 and becomes Paid, free Table 5
          if (order.tableNumber === 5 && nextStatus === 'Paid') {
            setTablesList(tables => {
              return tables.map(t => {
                if (t.number === 5) {
                  return { ...t, status: 'Paid' }; // Keep paid status showing, can be cleared later
                }
                return t;
              });
            });
          }
          
          addToast(
            'Order Updated',
            `Order reference ${orderId} status advanced to: ${nextStatus}`,
            'info'
          );

          return { ...order, status: nextStatus };
        }
        return order;
      });
    });
  };

  /* Manual table layout toggler via Cockpit admin panel */
  const handleUpdateTableStatus = (tableNumber: number, nextStatus: TableStatus['status']) => {
    setTablesList(prev => {
      return prev.map(t => {
        if (t.number === tableNumber) {
          return { 
            ...t, 
            status: nextStatus,
            currentTotal: nextStatus === 'Vacant' ? undefined : t.currentTotal 
          };
        }
        return t;
      });
    });
    
    addToast(
      'Table Status Modified',
      `Table ${tableNumber} marked as: ${nextStatus}`,
      'info'
    );
  };

  /* Kitchen toggles stock availability live synced to active clients */
  const handleToggleItemAvailability = (itemId: string) => {
    setMenuList(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const nextAvailability = !(item as any).isSoldOut;
          
          addToast(
            nextAvailability ? 'Item Deactivated' : 'Item Activated',
            `${item.nameEn} is now marked as ${nextAvailability ? 'Sold Out' : 'Active'}`,
            nextAvailability ? 'alert' : 'success'
          );

          return { ...item, isSoldOut: nextAvailability };
        }
        return item;
      });
    });
  };

  /* QR Code generation form submission captures client and unlocks stand kit */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQRFormSubmit = async (data: QRRequestData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Server error occurred during hotel registration.');
      }

      setRequestData(data);
      setIsSuccessOpen(true);
      
      if (result.simulated) {
        addToast(
          'Registration Simulated! 🎟️',
          `Welcome ${data.ownerName}! Simulated email notification & database record processed on server.`,
          'info'
        );
      } else {
        addToast(
          'Registration Complete! 🎟️',
          `Successfully saved to Supabase & sent waitlist alert email! Welcome, ${data.ownerName}.`,
          'success'
        );
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      // Give local fallback so the user always has a seamless interface preview
      setRequestData(data);
      setIsSuccessOpen(true);
      addToast(
        'Offline/Demo Mode Saved Locally ⚡',
        `Details cached locally. (Database/Email notification skipped: ${err.message})`,
        'alert'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] relative font-sans flex flex-col" id="applet-primary">
      
      {/* Top sticky navigation */}
      <Navbar 
        onScrollTo={handleScrollTo} 
        onOpenSignUp={() => handleScrollTo('registration-section')} 
      />

      {/* Main Hero & CTA entry */}
      <Hero 
        onScrollTo={handleScrollTo} 
        onOpenLiveDemo={() => setIsDemoOpen(true)} 
        heroImageSrc={heroScanImg}
      />

      {/* Trusted By logo deck */}
      <TrustedBy />

      {/* Steps segment */}
      <ThreeSteps />

      {/* Value Prop Features catalog */}
      <Features onScrollTo={handleScrollTo} />

      {/* Central Admin Flight Cockpit (interactive demo sync point!) */}
      <section className="py-16 md:py-24 bg-[#FAFAF8]" id="cockpit-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side labels */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#a73926] bg-[#fdf0ed] px-3.5 py-1.5 rounded-full uppercase border border-[#f4725a]/10">
                Centralized Operations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Manage everything from a single intuitive cockpit.
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Our dashboard is designed for high-paced environments. Track orders as they land, modify table layouts, set chef dishes as sold out, and understand your dining room floor without ever leaving the counter.
              </p>

              {/* Functional bullets */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">✓</div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Real-time table status tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">✓</div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Staff performance analytics and ledger queue</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">✓</div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Automated end-of-day reports in 1 click</span>
                </div>
              </div>

              {/* Spark interactive demo helper banner */}
              <div className="p-4 bg-teal-50 border border-teal-150 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#336852] text-[#b3ecd0] rounded-xl flex items-center justify-center shrink-0">
                  <QrCode className="w-5.2 h-5.2" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-teal-800 block">Try the Live Integration Loop!</span>
                  <span className="text-teal-700/80 leading-relaxed block mt-0.5">
                    Launch the Guest Mock Phone, place an order, and watch this Cockpit dashboard handle it instantly!
                  </span>
                </div>
              </div>
            </div>

            {/* Right side interactive live cockpit view! */}
            <div className="lg:col-span-7">
              <Cockpit 
                orders={ordersQueue}
                tables={tablesList}
                menuItems={menuList}
                revenue={totalRevenueToday}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateTableStatus={handleUpdateTableStatus}
                onToggleItemAvailability={handleToggleItemAvailability}
                onTriggerDemo={() => setIsDemoOpen(true)}
              />
            </div>

          </div>

        </div>
      </section>

      {/* Transparent pricing plans */}
      <Pricing onScrollTo={handleScrollTo} />

      {/* QR Request registration Form */}
      <QRGeneratorForm onSubmitRequest={handleQRFormSubmit} isSubmitting={isSubmitting} />

      {/* Testimonials */}
      <Testimonials />

      {/* Stats row */}
      <Stats />

      {/* Accoridon FAQ */}
      <FAQ />

      {/* Standard site footer with action banner */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Live Active Simulator Phone Modal */}
      <AnimatePresence>
        {isDemoOpen && (
          <LiveDemoModal 
            isOpen={isDemoOpen} 
            onClose={() => setIsDemoOpen(false)} 
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </AnimatePresence>

      {/* Congratulations registration Success Modal */}
      <AnimatePresence>
        {isSuccessOpen && (
          <QRSuccessModal 
            isOpen={isSuccessOpen}
            onClose={() => setIsSuccessOpen(false)}
            data={requestData}
          />
        )}
      </AnimatePresence>

      {/* Global floating notification Toasts Drawer */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full pointer-events-none" id="toasts-drawer">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="bg-white p-4 rounded-2xl border border-gray-150 shadow-2xl flex gap-3 pointer-events-auto"
              id={`toast-item-${toast.id}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                toast.type === 'alert' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
              }`}>
                <Bell className="w-4.5 h-4.5 animate-bounce" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-gray-900 block">{toast.title}</span>
                <span className="text-[11px] text-gray-500 leading-normal block mt-0.5">{toast.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
