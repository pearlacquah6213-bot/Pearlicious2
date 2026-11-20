import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GHANA_REGIONS, Order, PaymentMethod } from '../types';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, CheckCircle2, Lock, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    clearCart, 
    createOrder, 
    setCurrentView, 
    appliedCoupon, 
    showToast 
  } = useApp();

  const [fullName, setFullName] = useState('Abena Serwaa');
  const [email, setEmail] = useState('abena.serwaa@gmail.com');
  const [phone, setPhone] = useState('+233 24 456 7890');
  const [region, setRegion] = useState(GHANA_REGIONS[0]);
  const [city, setCity] = useState('East Legon, Accra');
  const [address, setAddress] = useState('Plot 12, American House Street');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Call before delivery.');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MTN Mobile Money');
  const [momoNumber, setMomoNumber] = useState('+233 24 456 7890');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 40;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate secure server-side payment verification (Paystack / Mobile Money)
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: finalTotal * 100, // in pesewas
          provider: paymentMethod,
          phone: momoNumber
        })
      });
      const paymentData = await res.json();

      if (!paymentData.success) {
        throw new Error('Payment initialization failed.');
      }

      // Create order
      const newOrder = createOrder({
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        region,
        city,
        address,
        deliveryInstructions,
        items: cart.map((i) => ({
          productId: i.productId,
          productName: i.product.name,
          selectedSize: i.selectedSize,
          price: i.price,
          quantity: i.quantity,
          image: i.product.images[0]
        })),
        subtotal,
        discountAmount,
        deliveryFee,
        totalAmount: finalTotal,
        status: 'Confirmed',
        paymentMethod,
        paymentStatus: 'Success',
        paymentReference: paymentData.data.reference
      });

      setPlacedOrder(newOrder);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      showToast('Payment verified & order placed successfully!');
    } catch (err) {
      console.error(err);
      showToast('Payment processing error. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4">
        <div className="max-w-2xl mx-auto bg-zinc-900 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Secure Order Confirmation</span>
          <h1 className="font-serif text-3xl font-bold mt-2">Thank You for Your Order!</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Your payment has been securely verified and your order <span className="text-amber-400 font-bold">{placedOrder.orderNumber}</span> has been confirmed.
          </p>

          <div className="my-8 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-3">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Recipient:</span>
              <span className="text-zinc-100 font-medium">{placedOrder.customerName}</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Delivery Destination:</span>
              <span className="text-zinc-100 font-medium">{placedOrder.city}, {placedOrder.region}</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Payment Ref:</span>
              <span className="text-amber-400 font-medium">{placedOrder.paymentReference}</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900 font-bold">
              <span>Total Paid:</span>
              <span className="text-amber-400 text-base">GH₵ {placedOrder.totalAmount}.00</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-3.5 rounded-xl text-xs transition-colors"
            >
              View Order History
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold px-8 py-3.5 rounded-xl text-xs transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 text-center">
        <h2 className="text-2xl font-bold">Your bag is empty.</h2>
        <button onClick={() => setCurrentView('shop')} className="mt-4 bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-xl font-bold">
          Shop Perfumes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
              <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" /> Delivery Address in Ghana
              </h2>

              <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Phone Number (Ghana)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Region of Ghana</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    >
                      {GHANA_REGIONS.map((reg) => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">City or Town</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Detailed Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Delivery Instructions (Optional)</label>
                  <textarea
                    rows={2}
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="e.g. Call 10 mins before arrival, leave at reception..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
              <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" /> Secure Payment (Ghana)
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {(['MTN Mobile Money', 'Telecel Cash', 'AT Money', 'Visa / Mastercard'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === method
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-2 text-amber-400" />
                    <span className="font-bold text-xs">{method}</span>
                  </button>
                ))}
              </div>

              {paymentMethod.includes('Money') || paymentMethod.includes('Cash') ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Mobile Money Phone Number</label>
                    <input
                      type="text"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <p className="text-xs text-amber-400/90 flex items-center gap-1.5 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    <Lock className="w-4 h-4 shrink-0" /> You will receive an instant MoMo prompt on your phone to authorize GH₵ {finalTotal}.00 securely.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                    <p className="font-bold text-amber-400">Paystack Secure Gateway</p>
                    <p>Enter your Visa or Mastercard details securely on the encrypted payment modal.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/80 p-8 rounded-3xl border border-amber-500/30 sticky top-28 space-y-6 shadow-2xl">
              <h3 className="font-serif text-xl font-bold border-b border-zinc-800 pb-4">Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)</h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-serif font-bold text-zinc-200 line-clamp-1">{item.product.name}</h4>
                        <span className="text-xs text-zinc-400">{item.selectedSize} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-amber-400">GH₵ {item.price * item.quantity}.00</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>GH₵ {subtotal}.00</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>- GH₵ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery (All 16 Regions)</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `GH₵ ${deliveryFee}.00`}</span>
                </div>
                <div className="flex justify-between text-zinc-100 font-serif font-bold text-xl pt-3 border-t border-zinc-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400">GH₵ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-zinc-950 font-bold py-4 rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay GH₵ {finalTotal.toFixed(2)} Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
