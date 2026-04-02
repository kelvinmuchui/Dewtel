import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, Truck, Smartphone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { cn } from '../lib/utils';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mpesa' | 'card'>('cash');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 5000 ? 0 : 200; // Free delivery over KES 5,000
  const finalTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert(`Order placed successfully! Payment method: ${paymentMethod.toUpperCase()}\nTotal: KES ${finalTotal.toLocaleString()}`);
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-surface-container-low dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Truck size={32} className="text-on-surface-variant" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-on-surface-variant mb-8">Add some products to get started!</p>
            <Link
              to="/devices"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/devices"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-on-surface-variant mt-2">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-surface-container-high shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-on-surface-variant text-sm">{item.product.brand}</p>
                    {(item.selectedColor || item.selectedStorage) && (
                      <div className="flex gap-4 mt-2">
                        {item.selectedColor && (
                          <span className="text-sm text-on-surface-variant">
                            Color: <span className="font-medium">{item.selectedColor}</span>
                          </span>
                        )}
                        {item.selectedStorage && (
                          <span className="text-sm text-on-surface-variant">
                            Storage: <span className="font-medium">{item.selectedStorage}</span>
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-surface-container-high flex items-center justify-center hover:bg-surface-container-low transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-surface-container-high flex items-center justify-center hover:bg-surface-container-low transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">KES {(item.product.price * item.quantity).toLocaleString()}</p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 mt-1"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-surface-container-high shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>KES {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-xs text-green-600">Free delivery on orders over KES 5,000</p>
                )}
                <hr className="border-surface-container-high" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>KES {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-surface-container-high shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-surface-container-high cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                    className="text-primary"
                  />
                  <Truck size={20} />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-on-surface-variant">Pay when you receive your order</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-surface-container-high cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'mpesa')}
                    className="text-primary"
                  />
                  <Smartphone size={20} />
                  <div>
                    <p className="font-medium">M-Pesa</p>
                    <p className="text-sm text-on-surface-variant">Pay using M-Pesa mobile money</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-surface-container-high cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                    className="text-primary"
                  />
                  <CreditCard size={20} />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-on-surface-variant">Visa, Mastercard, or other cards</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-lg transition-all",
                isCheckingOut
                  ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
              )}
            >
              {isCheckingOut ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                `Checkout - KES ${finalTotal.toLocaleString()}`
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};