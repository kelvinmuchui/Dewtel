import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { cn, formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('smartphones');
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [dealCountdown, setDealCountdown] = useState(86400);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDealCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (value: number) => {
    const hours = Math.floor(value / 3600); const minutes = Math.floor((value % 3600) / 60); const seconds = value % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  };

  const latestArrivals = {
    large: PRODUCTS.find(p => p.id === '2'),
    small: PRODUCTS.filter(p => p.id === '3' || p.id === '4'),
  };

  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  // Fallback for empty categories (e.g., special offers or tablets if not enough data)
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : PRODUCTS.slice(4, 8);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-surface-container py-16 md:py-20 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-xl"
          >
            <span className="inline-block bg-[#22d3ee] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-6">
              New Launch
            </span>
            <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-tight text-on-surface">
              Titanium <br />
              <span className="text-[#006781]">Lumina Pro 16</span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg mb-10 leading-relaxed max-w-md">
              Engineered with the new A18 Bionic chip and a surgical-grade ceramic shield. The future of mobile photography is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="hero-gradient-button text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Pre-order Now
              </button>
              <button className="border border-on-surface-variant/30 text-on-surface font-semibold py-4 px-8 rounded-full hover:bg-white transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <img 
              src="/images/lumina_hero.png" 
              alt="Titanium Lumina Pro 16"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-md text-sm font-bold transition-all",
                activeCategory === cat.id 
                  ? "bg-[#006781] text-white shadow-lg" 
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-4xl">Shop by Category</h2>
          <p className="text-on-surface-variant">Speed up your shopping with curated categories.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {['Smartphones', 'Laptops', 'Accessories', 'Gaming', 'Smart Devices'].map((item) => (
            <div key={item} className="group bg-white dark:bg-slate-800 border border-surface-container-high rounded-2xl p-6 text-center hover:shadow-xl transition-all">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mb-4">{item[0]}</div>
              <h3 className="font-bold text-lg mb-2">{item}</h3>
              <p className="text-sm text-on-surface-variant">Premium electronics for connected life.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline font-bold text-4xl mb-2">Latest Arrivals</h2>
            <p className="text-on-surface-variant">The freshest tech in our curated gallery.</p>
          </div>
          <Link to="/devices" className="flex items-center gap-1 text-[#006781] font-bold text-sm hover:gap-2 transition-all">
            View All <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full md:h-[600px]">
          {/* Featured Large Card */}
          <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden premium-shadow relative group">
            <div className="p-10 absolute top-0 left-0 z-10">
              <span className="text-[#805600] text-[10px] font-bold uppercase tracking-widest block mb-2">In Stock</span>
              <h3 className="font-headline font-bold text-4xl mb-4">{latestArrivals.large?.name}</h3>
              <p className="text-on-surface-variant text-sm max-w-xs mb-6">{latestArrivals.large?.description}</p>
              <span className="text-2xl font-bold">{formatPrice(latestArrivals.large?.price || 0)}</span>
            </div>
            <img 
              src={latestArrivals.large?.image} 
              alt={latestArrivals.large?.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Small Cards Stack */}
          <div className="flex flex-col gap-6">
            {latestArrivals.small.map((item) => (
              <div key={item.id} className="flex-1 bg-white rounded-2xl overflow-hidden premium-shadow p-6 flex flex-col justify-between group">
                <div className="flex justify-center flex-1 h-1/2">
                   <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <span className="text-on-surface-variant font-bold">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Shop Section (Replacng Best Sellers) */}
      <section className="bg-surface-container py-24 px-6 min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="font-headline font-bold text-4xl mb-2">
                Explore {CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-on-surface-variant">Precision curated gear for your digital life.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {displayProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                >
                  <div className="group block bg-white rounded-2xl p-6 premium-shadow border border-surface-container-high hover:border-primary/30 transition-all">
                    <div className="relative aspect-square flex items-center justify-center overflow-hidden rounded-xl bg-surface-container-low mb-4">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </Link>
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="bg-white/90 text-slate-700 rounded-full p-2 hover:bg-primary hover:text-white transition-all shadow"
                          aria-label="Quick view"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="bg-white/90 text-slate-700 rounded-full p-2 hover:bg-red-500 hover:text-white transition-all shadow"
                          aria-label="Wishlist"
                        >
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-on-surface leading-tight">{product.name}</h4>
                        <p className="text-xs text-on-surface-variant uppercase font-bold tracking-widest">{product.category}</p>
                      </div>
                      <span className="font-bold text-primary text-lg whitespace-nowrap">{formatPrice(product.price)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-yellow-500">
                      {[...Array(5)].map((_, idx) => <Star key={idx} size={14} className="fill-current" />)}
                      <span className="text-on-surface-variant ml-2">4.8 (210)</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="font-headline font-bold text-4xl">Flash Deals</h2>
            <p className="text-on-surface-variant">Limited-time savings on selected bestsellers.</p>
          </div>
          <div className="text-sm font-semibold text-primary">Ends in {formatCountdown(dealCountdown)}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.filter((p) => p.isNew).slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 border border-surface-container-high rounded-3xl p-5 text-center hover:shadow-lg transition-all">
              <img src={item.image} alt={item.name} className="h-40 mx-auto object-contain mb-4" />
              <p className="text-xs uppercase font-bold text-on-surface-variant">{item.brand}</p>
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-sm text-primary font-extrabold mb-2">{formatPrice(Math.round(item.price * 0.88))} <span className="line-through text-on-surface-variant ml-2">{formatPrice(item.price)}</span></p>
              <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">12% OFF</span>
              <div className="mt-4">
                <button className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-headline font-bold text-4xl text-center mb-8">Trusted by Global Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
          {['Apple', 'Samsung', 'Xiaomi', 'Tecno', 'Infinix', 'JBL'].map((brand) => (
            <div key={brand} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-surface-container-high shadow-sm w-full text-center">
              <p className="font-bold text-sm">{brand}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Promotion Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-[40px] overflow-hidden p-10 text-white">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_40%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-bold uppercase tracking-widest text-sm">Flagship Offer</p>
              <h3 className="font-headline font-extrabold text-5xl mb-4">iPhone 17 Pro Max<br />Now from KSh 159,999</h3>
              <p className="mb-6 text-lg text-white/90">Experience the ultimate performance with A17 Pro chip, pro camera system and sleek titanium design.</p>
              <button className="bg-white text-primary font-bold rounded-full px-8 py-4 shadow-lg hover:scale-[1.02] transition-transform">Shop the Deal</button>
            </div>
            <img src="https://www.phoneplacekenya.com/wp-content/uploads/2025/07/71cdtM6hgmL._UF10001000_QL80_-800x800.jpg" alt="Flagship promotion" className="w-full h-80 object-cover rounded-3xl border border-white/30" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-headline font-bold text-4xl text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Amina R.', feedback: 'Best shopping experience! Fast delivery and excellent support.', rating: 5 },
            { name: 'John K.', feedback: 'Quality gadgets and premium packaging. Highly recommend.', rating: 5 },
            { name: 'Lina N.', feedback: 'Great value and effortless checkout flow. Loved the interface.', rating: 5 },
          ].map((review) => (
            <div key={review.name} className="bg-white dark:bg-slate-800 border border-surface-container-high rounded-2xl p-6 shadow-sm">
              <div className="flex gap-2 mb-4 text-yellow-500">{[...Array(review.rating)].map((_, idx) => <Star key={idx} size={18} className="fill-current" />)}</div>
              <p className="text-on-surface-variant mb-4">"{review.feedback}"</p>
              <p className="font-bold">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="newsletter-gradient rounded-[40px] p-12 md:p-20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md relative z-10">
            <h2 className="font-headline font-bold text-5xl md:text-6xl mb-6 tracking-tight leading-tight">
              Stay Ahead of the Curve.
            </h2>
            <p className="text-white/80 text-lg">
              Join 50,000+ tech enthusiasts for exclusive early access and weekly curation of the best mobile gear.
            </p>
          </div>
          
          <div className="w-full max-w-md relative z-10">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-5 px-8 outline-none focus:bg-white/30 transition-all placeholder:text-white/60 text-lg"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-white text-[#006781] font-bold px-8 rounded-full hover:bg-white/90 transition-colors">
                Join Now
              </button>
            </div>
          </div>

          {/* Decorative mesh/blobs */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </section>

      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-3xl w-full border border-surface-container-high shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-primary">
                ✕
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-64 object-cover rounded-2xl" />
                <div>
                  <p className="text-xs uppercase text-on-surface-variant font-bold tracking-widest">{quickViewProduct.brand}</p>
                  <h3 className="font-headline font-bold text-3xl mt-2 mb-3">{quickViewProduct.name}</h3>
                  <p className="text-on-surface-variant mb-4">{quickViewProduct.description}</p>
                  <p className="text-primary font-extrabold text-2xl mb-4">{formatPrice(quickViewProduct.price)}</p>
                  <div className="flex gap-2 mb-4">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={18} className="fill-current text-yellow-400" />)}
                  </div>
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
