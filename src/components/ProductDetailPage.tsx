import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Phone, 
  Share2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    setCurrentView, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    reviews,
    addReview,
    showToast 
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || '50ml');
  const [quantity, setQuantity] = useState<number>(1);
  
  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-12 text-center">
        <h2 className="text-2xl font-bold">Product not found.</h2>
        <button onClick={() => setCurrentView('shop')} className="mt-4 bg-amber-500 text-zinc-950 px-6 py-2.5 rounded-xl font-bold">
          Back to Shop
        </button>
      </div>
    );
  }

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const currentPrice = currentSizeObj ? currentSizeObj.price : product.price;
  const isWishlisted = wishlist.includes(product.id);

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const avgRating = productReviews.length > 0 
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
    : '5.0';

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !comment) {
      showToast('Please provide your name and review comment.', 'error');
      return;
    }
    addReview({
      productId: product.id,
      customerName: reviewerName,
      rating,
      comment
    });
    setReviewerName('');
    setComment('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountPrice && (
                <span className="absolute top-4 left-4 bg-amber-500 text-zinc-950 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Special Offer
                </span>
              )}
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-amber-500 scale-105' : 'border-zinc-800 opacity-75'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-start">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{product.brand}</span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isWishlisted ? 'bg-amber-500 border-amber-500 text-zinc-950' : 'border-zinc-800 text-zinc-400 hover:text-amber-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-zinc-950' : ''}`} />
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-2">{product.name}</h1>
            
            {/* Rating & Family */}
            <div className="flex items-center gap-4 mt-3 pb-6 border-b border-zinc-900">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-sm text-zinc-200">{avgRating}</span>
                <span className="text-xs text-zinc-500">({productReviews.length} reviews)</span>
              </div>
              <span className="text-zinc-600">•</span>
              <span className="text-xs px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-300 font-medium">
                {product.fragranceFamily}
              </span>
            </div>

            {/* Price */}
            <div className="py-6 flex items-baseline gap-4">
              <span className="text-3xl font-serif font-bold text-amber-400">GH₵ {currentPrice}.00</span>
              {product.discountPrice && (
                <span className="text-sm text-zinc-500 line-through">GH₵ {product.price}.00</span>
              )}
              <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                In Stock ({currentSizeObj?.stock || product.stock} available)
              </span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                Select Bottle Size:
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((sz) => (
                  <button
                    key={sz.size}
                    onClick={() => setSelectedSize(sz.size)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === sz.size
                        ? 'bg-amber-500 border-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {sz.size} - GH₵ {sz.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Fragrance Notes Breakdown */}
            <div className="mb-8 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
              <h4 className="font-serif font-bold text-amber-400 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Fragrance Pyramid Notes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-zinc-400 block mb-1">Top Notes:</span>
                  <span className="text-zinc-200">{product.topNotes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-400 block mb-1">Heart Notes:</span>
                  <span className="text-zinc-200">{product.middleNotes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-400 block mb-1">Base Notes:</span>
                  <span className="text-zinc-200">{product.baseNotes.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-zinc-400 hover:text-zinc-100 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-4 py-3 font-bold text-sm text-zinc-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-zinc-400 hover:text-zinc-100 transition-colors font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-grow bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-zinc-950 font-bold py-3.5 px-8 rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Shopping Bag • GH₵ {currentPrice * quantity}.00</span>
              </button>
            </div>

            {/* Quick Actions & WhatsApp VIP */}
            <div className="flex items-center justify-between pt-6 border-t border-zinc-900 text-xs text-zinc-400">
              <a
                href={`https://wa.me/233244567890?text=Hello%20Aura%20Ghana,%20I%20am%20interested%20in%20purchasing%20${product.name}%20(${selectedSize}).`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <Phone className="w-4 h-4" /> Order via WhatsApp VIP
              </a>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-amber-400 font-semibold"
              >
                <Share2 className="w-4 h-4" /> Share Product
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 border-t border-zinc-900 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-2xl font-bold">Customer Reviews</h3>
              <p className="text-xs text-zinc-400 mt-1">Verified purchases from clients in Accra, Kumasi, and across Ghana.</p>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="mt-8 space-y-4 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
                <h4 className="font-serif font-bold text-amber-400 text-sm">Write a Review</h4>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ama Serwaa"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>5 Stars - Absolute Masterpiece</option>
                    <option value={4}>4 Stars - Very Pleased</option>
                    <option value={3}>3 Stars - Good</option>
                    <option value={2}>2 Stars - Average</option>
                    <option value={1}>1 Star - Below Expectations</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Review Comments</label>
                  <textarea
                    rows={3}
                    placeholder="Share your experience with the fragrance..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">No reviews yet for this perfume. Be the first to share your thoughts!</p>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-zinc-200">{rev.customerName}</h4>
                      <span className="text-xs text-zinc-500">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                    </div>
                    <p className="text-sm text-zinc-300">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
