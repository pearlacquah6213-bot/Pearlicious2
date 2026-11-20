import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Star, 
  Heart, 
  ShoppingBag, 
  Flame,
  CheckCircle,
  Tag,
  PhoneCall,
  Award,
  Zap,
  Gift
} from 'lucide-react';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const { 
    products, 
    setCurrentView, 
    setSelectedProductId, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setSelectedCategoryFilter 
  } = useApp();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);

  const categories = [
    { name: 'Arabic Perfumes', count: '12+ Scents', icon: Sparkles, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Luxury Perfumes', count: '18+ Scents', icon: Award, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Perfume Oils', count: '10+ Attars', icon: Gift, image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600' },
    { name: "Men's Perfumes", count: '15+ Scents', icon: Zap, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600' },
    { name: "Women's Perfumes", count: '16+ Scents', icon: Heart, image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600' },
    { name: 'Body Sprays', count: '8+ Mists', icon: Tag, image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&q=80&w=600' }
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setCurrentView('shop');
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Hero Section - Clean Modern White & Red Accent */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4" /> PEARLICIOUS2 • GHANA’S PREMIER LUXURY PERFUMERY
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Exquisite Luxury Fragrances Crafted for <span className="text-red-600 underline decoration-red-400 decoration-wavy underline-offset-8">Ghanaian Royalty</span>
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Discover rare Arabian ouds, long-lasting French extracts, and concentrated perfume oils. Fast, secure door-to-door delivery across all 16 regions of Ghana with Mobile MoMo, Visa, and telephone support at <b className="text-slate-900">0591593157</b>.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => { setSelectedCategoryFilter('All'); setCurrentView('shop'); }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all flex items-center gap-2 group"
              >
                <span>Shop All Perfumes</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => { setSelectedCategoryFilter('Arabic Perfumes'); setCurrentView('shop'); }}
                className="bg-white border-2 border-slate-200 hover:border-red-600 text-slate-800 font-bold px-8 py-4 rounded-2xl transition-all shadow-sm"
              >
                Arabic Scents
              </button>
            </div>

            {/* Key Trust Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 w-full mt-4">
              <div>
                <span className="font-serif text-2xl font-bold text-red-600">16 Regions</span>
                <p className="text-xs text-slate-500 mt-0.5">Nationwide Delivery</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-slate-900">100%</span>
                <p className="text-xs text-slate-500 mt-0.5">Authentic Scents</p>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-red-600">GH₵</span>
                <p className="text-xs text-slate-500 mt-0.5">Local Currency</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Promo Banner */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-lg h-[480px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800" 
                alt="Pearlicious2 Luxury Perfume"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100">
                <span className="text-[11px] text-red-600 font-bold uppercase tracking-wider">Featured Masterpiece</span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">Kumasi Royal Oud Intense</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-bold text-red-600">GH₵ 820.00</span>
                  <button 
                    onClick={() => { setSelectedProductId('prod-2'); setCurrentView('product-detail'); }}
                    className="text-xs bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner Section (Inspired by Design Reference 2: Professional Tech/Promo Layout) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-4 max-w-xl z-10">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Special VIP Offer • Tel: 0591593157
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
              Get 20% Off Your First Luxury Fragrance Order Across Ghana
            </h2>
            <p className="text-red-100 text-sm leading-relaxed">
              Use code <b className="bg-white text-red-700 px-2 py-0.5 rounded font-mono">GHANA20</b> at checkout or call our concierge directly to place your order with mobile money.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={() => { setSelectedCategoryFilter('All'); setCurrentView('shop'); }}
              className="bg-white text-red-600 font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-slate-100 transition-all text-center"
            >
              Shop Collection Now
            </button>
            <a
              href="https://wa.me/233591593157"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-red-400" /> Call 0591593157
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid with Icon Cards (Design Reference 2 Inspiration) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Curated Collections</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900">Explore Perfume Categories</h2>
          <p className="text-slate-600 text-sm mt-2">Professional selection of fine fragrances categorized for your preference.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div 
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 cursor-pointer h-60 flex flex-col justify-between p-5 hover:border-red-600/60 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-full">
                    {cat.count}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-red-600 transition-colors">{cat.name}</h3>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Handpicked Selection</span>
              <h2 className="font-serif text-3xl font-bold mt-1 text-slate-900">Featured Luxury Perfumes</h2>
            </div>
            <button
              onClick={() => { setSelectedCategoryFilter('All'); setCurrentView('shop'); }}
              className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              View All Perfumes <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={handleProductClick}
                onAddToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center gap-1">
              <Flame className="w-4 h-4 text-red-600" /> Best Sellers in Ghana
            </span>
            <h2 className="font-serif text-3xl font-bold mt-1 text-slate-900">Most Popular Fragrances</h2>
          </div>
          <button
            onClick={() => { setSelectedCategoryFilter('All'); setCurrentView('shop'); }}
            className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            Browse Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Client Testimonials</span>
            <h2 className="font-serif text-3xl font-bold mt-2 text-slate-900">Trusted Across Accra & Kumasi</h2>
            <p className="text-slate-600 text-sm mt-2">Hear what our esteemed clients have to say about Pearlicious2 perfumes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic mb-6">
                "Pearlicious2 is incredible! Ordering via MTN MoMo was seamless, and the fragrance arrived in East Legon within hours. Highly professional!"
              </p>
              <div>
                <h4 className="font-serif font-bold text-slate-900">Abena Serwaa</h4>
                <p className="text-xs text-red-600">East Legon, Accra</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic mb-6">
                "Finding authentic luxury oud in Kumasi used to be difficult until I found Pearlicious2 at 0591593157. Exceptional quality and customer service."
              </p>
              <div>
                <h4 className="font-serif font-bold text-slate-900">Yaw Osei Boateng</h4>
                <p className="text-xs text-red-600">Ahodwo, Kumasi</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic mb-6">
                "Fast delivery to Takoradi and the packaging is world-class. The perfume oils last all day long through the Ghanaian heat."
              </p>
              <div>
                <h4 className="font-serif font-bold text-slate-900">Efia Ohenewaa</h4>
                <p className="text-xs text-red-600">Takoradi, Western Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onProductClick: (id: string) => void;
  onAddToCart: (p: Product, size: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onProductClick, 
  onAddToCart, 
  wishlist, 
  toggleWishlist 
}) => {
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-red-600/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onProductClick(product.id)}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discountPrice && (
          <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Sale
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-sm ${
            isWishlisted ? 'bg-red-600 text-white' : 'bg-white/90 text-slate-700 hover:text-red-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-red-600 font-bold">{product.brand}</span>
          <h3 
            onClick={() => onProductClick(product.id)}
            className="font-serif font-bold text-slate-900 text-base mt-1 cursor-pointer hover:text-red-600 transition-colors line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Price (GH₵)</span>
            <span className="font-serif font-bold text-red-600 text-lg">
              GH₵ {product.discountPrice || product.price}.00
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product, product.sizes[0]?.size || '50ml')}
            className="bg-slate-900 hover:bg-red-600 text-white p-3 rounded-2xl transition-all flex items-center gap-1.5 text-xs font-bold shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
