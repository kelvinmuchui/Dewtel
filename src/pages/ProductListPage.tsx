import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { cn, formatPrice } from '../lib/utils';

export const ProductListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  const getCategoryIcon = (id: string) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? <span className="text-lg">{cat.icon}</span> : <Search size={20} />;
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="font-headline font-extrabold text-5xl md:text-6xl tracking-tight mb-4">
            Device Gallery
          </h1>
          <p className="text-on-surface-variant max-w-lg text-lg">
            Explore our precision-curated collection of the world's most advanced smartphones.
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "p-4 rounded-2xl border transition-all flex items-center gap-2 font-bold",
              isFilterOpen ? "bg-primary text-white border-primary" : "bg-white text-on-surface border-surface-container-high hover:bg-surface-container-low"
            )}
          >
            <Filter size={20} />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all border",
              selectedCategory === category.id
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "bg-white text-on-surface border-surface-container-high hover:bg-surface-container-low"
            )}
          >
            {getCategoryIcon(category.id)}
            {category.name}
          </button>
        ))}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-surface-container-low rounded-4xl p-8 border border-surface-container-high grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h4 className="font-headline font-bold text-lg mb-6">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm font-bold text-on-surface-variant">
                    <span>KSh 0</span>
                    <span>Up to {formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-headline font-bold text-lg mb-6">Sort By</h4>
                <div className="flex flex-wrap gap-2">
                  {['Latest', 'Price: Low to High', 'Price: High to Low', 'Popularity'].map((sort) => (
                    <button key={sort} className="px-4 py-2 bg-white border border-surface-container-high rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-end">
                <button
                  onClick={() => {
                    setPriceRange([0, 300000]);
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-surface-container-low rounded-[40px] border border-dashed border-surface-container-high">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={32} className="text-on-surface-variant" />
          </div>
          <h3 className="font-headline font-bold text-2xl mb-2">No devices found</h3>
          <p className="text-on-surface-variant">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
