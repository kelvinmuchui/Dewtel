import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ArrowLeft, Heart, Share2, Check, Smartphone, Cpu, Battery, Camera, Layers, Monitor } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { cn } from '../lib/utils';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions[0]);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center px-6">
        <h1 className="font-headline font-extrabold text-4xl mb-6">Device Not Found</h1>
        <Link to="/devices" className="text-primary font-bold hover:underline">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const specIcons = {
    display: <Monitor size={24} />,
    processor: <Cpu size={24} />,
    ram: <Layers size={24} />,
    storage: <Smartphone size={24} />,
    camera: <Camera size={24} />,
    battery: <Battery size={24} />,
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <Link to="/devices" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-surface-container-low rounded-[48px] overflow-hidden border border-surface-container-high relative group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {product.isNew && (
              <span className="absolute top-8 left-8 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                New Arrival
              </span>
            )}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                isLiked ? "bg-red-500 text-white" : "bg-white/80 backdrop-blur-md text-on-surface hover:bg-white"
              )}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden border border-surface-container-high cursor-pointer hover:border-primary transition-all">
                <img
                  src={`https://picsum.photos/seed/${product.id}${i}/400/400`}
                  alt={`${product.name} thumbnail ${i}`}
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">
              {product.brand}
            </span>
            <h1 className="font-headline font-extrabold text-5xl md:text-6xl tracking-tight mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-6">
              <p className="font-headline font-extrabold text-4xl text-on-surface">
                ${product.price}
              </p>
              <div className="h-8 w-px bg-surface-container-high" />
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-on-surface-variant text-sm font-bold ml-2">(48 Reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="space-y-10 mb-12">
            {/* Color Selection */}
            <div>
              <h4 className="font-headline font-bold text-lg mb-4">Select Color</h4>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-12 h-12 rounded-full border-4 transition-all flex items-center justify-center",
                      selectedColor === color ? "border-primary scale-110" : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && <Check size={20} className={cn(color === '#F2F2F2' || color === '#FFFFFF' ? 'text-black' : 'text-white')} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h4 className="font-headline font-bold text-lg mb-4">Storage Capacity</h4>
              <div className="flex flex-wrap gap-3">
                {product.storageOptions.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={cn(
                      "px-6 py-3 rounded-2xl font-bold text-sm transition-all border",
                      selectedStorage === storage
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-white text-on-surface border-surface-container-high hover:bg-surface-container-low"
                    )}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/30">
              <ShoppingCart size={24} />
              Add to Cart
            </button>
            <button className="w-16 h-16 bg-surface-container-high hover:bg-surface-container-low text-on-surface rounded-2xl flex items-center justify-center transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specs Grid */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight mb-4">Technical Specifications</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">Precision engineered for performance. Every component is optimized for the ultimate mobile experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="bg-surface-container-low rounded-[32px] p-8 border border-surface-container-high hover:border-primary/20 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {specIcons[key as keyof typeof specIcons]}
              </div>
              <h4 className="font-headline font-bold text-lg mb-2 capitalize">{key}</h4>
              <p className="text-on-surface-variant font-medium">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
