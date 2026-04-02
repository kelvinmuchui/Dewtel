import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { cn, formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(product.image);
  const { addToCart } = useCart();

  const handleImageError = () => {
    setImageSrc('/images/placeholder.svg');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden premium-shadow transition-all duration-500 border border-surface-container-high hover:border-primary/20"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-container-low">
        <motion.img
          src={imageSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            New Arrival
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
              {product.brand}
            </p>
            <h3 className="font-headline font-bold text-lg text-on-surface leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="font-headline font-extrabold text-xl text-on-surface whitespace-nowrap">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 h-10">
          {product.description}
        </p>

        <div className="flex items-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-surface-container-high hover:bg-primary hover:text-white text-on-surface font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            Details
            <ArrowRight size={16} />
          </Link>
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
