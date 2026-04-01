/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface selection:bg-primary selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/devices" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        
        <footer className="bg-surface-container-low border-t border-surface-container-high py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                </div>
                <span className="font-headline font-extrabold text-xl tracking-tight uppercase">
                  DEWTEL <span className="text-primary">MOBILES</span>
                </span>
              </div>
              <p className="text-on-surface-variant max-w-sm mb-8 leading-relaxed">
                A high-end, precision-curated mobile retail gallery featuring the latest in smartphone technology. Experience the future of mobile today.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-surface-container-high hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current opacity-20 rounded-sm" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-headline font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Devices', 'About Us', 'Support', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-headline font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-on-surface-variant font-medium">
                <li>support@dewtel.com</li>
                <li>+1 (555) 000-0000</li>
                <li>123 Tech Avenue, <br />Silicon Valley, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-surface-container-high flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-on-surface-variant font-medium">
              © 2026 Dewtel Mobiles. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-on-surface-variant font-medium">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Cookie Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
