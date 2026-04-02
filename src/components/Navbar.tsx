import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { CATEGORIES } from '../constants';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Smartphones', path: '/devices' },
    { name: 'Laptops', path: '/devices' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Deals', path: '/offers' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3',
        isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-headline font-bold text-2xl tracking-tight text-primary dark:text-cyan-200">Dewtel</span>
          <span className="text-sm font-semibold uppercase text-on-surface-variant dark:text-slate-300">Mobiles</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-surface-container-high bg-white dark:bg-slate-800 text-on-surface dark:text-slate-100 hover:border-primary transition-all"
            >
              Categories <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="absolute left-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-800 border border-surface-container-high shadow-xl p-3 space-y-2"
                >
                  {CATEGORIES.filter((cat) => cat.id !== 'all').map((cat) => (
                    <Link
                      key={cat.id}
                      to={cat.id === 'accessories' ? '/accessories' : '/devices'}
                      className="block px-3 py-2 rounded-xl hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      <span className="mr-2">{cat.icon}</span>{cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-semibold hover:text-primary dark:hover:text-cyan-300 transition-colors',
                  location.pathname === link.path ? 'text-primary dark:text-cyan-300' : 'text-on-surface-variant dark:text-slate-300'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full border border-surface-container-high bg-white dark:bg-slate-800 text-sm w-72 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-full border border-surface-container-high hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="p-2 rounded-full border border-surface-container-high hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all">
            <User size={20} />
          </button>

          <button className="relative p-2 rounded-full border border-surface-container-high hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all">
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          <button
            className="lg:hidden p-2 rounded-full border border-surface-container-high hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-surface-container-high p-5"
          >
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-surface-container-high bg-surface-container-low dark:bg-slate-800 text-sm"
              />
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.filter((cat) => cat.id !== 'all').slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.id === 'accessories' ? '/accessories' : '/devices'}
                    className="text-sm px-3 py-2 rounded-xl bg-surface-container-dark text-on-surface hover:bg-primary hover:text-white transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
