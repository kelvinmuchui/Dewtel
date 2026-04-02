/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminOrders } from './pages/AdminOrders';
import { AdminProducts } from './pages/AdminProducts';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSettings } from './pages/AdminSettings';
import { Footer } from './components/Footer';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <CartProvider>
      <Router>
        <div className={`min-h-screen selection:bg-primary selection:text-white ${darkMode ? 'bg-slate-950 text-gray-100' : 'bg-surface text-on-surface'}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/devices" element={
              <>
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
                <ProductListPage />
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
                <ProductDetailPage />
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
                <CartPage />
                <Footer />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={
              <>
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
                <HomePage />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
