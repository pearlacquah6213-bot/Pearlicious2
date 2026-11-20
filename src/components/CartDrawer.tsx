import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, AlertCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    setCurrentView, 
    appliedCoupon, 
    applyCouponCode, 
    removeCoupon 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 40;
  const finalTotal = Math.max(0, subtotal - discountAmount + (cart.length > 0 ? deliveryFee : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-amber-500/20 text-zinc-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif font-bold text-lg">Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-amber-400 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <h4 className="font-serif text-lg font-bold text-zinc-300">Your bag is empty</h4>
                <p className="text-xs text-zinc-500 mt-1">Discover our luxury perfumes and add your first scent.</p>
                <button
                  onClick={() => { onClose(); setCurrentView('shop'); }}
                  className="mt-6 bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-sm text-zinc-100 line-clamp-1">{item.product.name}</h4>
                    <span className="text-xs text-amber-500 font-medium block mt-0.5">Size: {item.selectedSize}</span>
                    <span className="text-sm font-bold text-amber-400 block mt-1">GH₵ {item.price}.00</span>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-900">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-zinc-300 hover:text-zinc-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-zinc-100">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-zinc-300 hover:text-zinc-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-900 bg-zinc-900/30 space-y-4">
              {/* Coupon Box */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. AURA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 uppercase"
                    />
                    <Tag className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-amber-500/20"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                  <span>Coupon <b>{appliedCoupon.code}</b> applied ({appliedCoupon.discountPercent}% OFF)</span>
                  <button onClick={removeCoupon} className="text-zinc-400 hover:text-red-400 font-bold">Remove</button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {couponError}</p>}

              {/* Totals */}
              <div className="space-y-2 text-sm pt-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>GH₵ {subtotal}.00</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-amber-400 font-medium">
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span>- GH₵ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery (All 16 Regions)</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `GH₵ ${deliveryFee}.00`}</span>
                </div>
                <div className="flex justify-between text-zinc-100 font-serif font-bold text-lg pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-amber-400">GH₵ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-zinc-950 font-bold py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
