import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Heart, Award, User, MapPin, Phone, Mail, ChevronRight, ExternalLink } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { orders, wishlist, products, setCurrentView, setSelectedProductId, toggleWishlist } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Client Portal</span>
            <h1 className="font-serif text-3xl font-bold mt-1">Customer Dashboard</h1>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-xs text-zinc-400 block">Aura Loyalty Points</span>
              <span className="font-serif font-bold text-amber-300 text-lg">345 Points (GH₵ 34.50 Value)</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-zinc-900 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders' ? 'border-amber-500 text-amber-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Package className="w-4 h-4" /> My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'wishlist' ? 'border-amber-500 text-amber-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Heart className="w-4 h-4" /> My Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile' ? 'border-amber-500 text-amber-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-4 h-4" /> Account Profile
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800">
                <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-zinc-300">No Orders Yet</h3>
                <p className="text-xs text-zinc-500 mt-2">Explore our perfume collection and place your first order.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="mt-6 bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-400"
                >
                  Shop Perfumes
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div>
                      <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Order #{ord.orderNumber}</span>
                      <p className="text-xs text-zinc-400 mt-1">Placed on {new Date(ord.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ord.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        ord.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        ord.status === 'Confirmed' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {ord.status}
                      </span>
                      <span className="font-serif font-bold text-amber-400 text-base">GH₵ {ord.totalAmount}.00</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/80">
                        <img src={item.image} alt={item.productName} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-serif font-bold text-xs text-zinc-200 line-clamp-1">{item.productName}</h4>
                          <span className="text-[11px] text-zinc-400">Size: {item.selectedSize} × {item.quantity}</span>
                          <span className="text-xs font-bold text-amber-400 block">GH₵ {item.price * item.quantity}.00</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                    <div>
                      <span className="font-semibold text-zinc-300">Delivery Destination:</span> {ord.city}, {ord.region} ({ord.address})
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-300">Payment:</span> {ord.paymentMethod} ({ord.paymentStatus})
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800">
                <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-zinc-300">Your Wishlist is Empty</h3>
                <p className="text-xs text-zinc-500 mt-2">Click the heart icon on any perfume to save it to your wishlist.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="mt-6 bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-400"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((product) => (
                  <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between p-4">
                    <div 
                      onClick={() => { setSelectedProductId(product.id); setCurrentView('product-detail'); }}
                      className="relative h-48 rounded-xl overflow-hidden cursor-pointer mb-4"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 
                        onClick={() => { setSelectedProductId(product.id); setCurrentView('product-detail'); }}
                        className="font-serif font-bold text-zinc-100 text-base cursor-pointer hover:text-amber-400"
                      >
                        {product.name}
                      </h4>
                      <span className="text-xs text-amber-400 font-bold block mt-1">GH₵ {product.discountPrice || product.price}.00</span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="mt-4 bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-300 py-2 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h3 className="font-serif text-2xl font-bold">Customer Account Profile</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <User className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs text-zinc-500 block">Full Name</span>
                  <span className="font-medium text-zinc-100">Abena Serwaa</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <Mail className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs text-zinc-500 block">Email Address</span>
                  <span className="font-medium text-zinc-100">abena.serwaa@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <Phone className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs text-zinc-500 block">Phone Number (Ghana)</span>
                  <span className="font-medium text-zinc-100">+233 24 456 7890</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <MapPin className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs text-zinc-500 block">Default Delivery Region</span>
                  <span className="font-medium text-zinc-100">Greater Accra Region (East Legon)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
