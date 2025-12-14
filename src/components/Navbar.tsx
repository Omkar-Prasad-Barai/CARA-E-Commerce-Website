import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sun, Moon, User, Heart, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { isLoggedIn } = useAuth();

  const hasTracking = localStorage.getItem('cara_current_track_step') !== null;
  const hasOrders = JSON.parse(localStorage.getItem('cara_orders') || '[]').length > 0;

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const isActivePath = (path: string) =>
    location.pathname === path ? 'active text-primary font-semibold' : 'text-nav-text';

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeMobileMenu]);

  return (
    <>
      <nav className="flex items-center justify-between py-[16px] px-[15px] sm:px-[40px] lg:px-[80px] bg-header-bg backdrop-blur-[20px] shadow-[0_1px_0_var(--color-border-color),0_4px_20px_rgba(0,0,0,0.05)] z-30 sticky top-0 left-0 transition-colors duration-400">
        <Link to="/" onClick={closeMobileMenu}>
          <img src="/images/logo.png" className="h-[36px] sm:h-[45px] w-auto" alt="CARA - Back to homepage" />
        </Link>

        <ul className="hidden lg:flex items-center justify-center gap-[4px] m-0 p-0 list-none">
          {navLinks.map(({ to, label }) => (
            <li key={to} className="p-[0_4px] relative">
              <Link
                to={to}
                className={`text-[15px] font-medium transition-colors duration-300 py-[8px] px-[14px] rounded-[8px] block tracking-[0.1px] hover:text-nav-hover hover:bg-primary-light ${isActivePath(to)}`}
              >
                {label}
              </Link>
            </li>
          ))}
          {isLoggedIn && (hasOrders || hasTracking) && (
            <li className="p-[0_4px] relative">
              <Link
                to="/track-order"
                className={`text-[15px] font-medium transition-colors duration-300 py-[8px] px-[14px] rounded-[8px] block tracking-[0.1px] hover:text-nav-hover hover:bg-primary-light ${isActivePath('/track-order')}`}
              >
                Orders
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-[4px] sm:gap-[6px]">
          <Link
            to="/auth"
            title="Sign In / Register"
            className={`${location.pathname === '/auth' ? 'text-primary' : 'text-nav-text'}`}
          >
            <div className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[8px] flex items-center justify-center text-nav-text transition-all duration-300 cursor-pointer hover:bg-primary-light hover:text-primary hover:-translate-y-[2px] ${location.pathname === '/auth' ? 'bg-primary-light !text-primary' : ''}`}>
              <User size={19} />
            </div>
          </Link>

          <Link
            to="/wishlist"
            title="My Wishlist"
            className={`${location.pathname === '/wishlist' ? 'text-primary' : 'text-nav-text'}`}
          >
            <div className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[8px] flex items-center justify-center text-nav-text transition-all duration-300 cursor-pointer relative hover:bg-primary-light hover:text-primary hover:-translate-y-[2px] ${location.pathname === '/wishlist' ? 'bg-primary-light !text-primary' : ''}`}>
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute top-[-8px] right-[-12px] bg-badge-red text-white rounded-full py-[2px] px-[6px] text-[10px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>

          {isLoggedIn && (hasOrders || hasTracking) && (
            <Link
              to="/track-order"
              title="My Orders"
              className={`${location.pathname === '/track-order' ? 'text-primary' : 'text-nav-text'}`}
            >
              <div className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[8px] flex items-center justify-center text-nav-text transition-all duration-300 cursor-pointer relative hover:bg-primary-light hover:text-primary hover:-translate-y-[2px] ${location.pathname === '/track-order' ? 'bg-primary-light !text-primary' : ''}`}>
                <i className="fa-solid fa-box-open text-[16px] sm:text-[18px]"></i>
              </div>
            </Link>
          )}

          <Link
            to="/cart"
            title="View Cart"
            className={`${location.pathname === '/cart' ? 'text-primary' : 'text-nav-text'}`}
          >
            <div className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[8px] flex items-center justify-center text-nav-text transition-all duration-300 cursor-pointer relative hover:bg-primary-light hover:text-primary hover:-translate-y-[2px] ${location.pathname === '/cart' ? 'bg-primary-light !text-primary' : ''}`}>
              <i className="fa-solid fa-bag-shopping text-[18px] sm:text-[20px]"></i>
              {cartItemsCount > 0 && (
                <span className="absolute top-[-8px] right-[-12px] bg-badge-red text-white rounded-full py-[2px] px-[6px] text-[10px] font-bold">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </Link>

          <button
            onClick={toggleTheme}
            className="cursor-pointer text-nav-text bg-none border-none flex justify-center items-center p-[6px] sm:p-[8px] rounded-[8px] transition-colors duration-300 hover:text-primary hover:bg-primary-light"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            className="hidden max-lg:flex items-center justify-center cursor-pointer text-nav-text ml-[6px] sm:ml-[10px] bg-transparent border-none p-[4px]"
            onClick={openMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden pointer-events-auto"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-3/4 max-w-[300px] z-50 shadow-2xl bg-card-bg flex flex-col overflow-y-auto lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between p-6 pb-2">
                <img src="/images/logo.png" className="h-[28px] w-auto opacity-50" alt="" aria-hidden="true" />
                <button
                  onClick={closeMobileMenu}
                  className="w-[40px] h-[40px] rounded-full bg-bg-secondary text-text-main flex items-center justify-center cursor-pointer border-none transition-colors duration-200 hover:bg-primary-light hover:text-primary"
                  aria-label="Close navigation menu"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="mx-6 my-2 h-px bg-border-color" />

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6 p-8 flex-1 m-0 list-none"
              >
                {navLinks.map(({ to, label }) => (
                  <motion.li key={to} variants={itemVariants}>
                    <Link
                      to={to}
                      onClick={closeMobileMenu}
                      className={`text-lg font-medium tracking-[0.2px] transition-colors duration-200 no-underline block ${
                        location.pathname === to
                          ? 'text-primary font-semibold'
                          : 'text-text-main hover:text-primary'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
                {isLoggedIn && (hasOrders || hasTracking) && (
                  <motion.li variants={itemVariants}>
                    <Link
                      to="/track-order"
                      onClick={closeMobileMenu}
                      className={`text-lg font-medium tracking-[0.2px] transition-colors duration-200 no-underline block ${
                        location.pathname === '/track-order'
                          ? 'text-primary font-semibold'
                          : 'text-text-main hover:text-primary'
                      }`}
                    >
                      My Orders
                    </Link>
                  </motion.li>
                )}
              </motion.ul>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="show"
                className="px-6 py-5 mt-auto border-t border-border-color"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Link
                    to="/auth"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-[15px] font-medium py-[10px] px-[12px] rounded-[10px] flex-1 transition-colors duration-200 no-underline bg-bg-secondary text-text-main hover:bg-primary-light hover:text-primary"
                  >
                    <User size={18} />
                    Account
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-[15px] font-medium py-[10px] px-[12px] rounded-[10px] flex-1 transition-colors duration-200 no-underline bg-bg-secondary text-text-main hover:bg-primary-light hover:text-primary"
                  >
                    <Heart size={18} />
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="bg-badge-red text-white rounded-full py-[1px] px-[6px] text-[10px] font-bold ml-auto">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </div>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-[10px] rounded-[10px] text-[14px] font-medium cursor-pointer border-none bg-bg-secondary text-text-main transition-colors duration-200 hover:bg-primary-light hover:text-primary"
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
