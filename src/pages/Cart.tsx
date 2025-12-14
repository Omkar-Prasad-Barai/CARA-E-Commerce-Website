import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'register'>('signin');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="py-[20px] px-[15px] sm:py-[30px] sm:px-[40px] lg:py-[40px] lg:px-[80px] font-sans text-text-main">
      <div className="w-full mb-[30px] sm:mb-[60px] overflow-x-auto">
        <table className="w-full border-collapse text-left min-w-[500px] sm:min-w-[600px]">
          <thead>
            <tr>
              <th className="pb-[15px] font-normal text-text-p border-b border-border-color text-[13px] sm:text-[15px]">Items</th>
              <th className="pb-[15px] font-normal text-text-p border-b border-border-color text-[13px] sm:text-[15px]">Title</th>
              <th className="pb-[15px] font-normal text-text-p border-b border-border-color text-[13px] sm:text-[15px]">Price</th>
              <th className="pb-[15px] font-normal text-text-p border-b border-border-color text-[13px] sm:text-[15px]">Quantity</th>
              <th className="pb-[15px] font-normal text-text-p border-b border-border-color text-[13px] sm:text-[15px]">Total</th>
              <th className="pb-[15px] font-normal text-text-p border-b border-border-color text-[13px] sm:text-[15px]">Remove</th>
            </tr>
          </thead>
          <tbody>
            {(!cart || cart.length === 0) ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '30px' }}>
                  Your cart is empty
                </td>
              </tr>
            ) : (
              (cart || []).map((item) => (
                <tr key={item.id}>
                  <td className="py-[10px] sm:py-[15px] px-0 align-middle border-b border-border-color text-text-main font-semibold text-[13px] sm:text-[15px]">
                    <img src={item.image} alt={item.name} className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] object-cover rounded-[4px]" />
                  </td>
                  <td className="py-[10px] sm:py-[15px] px-0 align-middle border-b border-border-color text-text-main font-semibold text-[13px] sm:text-[15px]">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-[10px] sm:py-[15px] px-0 align-middle border-b border-border-color text-text-main font-semibold text-[13px] sm:text-[15px]">
                    ₹{item.price}
                  </td>
                  <td className="py-[10px] sm:py-[15px] px-0 align-middle border-b border-border-color text-text-main font-semibold text-[13px] sm:text-[15px]">
                    <input
                      type="number"
                      className="w-[35px] sm:w-[40px] border-none bg-transparent font-inherit text-[13px] sm:text-[15px] font-semibold text-text-main outline-none"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      min="1"
                    />
                  </td>
                  <td className="py-[10px] sm:py-[15px] px-0 align-middle border-b border-border-color text-text-main font-semibold text-[13px] sm:text-[15px]">
                    ₹{item.price * item.quantity}
                  </td>
                  <td className="py-[10px] sm:py-[15px] px-0 align-middle border-b border-border-color text-text-main font-semibold text-[13px] sm:text-[15px]">
                    <button className="bg-transparent border-none cursor-pointer text-[14px] sm:text-[16px] text-text-main font-semibold" onClick={() => removeFromCart(item.id)}>x</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cart totals + promo — flex-col on mobile */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-[25px] sm:gap-[50px] w-full break-words">
        <div className="flex-1 flex flex-col w-full">
          <h2 className="text-[20px] sm:text-[24px] mb-[15px] sm:mb-[20px] font-bold text-text-main">Cart Totals</h2>
          <div className="flex justify-between mb-[12px] sm:mb-[15px] text-[13px] sm:text-[15px] text-text-p font-medium gap-[10px]">
            <span className="min-w-max">Subtotal</span>
            <span className="text-text-main break-words">₹{subtotal || 0}</span>
          </div>
          <div className="flex justify-between mb-[12px] sm:mb-[15px] text-[13px] sm:text-[15px] text-text-p font-medium gap-[10px]">
            <span className="min-w-max">Delivery Fee</span>
            <span className="text-text-main break-words">₹{deliveryFee}</span>
          </div>
          <hr className="border-none border-t border-border-color my-[12px] sm:my-[15px]" />
          <div className="flex justify-between mb-[12px] sm:mb-[15px] text-[13px] sm:text-[15px] text-text-p font-medium gap-[10px]">
            <span className="min-w-max">Total</span>
            <span className="text-text-main font-bold break-words">₹{total || 0}</span>
          </div>
          <button onClick={() => {
            if (!isLoggedIn) {
              setShowAuthModal(true);
            } else {
              navigate('/checkout');
            }
          }} className="bg-[#ff6347] text-white border-none py-[12px] px-[18px] sm:py-[14px] sm:px-[20px] cursor-pointer rounded-[4px] font-semibold mt-[15px] w-fit text-[12px] sm:text-[13px] tracking-[0.5px] transition-opacity duration-200 hover:opacity-90 min-w-max whitespace-nowrap">PROCEED TO CHECKOUT</button>
        </div>

        <div className="flex-1 w-full">
          <p className="text-text-p mb-[12px] sm:mb-[15px] text-[13px] sm:text-[15px] font-medium">If you have a promo code, Enter it here</p>
          <div className="flex items-center">
            <input className="bg-bg-secondary border border-border-color text-text-main py-[12px] px-[15px] sm:py-[14px] sm:px-[20px] flex-1 outline-none rounded-l-[4px] text-[13px] sm:text-[14px]" type="text" placeholder="promo code" />
            <button className="bg-text-main text-bg-color border-none py-[12px] px-[20px] sm:py-[14px] sm:px-[30px] cursor-pointer font-semibold rounded-r-[4px] text-[13px] sm:text-[14px] hover:opacity-85">Submit</button>
          </div>
        </div>
      </div>

      {/* Multi-Tab Auth Modal Overlay */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 transition-all">
          <div className="bg-white/80 dark:bg-card-bg/90 backdrop-blur-xl border border-white/40 dark:border-border-color rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-300">
            <div className="flex border-b border-border-color mb-4 sm:mb-6 relative">
              <button 
                onClick={() => {
                  setAuthTab('signin');
                  setAuthError('');
                }}
                className={`flex-1 pb-3 text-center font-semibold text-[14px] sm:text-[15px] transition-colors ${authTab === 'signin' ? 'text-primary' : 'text-text-p hover:text-text-main'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  setAuthTab('register');
                  setAuthError('');
                }}
                className={`flex-1 pb-3 text-center font-semibold text-[14px] sm:text-[15px] transition-colors ${authTab === 'register' ? 'text-primary' : 'text-text-p hover:text-text-main'}`}
              >
                Register
              </button>
              <div 
                className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out w-1/2 ${authTab === 'signin' ? 'left-0' : 'left-1/2'}`}
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-2">
              {authTab === 'signin' ? 'Welcome Back' : 'Join the Cara Community'}
            </h2>
            <p className="text-text-p mb-4 sm:mb-6 text-[13px] sm:text-[14px]">
              {authTab === 'signin' ? 'Sign in to securely complete your checkout.' : 'Register to save your details for faster checkout.'}
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setAuthError('');
              setIsAuthLoading(true);

              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;

              setTimeout(() => {
                setIsAuthLoading(false);

                if (authTab === 'register') {
                  const name = formData.get('name') as string;
                  const phone = formData.get('phone') as string;
                  const userProfile = { name, email, phone, password };
                  localStorage.setItem('cara_registered_user', JSON.stringify(userProfile));
                  login();
                  setShowAuthModal(false);
                  navigate('/checkout');
                } else {
                  const storedUser = localStorage.getItem('cara_registered_user');
                  if (storedUser) {
                    const user = JSON.parse(storedUser);
                    if (user.email === email && user.password === password) {
                      login();
                      setShowAuthModal(false);
                      navigate('/checkout');
                    } else {
                      setAuthError('Invalid email or password.');
                    }
                  } else {
                    setAuthError('No account found. Please register first.');
                  }
                }
              }, 1000);
            }} className="space-y-4 mb-4 sm:mb-6">
              
              {authTab === 'register' && (
                <input required name="name" type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm text-[14px]" />
              )}
              
              <input required name="email" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm text-[14px]" />
              
              {authTab === 'register' && (
                <input required name="phone" type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm text-[14px]" />
              )}

              <input required name="password" type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-border-color bg-white/50 dark:bg-bg-color/50 text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm text-[14px]" />

              {authError && (
                <p className="text-[12px] sm:text-[13px] font-medium text-red-500 mt-2 flex items-center gap-1.5 bg-red-500/10 w-fit px-3 py-1 rounded-md">
                  <i className="fa-solid fa-circle-xmark"></i> {authError}
                </p>
              )}

              <button 
                type="submit"
                disabled={isAuthLoading}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 hover:bg-[#066b63] shadow-[0_4px_14px_rgba(8,129,120,0.3)] hover:shadow-[0_6px_20px_rgba(8,129,120,0.4)] disabled:opacity-70 flex justify-center items-center gap-2 mt-2 text-[14px]"
              >
                {isAuthLoading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Authenticating...</>
                ) : (
                  authTab === 'signin' ? 'Continue to Checkout' : 'Create Account & Checkout'
                )}
              </button>
            </form>

            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-border-color/30 text-text-p hover:text-text-main hover:bg-border-color transition-colors text-xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
