import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, discount, applyDiscount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const subtotal = (cart || []).length > 0 ? getCartTotal() : 0;
  const discountAmount = Math.round((subtotal * discount) / 100);
  const totalAfterDiscount = subtotal - discountAmount;
  const deliveryFee = (cart || []).length > 0 ? (totalAfterDiscount > 0 ? 40 : 0) : 0;
  const total = totalAfterDiscount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode === 'CARA10') {
      applyDiscount(10);
      setPromoStatus('success');
    } else {
      applyDiscount(0);
      setPromoStatus('error');
    }
  };

  const handlePlaceOrder = () => {
    // Validate billing fields
    const fields = ['fullName', 'phone', 'email', 'address', 'city', 'state', 'pin'];
    const form = document.getElementById('checkout-form') as HTMLFormElement;
    if (form) {
      for (const fieldName of fields) {
        const input = form.elements.namedItem(fieldName) as HTMLInputElement;
        if (input && !input.value.trim()) {
          setFormError('Please fill in all billing details before placing your order.');
          input.focus();
          return;
        }
      }
    }
    setFormError('');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      const orderId = `#CARA-IND-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderData = {
        orderId,
        creationDate: new Date().toISOString(),
        itemMetadata: (cart || []),
        financialTotal: total,
        currentStatus: "Order Placed"
      };

      const existingOrders = JSON.parse(localStorage.getItem('cara_orders') || '[]');
      localStorage.setItem('cara_orders', JSON.stringify([...existingOrders, orderData]));
      
      sessionStorage.setItem('lastOrderId', orderId);
      setGeneratedOrderId(orderId);
      
      clearCart();
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0eefb] to-white dark:bg-bg-secondary dark:from-bg-secondary dark:to-bg-secondary py-12 px-4 flex items-center justify-center font-sans">
        <div className="bg-white/70 dark:bg-card-bg/50 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-10 max-w-lg w-full text-center border border-white/40 dark:border-border-color animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#f0eefb] text-primary dark:bg-primary/20 dark:text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <i className="fa-solid fa-check text-4xl"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-text-main mb-4">Congratulations! 🎉</h1>
          <p className="text-lg text-text-p mb-6">Your order has been successfully placed. Thank you for shopping with CARA!</p>
          <div className="bg-bg-secondary dark:bg-bg-color rounded-xl py-3 px-6 inline-block mb-10 border border-border-color shadow-sm">
            <p className="text-sm font-semibold text-text-main tracking-wide">Order ID: {generatedOrderId}</p>
          </div>
          <button 
            onClick={() => navigate('/track-order')}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold tracking-wide transition-all duration-300 hover:bg-[#066b63] shadow-[0_4px_14px_rgba(8,129,120,0.3)] hover:shadow-[0_6px_20px_rgba(8,129,120,0.4)]"
          >
            Track My Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0eefb] to-white dark:bg-bg-secondary dark:from-bg-secondary dark:to-bg-secondary py-12 px-4 sm:px-6 lg:px-8 font-sans text-text-main transition-colors duration-400">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Column 1: Billing & Shipping Details */}
          <div className="w-full lg:w-[60%] bg-white/70 dark:bg-card-bg/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/40 dark:border-border-color">
            <h2 className="text-2xl font-semibold mb-8 text-text-main border-b border-border-color pb-4">Billing & Shipping Details</h2>
            
            <form id="checkout-form" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="checkout-fullName" className="block text-sm font-medium text-text-p mb-2">Full Name <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-fullName" name="fullName" type="text" required placeholder="e.g. Aarav Sharma" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="block text-sm font-medium text-text-p mb-2">Phone Number <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-phone" name="phone" type="tel" required placeholder="+91 98765-43210" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="block text-sm font-medium text-text-p mb-2">Email Address <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-email" name="email" type="email" required placeholder="aarav.sharma@example.com" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="checkout-address" className="block text-sm font-medium text-text-p mb-2">Street Address <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-address" name="address" type="text" required placeholder="Enter your full street address" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="checkout-city" className="block text-sm font-medium text-text-p mb-2">City/Town <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-city" name="city" type="text" required placeholder="Enter your city (e.g., Sambalpur)" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="checkout-state" className="block text-sm font-medium text-text-p mb-2">State <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-state" name="state" type="text" required placeholder="e.g. Odisha" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="checkout-pin" className="block text-sm font-medium text-text-p mb-2">PIN Code <span className="text-[#ef3636]">*</span></label>
                  <input id="checkout-pin" name="pin" type="text" required pattern="[0-9]{6}" placeholder="e.g. 768016" className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="checkout-country" className="block text-sm font-medium text-text-p mb-2">Country</label>
                  <input id="checkout-country" type="text" defaultValue="India" disabled className="w-full px-4 py-3 rounded-lg border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main opacity-70 cursor-not-allowed" />
                </div>
              </div>
              {formError && (
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#ef3636] bg-[rgba(239,54,54,0.08)] px-4 py-3 rounded-lg border border-[rgba(239,54,54,0.2)]">
                  <i className="fa-solid fa-circle-xmark"></i> {formError}
                </div>
              )}
            </form>
          </div>

          {/* Column 2: Order Summary & Payment Gateway */}
          <div className="w-full lg:w-[40%] sticky top-24">
            <div className="bg-white/70 dark:bg-card-bg/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/40 dark:border-border-color flex flex-col min-h-[500px]">
              <h2 className="text-2xl font-semibold mb-6 text-text-main border-b border-border-color pb-4">Your Order</h2>
              
              <div className="flex flex-col gap-5 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {(!cart || cart.length === 0) ? (
                  <div className="text-center text-text-p py-4">Your cart is empty.</div>
                ) : (
                  (cart || []).map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-sm border border-border-color" />
                        <div>
                          <p className="text-sm font-semibold text-text-main line-clamp-1">{item.name}</p>
                          <p className="text-xs text-text-p mt-1">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-text-main whitespace-nowrap ml-2">₹{item.price * item.quantity}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Engine */}
              <div className="mb-8 border border-border-color rounded-xl p-4 bg-white/40 dark:bg-bg-color/40 shadow-sm">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoStatus('idle');
                    }}
                    placeholder="Enter promo code (e.g. CARA10)" 
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border-color bg-white dark:bg-bg-secondary text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-sm font-medium uppercase placeholder:normal-case placeholder:font-normal"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="bg-text-main text-bg-color border-none py-2.5 px-6 rounded-lg font-semibold text-sm transition-opacity duration-300 hover:opacity-90 shadow-md whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoStatus === 'success' && (
                  <p className="text-[13px] font-medium text-green-600 dark:text-green-400 mt-3 flex items-center gap-1.5 bg-green-500/10 w-fit px-3 py-1 rounded-md">
                    <i className="fa-solid fa-circle-check"></i> Coupon applied successfully!
                  </p>
                )}
                {promoStatus === 'error' && (
                  <p className="text-[13px] font-medium text-red-500 mt-3 flex items-center gap-1.5 bg-red-500/10 w-fit px-3 py-1 rounded-md">
                    <i className="fa-solid fa-circle-xmark"></i> Invalid or expired promo code.
                  </p>
                )}
              </div>

              {/* Financial Ledger */}
              <div className="border-t border-border-color pt-5 mb-8 space-y-4">
                <div className="flex justify-between text-sm text-text-p">
                  <span>Subtotal</span>
                  <span className="text-text-main font-medium">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Discount (10%)</span>
                    <span className="font-medium">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between items-start text-sm text-text-p">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span>Secure Express Shipping</span>
                      <span className="bg-[#e6f4f3] text-primary dark:bg-primary/20 dark:text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Fast</span>
                    </div>
                    <p className="text-[11px] text-text-p font-medium">Guaranteed Delivery by: {formattedDate}</p>
                  </div>
                  <span className="text-text-main font-medium mt-1">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-lg pt-4 border-t border-border-color mt-2">
                  <span className="font-semibold text-text-main">Total Amount to Pay</span>
                  <span className="font-bold text-primary text-xl">₹{total}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-md font-semibold text-text-main mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: 'fa-solid fa-mobile-screen-button' },
                    { id: 'card', label: 'Credit / Debit Card', icon: 'fa-regular fa-credit-card' },
                    { id: 'netbanking', label: 'Net Banking', icon: 'fa-solid fa-building-columns' },
                    { id: 'cod', label: 'Cash on Delivery (COD)', icon: 'fa-solid fa-money-bill-wave' }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 border bg-white/40 dark:bg-bg-color/40 ${paymentMethod === method.id ? 'border-primary shadow-[0_0_12px_rgba(8,129,120,0.15)] bg-primary/5 dark:bg-primary/10' : 'border-border-color hover:border-primary/50'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${paymentMethod === method.id ? 'border-primary' : 'border-text-light'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_5px_rgba(8,129,120,0.5)]"></div>}
                      </div>
                      <i className={`${method.icon} text-lg ${paymentMethod === method.id ? 'text-primary' : 'text-text-p'}`}></i>
                      <span className={`text-sm font-medium ${paymentMethod === method.id ? 'text-text-main' : 'text-text-p'}`}>{method.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Call-To-Action */}
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-[#ff6347] text-white border-none py-[14px] px-[20px] cursor-pointer rounded-[4px] font-semibold mt-auto text-[13px] tracking-[0.5px] transition-all duration-300 hover:opacity-90 shadow-[0_4px_14px_rgba(255,99,71,0.3)] hover:shadow-[0_6px_20px_rgba(255,99,71,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Processing...
                  </>
                ) : (
                  `PLACE ORDER (₹${total})`
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
