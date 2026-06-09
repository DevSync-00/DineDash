import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Table, Bell, RefreshCw, Layers, Check, CheckCircle2,
  AlertCircle, DollarSign, Clock, CheckSquare, Eye, Play, Sparkles
} from 'lucide-react';
import { Order, TableStatus, MenuItem } from '../types';

interface CockpitProps {
  orders: Order[];
  tables: TableStatus[];
  menuItems: MenuItem[];
  revenue: number;
  onUpdateOrderStatus: (orderId: string, nextStatus: Order['status']) => void;
  onUpdateTableStatus: (tableNumber: number, nextStatus: TableStatus['status']) => void;
  onToggleItemAvailability: (itemId: string) => void;
  onTriggerDemo: () => void;
}

type TabType = 'orders' | 'tables' | 'menu';

export default function Cockpit({ 
  orders, 
  tables, 
  menuItems, 
  revenue, 
  onUpdateOrderStatus, 
  onUpdateTableStatus, 
  onToggleItemAvailability,
  onTriggerDemo
}: CockpitProps) {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  
  // Calculate active tables
  const occupiedTablesCount = tables.filter(t => t.status !== 'Vacant').length;
  const totalTables = 30; // Standard layout capacity

  return (
    <div className="bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden" id="cockpit-container">
      {/* Top Banner indicating Interactive Dashboard */}
      <div className="bg-gradient-to-r from-teal-800 to-[#336852] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-[#b3ecd0] tracking-wider uppercase">Live Manager Terminal</span>
          </div>
          <h3 className="text-lg font-display font-medium text-white mt-1">DineDash Interactive Flight Cockpit</h3>
        </div>
        <button 
          onClick={onTriggerDemo}
          className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wide border border-white/20"
          id="trigger-simulator-from-cockpit"
        >
          <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse font-normal" />
          <span>Launch Guest Mock Phone</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-gray-50/50">
        
        {/* Metric 1 */}
        <div className="p-6 flex items-center justify-between" id="metric-revenue">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">Revenue Today</span>
            <div className="text-2xl font-black text-gray-800 mt-1 flex items-baseline gap-1" id="revenue-display">
              <span className="text-sm font-semibold text-[#a73926]">ETB</span>
              <span>{revenue.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-emerald-600 mt-1 font-medium bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
              ↑ 18.2% vs yesterday
            </span>
          </div>
          <div className="p-3.5 bg-red-50 text-[#a73926] rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 flex items-center justify-between" id="metric-tables">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">Active Tables</span>
            <div className="text-2xl font-black text-gray-800 mt-1 flex items-baseline gap-1" id="active-tables-display">
              <span>{occupiedTablesCount}</span>
              <span className="text-sm font-semibold text-gray-400">/ {totalTables} occupied</span>
            </div>
            <span className="text-[10px] text-[#336852] mt-1 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
              {totalTables - occupiedTablesCount} vacant ready
            </span>
          </div>
          <div className="p-3.5 bg-teal-50 text-[#336852] rounded-2xl">
            <Table className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 flex items-center justify-between" id="metric-alerts">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">Operational Status</span>
            <div className="text-xl font-bold text-gray-800 mt-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Full Bilingual Active</span>
            </div>
            <span className="text-[10px] text-gray-500 mt-1 font-mono">
              Last synced: Just Now
            </span>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
            <Bell className="w-6 h-6 animate-swing" />
          </div>
        </div>

      </div>

      {/* Tabs list Controls */}
      <div className="flex bg-gray-100/60 p-2 border-b border-gray-100 gap-1.5" id="cockpit-tabs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'orders' 
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
          id="tab-orders-trigger"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Orders Queue ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'tables' 
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
          id="tab-tables-trigger"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Table Layout ({tables.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'menu' 
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
          id="tab-menu-trigger"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Buna Menu Sync</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 md:p-6 max-h-[480px] overflow-y-auto">
        
        {/* Orders Queue Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4" id="orders-queue-tab">
            {orders.length === 0 ? (
              <div className="text-center py-10">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-500">No active orders right now.</p>
                <p className="text-xs text-gray-400 mt-1">Tap "Launch Guest Mock Phone" to simulate customer scans!</p>
              </div>
            ) : (
              orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white p-4 rounded-2xl border border-gray-150 shadow-sm hover:border-gray-200 transition-all flex flex-col md:flex-row justify-between gap-4"
                  id={`cockpit-order-${order.id}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded">
                        {order.id}
                      </span>
                      <span className="text-xs text-gray-400">{order.timestamp}</span>
                      <span className="text-xs font-semibold text-brand-primary bg-[#fdf0ed] px-2 py-0.5 rounded-full border border-[#f4725a]/10">
                        Table {order.tableNumber}
                      </span>
                    </div>

                    {/* Order items and quantities */}
                    <ul className="space-y-1 pl-1">
                      {order.items.map((it, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 text-center leading-4 text-[10px] bg-emerald-50 text-emerald-700 font-bold rounded">
                            {it.quantity}x
                          </span>
                          <span className="font-medium text-gray-800">{it.nameEn}</span>
                          <span className="text-gray-400">({it.price} ETB)</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status controls */}
                  <div className="flex flex-row md:flex-col justify-between items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-gray-400 block">Total Ledger</span>
                      <span className="text-sm font-bold text-gray-900">ETB {order.totalPrice}</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">via {order.paymentMethod}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1">
                      {/* Badge representation of Status */}
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        order.status === 'Received' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        order.status === 'Preparing' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        order.status === 'Delivered' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' :
                        'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}>
                        {order.status}
                      </span>

                      {/* Progression arrow switcher */}
                      {order.status !== 'Paid' && (
                        <button
                          onClick={() => {
                            const statuses: Order['status'][] = ['Received', 'Preparing', 'Delivered', 'Paid'];
                            const idx = statuses.indexOf(order.status);
                            if (idx < statuses.length - 1) {
                              onUpdateOrderStatus(order.id, statuses[idx + 1]);
                            }
                          }}
                          className="px-2.5 py-1 bg-gray-900 text-white rounded-lg text-[10px] font-bold hover:bg-gray-800 transition-colors uppercase cursor-pointer"
                          title="Advance Order State"
                          id={`advance-status-${order.id}`}
                        >
                          Next Step →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Table layout Tab */}
        {activeTab === 'tables' && (
          <div className="space-y-4" id="table-layout-tab">
            <p className="text-xs text-gray-400">
              Interactive Table Manager. Show tables mapped in Bole Bistro floor. Click any badge list to toggle its occupancy status!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-white p-2">
              {tables.map((tbl) => (
                <div 
                  key={tbl.number}
                  className={`p-3.5 rounded-2xl border text-center relative overflow-hidden transition-all shadow-sm ${
                    tbl.status === 'Vacant' ? 'bg-gray-50/50 border-gray-150 text-gray-600' : 
                    tbl.status === 'Browsing' ? 'bg-sky-50/30 border-sky-200 text-sky-700 font-semibold' :
                    tbl.status === 'Ordering' ? 'bg-amber-50/30 border-amber-200 text-amber-700 font-semibold animate-pulse' :
                    tbl.status === 'Occupied' ? 'bg-indigo-50/30 border-indigo-200 text-indigo-700' :
                    tbl.status === 'Unpaid' ? 'bg-red-50/30 border-red-200 text-red-700' :
                    'bg-emerald-50/50 border-emerald-200 text-emerald-700'
                  }`}
                  id={`cockpit-table-item-${tbl.number}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Table {tbl.number}
                  </span>
                  <div className="text-lg font-black">{tbl.capacity} Pax</div>
                  
                  {/* Select status options overlay */}
                  <select
                    value={tbl.status}
                    onChange={(e) => onUpdateTableStatus(tbl.number, e.target.value as TableStatus['status'])}
                    className="mt-2 w-full text-[10px] px-1 py-1 rounded border border-gray-200 bg-white shadow-sm font-semibold text-gray-700 focus:ring-1 focus:ring-[#336852]"
                    id={`table-status-select-${tbl.number}`}
                  >
                    <option value="Vacant">Vacant</option>
                    <option value="Browsing">Browsing</option>
                    <option value="Ordering">Ordering</option>
                    <option value="Occupied">Active Eating</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Cleared/Paid</option>
                  </select>

                  {/* Indicators for Active state bills */}
                  {tbl.currentTotal && tbl.currentTotal > 0 && (
                    <div className="text-[9px] font-bold text-gray-500 mt-1 bg-white/80 py-0.5 rounded border border-gray-100">
                      Bill: {tbl.currentTotal} ETB
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu & Availability Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-4" id="buna-menu-sync-tab">
            <p className="text-xs text-gray-400">
              Kitchen availability dashboard. If a dish sells out (e.g., Shiro or Macchiato), toggle it here. It is live synced with the guest's browser simulation!
            </p>
            <div className="divide-y divide-gray-100 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {menuItems.map((item) => {
                const isAvailable = !(item as any).isSoldOut;
                return (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors"
                    id={`sync-menu-list-${item.id}`}
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                        <span>{item.nameEn}</span>
                        <span className="text-[10px] text-gray-400 font-normal italic">({item.nameAm})</span>
                      </h4>
                      <p className="text-[10px] text-gray-400">ETB {item.price}</p>
                    </div>

                    <button
                      onClick={() => onToggleItemAvailability(item.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                        isAvailable 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                      id={`availability-toggle-${item.id}`}
                    >
                      {isAvailable ? '● Active In Menu' : '✖ Sold Out'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
