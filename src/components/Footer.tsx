import React from 'react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { icon: 'fab fa-facebook-f', href: 'https://facebook.com', label: 'Follow us on Facebook' },
  { icon: 'fab fa-twitter', href: 'https://twitter.com', label: 'Follow us on Twitter' },
  { icon: 'fab fa-instagram', href: 'https://instagram.com', label: 'Follow us on Instagram' },
  { icon: 'fab fa-pinterest-p', href: 'https://pinterest.com', label: 'Follow us on Pinterest' },
  { icon: 'fab fa-youtube', href: 'https://youtube.com', label: 'Subscribe on YouTube' },
];

const Footer: React.FC = () => {
  return (
    <footer className="section-p1 flex flex-col sm:flex-row flex-wrap justify-between bg-bg-secondary border-t border-border-color gap-[10px] sm:gap-[20px]">
      <div className="flex flex-col items-start mb-[20px] w-full sm:w-auto">
        <img className="mb-[20px] sm:mb-[30px] h-[36px] sm:h-[45px] w-auto" src="/images/logo.png" alt="CARA logo" />
        <h4 className="text-[14px] sm:text-[16px] pb-[15px] sm:pb-[20px] font-bold uppercase tracking-[1px] text-text-main">Contact</h4>
        <p className="text-[13px] sm:text-[15px] m-[0_0_8px_0] text-text-p">
          <strong>Address: </strong>Hirakud, Sambalpur, Odisha, India
        </p>
        <p className="text-[13px] sm:text-[15px] m-[0_0_8px_0] text-text-p">
          <strong>Phone: </strong>
          <a href="tel:+918926046058" className="text-text-p hover:text-primary transition-colors">
            +91 8926046058
          </a>
        </p>
        <p className="text-[13px] sm:text-[15px] m-[0_0_8px_0] text-text-p">
          <strong>Hours: </strong>10:00 AM – 6:00 PM, Mon–Sat
        </p>
        <div className="mt-[15px] sm:mt-[20px]">
          <h4 className="text-[14px] sm:text-[16px] pb-[15px] sm:pb-[20px] font-bold uppercase tracking-[1px] text-text-main">Follow Us</h4>
          <div className="flex gap-[12px]">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-p hover:text-primary transition-colors duration-300 text-[18px] sm:text-[20px]"
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mb-[20px]">
        <h4 className="text-[14px] sm:text-[16px] pb-[15px] sm:pb-[20px] font-bold uppercase tracking-[1px] text-text-main">About</h4>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/about">About Us</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/delivery">Delivery Information</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/privacy">Privacy Policy</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/terms">Terms &amp; Conditions</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/contact">Contact Us</Link>
      </div>

      <div className="flex flex-col items-start mb-[20px]">
        <h4 className="text-[14px] sm:text-[16px] pb-[15px] sm:pb-[20px] font-bold uppercase tracking-[1px] text-text-main">My Account</h4>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/auth">Sign In / Register</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/cart">View Cart</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/wishlist">My Wishlist</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/track-order">Track My Order</Link>
        <Link className="text-[13px] sm:text-[15px] text-text-p mb-[8px] sm:mb-[10px] transition-all duration-300 hover:text-primary hover:translate-x-[4px]" to="/help">Help</Link>
      </div>

      <div className="flex flex-col items-start mb-[20px]">
        <h4 className="text-[14px] sm:text-[16px] pb-[15px] sm:pb-[20px] font-bold uppercase tracking-[1px] text-text-main">Install App</h4>
        <p className="text-[13px] sm:text-[15px] m-[0_0_8px_0] text-text-p">From App Store or Google Play</p>
        <div className="flex gap-[10px] mb-[15px] mt-[10px]">
          <img className="border border-primary rounded-[6px]" src="/images/pay/app.jpg" alt="Download on the App Store" loading="lazy" />
          <img className="border border-primary rounded-[6px]" src="/images/pay/play.jpg" alt="Get it on Google Play" loading="lazy" />
        </div>
        <p className="text-[13px] sm:text-[15px] m-[0_0_8px_0] text-text-p">Secured Payment Gateways</p>
        <img className="my-[10px] mx-0" src="/images/pay/pay.png" alt="Accepted payment methods" loading="lazy" />
      </div>

      <div className="w-full text-center p-[15px] sm:p-[20px] text-[12px] sm:text-[14px] text-text-light border-t border-border-color">
        <p className="!m-0">&copy; {new Date().getFullYear()} CARA E-Commerce. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
