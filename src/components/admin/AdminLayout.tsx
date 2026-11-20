import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminInventory } from './AdminInventory';
import { AdminOrders } from './AdminOrders';
import { AdminDeliveries } from './AdminDeliveries';
import { AdminCustomers } from './AdminCustomers';
import { AdminReports } from './AdminReports';
import { AdminCoupons } from './AdminCoupons';
import { AdminBackup } from './AdminBackup';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ShoppingCart, 
  Truck, 
  Users, 
  BarChart3, 
  Tag, 
  ArrowLeft,
  ShieldCheck,
  Menu,
  X,
  Database
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { role, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-amber-500/20 flex flex-col transition-transform duration-300 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <span className="font-serif font-bold text-lg text-amber-400">PEARLICIOUS2</span>
              <span className="block text-[10px] text-zinc-400 uppercase">{role.replace('_', ' ')} • 0591593157</span>
            </div>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto text-sm font-medium">
          <button
            onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'overview' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview & KPI
          </button>

          <button
            onClick={() => { setActiveTab('products'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'products' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Package className="w-4 h-4" /> Manage Products
          </button>

          <button
            onClick={() => { setActiveTab('inventory'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'inventory' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Boxes className="w-4 h-4" /> Inventory & Suppliers
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'orders' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> Manage Orders
          </button>

          <button
            onClick={() => { setActiveTab('deliveries'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'deliveries' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Truck className="w-4 h-4" /> Delivery (16 Regions)
          </button>

          <button
            onClick={() => { setActiveTab('customers'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'customers' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Users className="w-4 h-4" /> Customer Directory
          </button>

          <button
            onClick={() => { setActiveTab('reports'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'reports' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Reports & Analytics
          </button>

          <button
            onClick={() => { setActiveTab('coupons'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'coupons' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Tag className="w-4 h-4" /> Coupons & Discounts
          </button>

          <button
            onClick={() => { setActiveTab('backup'); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'backup' ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg' : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Database className="w-4 h-4" /> Auto Backup & Recovery
          </button>
        </nav>

        {/* Exit Admin */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => setCurrentView('home')}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 rounded-xl text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Storefront
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between md:hidden">
          <button onClick={() => setIsMobileSidebarOpen(true)} className="text-zinc-300">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-serif font-bold text-amber-400">Pearlicious2 Admin</span>
          <span></span>
        </header>

        <main className="flex-1 p-6 lg:p-10 bg-zinc-950 overflow-y-auto">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'inventory' && <AdminInventory />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'deliveries' && <AdminDeliveries />}
          {activeTab === 'customers' && <AdminCustomers />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'coupons' && <AdminCoupons />}
          {activeTab === 'backup' && <AdminBackup />}
        </main>
      </div>
    </div>
  );
};
