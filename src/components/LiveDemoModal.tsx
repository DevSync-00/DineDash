import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Smartphone, ShoppingCart, Languages, Globe, Plus, Minus, Check, 
  Trash2, CreditCard, Sparkles, Send, Coffee, CheckCircle 
} from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem, CartItem } from '../types';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (items: { nameEn: string; quantity: number; price: number }[], total: number, paymentMethod: string) => void;
}

export default function LiveDemoModal({ isOpen, onClose, onPlaceOrder }: LiveDemoModalProps) {
  const [lang, setLang] = useState<'En' | 'Am'>('En');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [paymentMethod, setPaymentMethod] = useState<'Telebirr' | 'CBE Birr' | 'HelloCash'>('Telebirr');
  const [hasOrdered, setHasOrdered] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', labelEn: 'All Items', labelAm: 'ሁሉም' },
    { id: 'coffee', labelEn: 'Coffee & Drinks', labelAm: 'ቡናና መጠጦች' },
    { id: 'main', labelEn: 'Ethiopian Dishes', labelAm: 'ኢትዮጵያዊ ምግቦች' },
    { id: 'fast', labelEn: 'Quick Bites', labelAm: 'ቁርስና መክሰስ' },
    { id: 'dessert', labelEn: 'Dessert & Juices', labelAm: 'ጁስና ደሴርት' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(it => it.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const idx = prev.findIndex(it => it.menuItem.id === item.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(prev => {
      return prev.map(it => {
        if (it.menuItem.id === itemId) {
          const nextQty = it.quantity + change;
          return { ...it, quantity: nextQty };
        }
        return it;
      }).filter(it => it.quantity > 0);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(it => it.menuItem.id !== itemId));
  };

  const cartTotal = cart.reduce((acc, current) => acc + (current.menuItem.price * current.quantity), 0);
  const cartItemCount = cart.reduce((acc, current) => acc + current.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsOrdering(true);
    setTimeout(() => {
      onPlaceOrder(
        cart.map(it => ({
          nameEn: it.menuItem.nameEn,
          quantity: it.quantity,
          price: it.menuItem.price
        })),
        cartTotal,
        paymentMethod
      );
      setIsOrdering(false);
      setHasOrdered(true);
      setCart([]);
    }, 1500);
  };

  const handleResetDemo = () => {
    setHasOrdered(false);
    setCart([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="live-demo-modal-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-5xl bg-amber-50/15 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
        id="demo-modal"
      >
        {/* Left Side: Explainer & Dynamic Feedback */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#a73926] to-[#670a00] text-white p-6 md:p-8 flex flex-col justify-between overflow-y-auto min-h-[250px] lg:min-h-0">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wider uppercase text-[#ffdad3] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-xl text-yellow-300" />
                DineDash Simulator
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-3">
              Experience DineDash on Guest's Device
            </h3>
            <p className="text-sm text-red-100/90 leading-relaxed mb-6">
              You are simulating a scan of the DineDash QR code at <span className="font-semibold text-white bg-white/20 px-2 py-0.5 rounded">Table 5</span> in Bole Bistro.
              Try adding menu items, choosing Amharic/English bilingual view, and submitting a dummy Telebirr/CBE payment. Watch how the DineDash kitchen dashboard receives the order live!
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-xl mt-0.5">
                  <Languages className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Bilingual Interface</h4>
                  <p className="text-xs text-red-100/80">Guests can toggle with 1 tap to Amharic or English instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-xl mt-0.5">
                  <CreditCard className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Mobile Payments Integrated</h4>
                  <p className="text-xs text-red-100/80">Support Telebirr, CBE Birr, and HelloCash on the go. No app installation required!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
            <Smartphone className="w-10 h-10 text-amber-300 animate-bounce" />
            <div className="text-xs text-red-100/70">
              Simulating standard Safari or Chrome browser experience — optimized for fast restaurant ordering.
            </div>
          </div>
        </div>

        {/* Right Side: Smartphone Demo Interface */}
        <div className="lg:col-span-7 bg-[#FAFAF8] flex flex-col h-[65vh] lg:h-[82vh] overflow-hidden relative">
          
          {/* Mock Browser/Smartphone Header */}
          <div className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              <span className="text-xs font-mono text-gray-400 ml-2 bg-gray-50 px-2 py-0.5 rounded border border-gray-150">
                dinedash.live/menu/table-5
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Bilingual State Toggle Key */}
              <button 
                onClick={() => setLang(lang === 'En' ? 'Am' : 'En')}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-brand-mint text-brand-sage hover:bg-brand-sage-light transition-all cursor-pointer shadow-sm border border-brand-sage/10"
                title="Switch Language"
                id="demo-language-toggle"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{lang === 'En' ? 'Amharic (አማርኛ)' : 'English'}</span>
              </button>

              <button 
                onClick={onClose}
                className="p-1 px-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-all"
                id="close-demo-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Menu Content Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-28">

            <AnimatePresence mode="wait">
              {!hasOrdered ? (
                <div id="demo-restaurant-menu">
                  {/* Restaurant Brand */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-display font-bold text-gray-800">Bole Bistro</h2>
                    <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                      <span>Bole Road, Addis Ababa</span>
                      <span>•</span>
                      <span className="text-brand-coral font-medium">Table 5</span>
                    </p>
                  </div>

                  {/* Categories Pills */}
                  <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-none snap-x mb-5">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all shrink-0 snap-center ${
                          activeCategory === cat.id
                            ? 'bg-[#a73926] text-white shadow-md shadow-[#a73926]/20'
                            : 'bg-white text-[#57423d] border border-gray-100 hover:bg-gray-50'
                        }`}
                        id={`category-pill-${cat.id}`}
                      >
                        {lang === 'En' ? cat.labelEn : cat.labelAm}
                      </button>
                    ))}
                  </div>

                  {/* Menu Items List */}
                  <div className="space-y-3.5">
                    {filteredItems.map((item) => {
                      const countInCart = cart.find(c => c.menuItem.id === item.id)?.quantity || 0;
                      return (
                        <div 
                          key={item.id} 
                          className="bg-white p-3.5 rounded-2.5xl border border-gray-100 flex gap-4 transition-all hover:border-gray-200 hover:shadow-sm"
                          id={`menu-item-row-${item.id}`}
                        >
                          {/* Dish Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">
                                {lang === 'En' ? item.nameEn : item.nameAm}
                              </h4>
                              {item.tags.includes('Popular') && (
                                <span className="bg-red-50 text-red-600 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                  ★ Popular
                                </span>
                              )}
                              {item.tags.includes('Vegan') && (
                                <span className="bg-teal-50 text-teal-600 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                  ☘ Vegan
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-normal">
                              {lang === 'En' ? item.descriptionEn : item.descriptionAm}
                            </p>
                            <div className="mt-2.5 text-sm font-bold text-gray-800">
                              ETB {item.price.toLocaleString()}
                            </div>
                          </div>

                          {/* Cart Add Controls */}
                          <div className="flex items-center justify-center self-center">
                            {countInCart > 0 ? (
                              <div className="flex items-center bg-[#fdf0ed] rounded-full p-0.5 border border-[#dfc0ba]/40">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-7 h-7 flex items-center justify-center text-brand-primary hover:bg-[#eae2e0] rounded-full transition-colors font-bold cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-gray-800">
                                  {countInCart}
                                </span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-7 h-7 flex items-center justify-center text-brand-primary hover:bg-[#eae2e0] rounded-full transition-colors font-bold cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="px-3.5 py-1.5 bg-[#a73926] text-white rounded-full text-xs font-semibold hover:bg-[#8e2e1c] cursor-pointer shadow-sm transition-colors flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" /> Add
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Post Order Success screen in Simulator form */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8 px-4"
                  id="order-success-screen"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
                    A secure digital receipt has been created and sent to Bole Bistro's main kitchen device. The meal preparation has started!
                  </p>

                  <div className="bg-white p-5 rounded-2.5xl border border-gray-150 w-full max-w-md shadow-sm divide-y divide-gray-100 text-left mb-6">
                    <div className="pb-3 text-xs flex justify-between font-semibold text-gray-400">
                      <span>Live Invoice receipt</span>
                      <span className="text-brand-coral">Table 5 (Bole Bistro)</span>
                    </div>
                    <div className="py-3.5 space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Terminal Reference</span>
                        <span className="font-mono text-gray-800 font-semibold uppercase">DD-{Math.floor(Math.random() * 9000) + 1000}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Payment Method</span>
                        <span className="font-semibold text-gray-800">{paymentMethod} Wallet</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Invoice Status</span>
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Instant Paid</span>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-between text-sm font-bold text-gray-800">
                      <span>Total Transacted</span>
                      <span>ETB {cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <button
                      onClick={handleResetDemo}
                      className="flex-1 py-2.5 px-4 bg-brand-mint text-brand-sage hover:bg-brand-sage-light text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Order Something Else
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 px-4 bg-gray-950 text-white hover:bg-gray-850 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Exit Simulator
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Persistent Dynamic Sticky Bottom Checkout bar for Simulator */}
          {cart.length > 0 && !hasOrdered && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-150 p-4 shadow-xl z-30"
              id="sticky-cart-bar"
            >
              <form onSubmit={handleSubmitOrder}>
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1 font-semibold text-gray-700">
                    <ShoppingCart className="w-4 h-4 text-[#a73926]" />
                    <span>Selected ({cartItemCount} item{cartItemCount > 1 ? 's' : ''})</span>
                  </div>
                  <div className="font-medium">
                    Total: <span className="text-sm font-bold text-gray-900">ETB {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                  {/* Payment Method selectors */}
                  <div className="md:col-span-8 flex gap-1.5">
                    {(['Telebirr', 'CBE Birr', 'HelloCash'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all border cursor-pointer ${
                          paymentMethod === method
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-400 font-bold ring-2 ring-emerald-100'
                            : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                        }`}
                        id={`payment-method-${method}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {/* Ordering button */}
                  <button
                    type="submit"
                    disabled={isOrdering}
                    className="md:col-span-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white text-xs font-bold rounded-lg transition-colors shadow-md shadow-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isOrdering ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Pay & Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
