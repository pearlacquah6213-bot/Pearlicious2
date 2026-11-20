import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const AdminOverview: React.FC = () => {
  const { products, orders, customers } = useApp();

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  const lowStockProducts = products.filter((p) => p.stock < 25);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending');

  const monthlyChartData = [
    { month: 'Nov', revenue: 12500, orders: 18 },
    { month: 'Dec', revenue: 24800, orders: 35 },
    { month: 'Jan', revenue: 18200, orders: 26 },
    { month: 'Feb', revenue: 29500, orders: 42 },
    { month: 'Mar', revenue: totalRevenue + 15000, orders: totalOrders + 20 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-serif text-3xl font-bold">Admin Overview & KPI</h1>
        <p className="text-zinc-400 text-sm mt-1">Real-time business performance metrics for Aura Ghana.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-semibold">Total Revenue</span>
            <h3 className="font-serif font-bold text-2xl text-amber-400 mt-1">GH₵ {totalRevenue.toLocaleString()}.00</h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-semibold">Total Orders</span>
            <h3 className="font-serif font-bold text-2xl text-zinc-100 mt-1">{totalOrders}</h3>
            <span className="text-xs text-amber-400 mt-1 block">{pendingOrders.length} pending fulfillment</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-semibold">Registered Customers</span>
            <h3 className="font-serif font-bold text-2xl text-zinc-100 mt-1">{totalCustomers}</h3>
            <span className="text-xs text-emerald-400 mt-1 block">Active across 16 regions</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-semibold">Active Products</span>
            <h3 className="font-serif font-bold text-2xl text-zinc-100 mt-1">{totalProducts}</h3>
            <span className="text-xs text-red-400 mt-1 block">{lowStockProducts.length} low stock alerts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <h3 className="font-serif text-xl font-bold mb-6">Monthly Revenue Growth (GH₵)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#a1a1aa" textAnchor="end" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '12px', color: '#f4f4f5' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
          <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Low Stock Inventory Alerts
          </h3>
          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">All perfume inventory levels are healthy.</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-zinc-200">{p.name}</h4>
                    <span className="text-[11px] text-zinc-500">{p.brand}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {p.stock} units left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
          <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-400" /> Recent Transactions
          </h3>
          <div className="space-y-3">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div>
                  <h4 className="font-serif font-bold text-xs text-zinc-200">{o.customerName} ({o.orderNumber})</h4>
                  <span className="text-[11px] text-zinc-500">{o.region}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-400 text-xs block">GH₵ {o.totalAmount}.00</span>
                  <span className="text-[10px] text-emerald-400">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
