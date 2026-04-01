import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart, Smartphone, Cpu, Battery, Camera } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/iphone16hero/1920/1080"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6">
              Exclusive Launch
            </span>
            <h1 className="font-headline font-extrabold text-6xl md:text-8xl leading-[0.9] mb-6 tracking-tight">
              Titanium <br />
              <span className="text-primary-container">Lumina Pro 16</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Experience the pinnacle of mobile engineering. Crafted from grade 5 titanium, powered by the revolutionary A18 Pro chip.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/product/1"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 flex items-center gap-3 text-lg shadow-xl shadow-primary/30"
              >
                Pre-order Now
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/devices"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 flex items-center gap-3 text-lg border border-white/20"
              >
                Explore All
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-[40px] p-10 flex flex-col justify-between border border-surface-container-high overflow-hidden group relative">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Cpu size={32} />
              </div>
              <h3 className="font-headline font-extrabold text-3xl mb-4 leading-tight">
                A18 Pro <br />
                Neural Engine
              </h3>
              <p className="text-on-surface-variant max-w-xs">
                The fastest chip in any smartphone, designed for high-performance AI and gaming.
              </p>
            </div>
            <img
              src="https://picsum.photos/seed/chip/400/400"
              alt="Chip"
              className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:col-span-2 bg-primary text-white rounded-[40px] p-10 flex items-center justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="font-headline font-extrabold text-3xl mb-4">
                Pro Camera <br /> System
              </h3>
              <p className="text-white/70 max-w-xs mb-6">
                Capture every detail with our new 48MP main sensor and 5x optical zoom.
              </p>
              <Link to="/devices" className="inline-flex items-center gap-2 font-bold text-sm hover:gap-4 transition-all">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <Camera size={120} className="absolute -right-10 top-1/2 -translate-y-1/2 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
          </div>

          <div className="bg-surface-container-high rounded-[40px] p-8 flex flex-col items-center justify-center text-center group">
            <Battery size={48} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-headline font-bold text-xl mb-2">All-Day Power</h4>
            <p className="text-sm text-on-surface-variant">Up to 30 hours of usage.</p>
          </div>

          <div className="bg-surface-container-high rounded-[40px] p-8 flex flex-col items-center justify-center text-center group">
            <Smartphone size={48} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="font-headline font-bold text-xl mb-2">Titanium Build</h4>
            <p className="text-sm text-on-surface-variant">Stronger, lighter, better.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-container-low py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">
                Curated Selection
              </span>
              <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight">
                Featured Devices
              </h2>
            </div>
            <Link
              to="/devices"
              className="hidden md:flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all"
            >
              View All Collection <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
