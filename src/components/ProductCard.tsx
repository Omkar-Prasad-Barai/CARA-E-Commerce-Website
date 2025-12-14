import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const cartItem = cart.find(item => item.id === product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1);
      } else {
        removeFromCart(product.id);
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div className="pro relative" variants={cardVariants} whileHover={{ y: -10 }}>
      <button 
        onClick={handleToggleWishlist}
        className={`absolute top-[15px] right-[15px] bg-card-bg border border-border-color rounded-full w-[35px] h-[35px] flex items-center justify-center cursor-pointer z-10 shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-110 ${isWishlisted ? 'text-[#ef3636]' : 'text-text-p'}`}
      >
        <Heart size={18} fill={isWishlisted ? "#ef3636" : "none"} />
      </button>
      <Link to={`/product/${product.id}`} className="no-underline text-inherit block">
        <img src={product.image} alt={product.name} />
        <div className="des">
          <span>{product.brand}</span>
          <h5>{product.name}</h5>
          <div className="star">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <h4>₹{product.price}</h4>
        </div>
      </Link>
      <div className="flex gap-[8px] mt-[14px]">
        {cartItem ? (
          <div className="flex-1 flex items-center justify-between bg-gradient-to-br from-[#ff6b4a] to-[#ff4422] text-white rounded-[50px] px-[14px] py-[8px] shadow-[0_4px_14px_rgba(255,100,70,0.35)]">
            <button 
              onClick={handleDecrement}
              className="bg-none border-none text-white text-[18px] cursor-pointer px-[4px] font-bold leading-[1]"
            >−</button>
            <span className="font-bold text-[15px] min-w-[20px] text-center">{cartItem.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="bg-none border-none text-white text-[18px] cursor-pointer px-[4px] font-bold leading-[1]"
            >+</button>
          </div>
        ) : (
          <button 
            onClick={handleAddToCart}
            className="flex-1 p-[10px_8px] bg-gradient-to-br from-[#ff6b4a] to-[#ff4422] text-white border-none rounded-[50px] cursor-pointer flex items-center justify-center gap-[5px] font-semibold text-[13px] tracking-[0.3px] transition-all duration-300 shadow-[0_4px_14px_rgba(255,100,70,0.35)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(255,100,70,0.45)]"
          >
            <ShoppingCart size={14} /> Add
          </button>
        )}
        <button 
          onClick={(e) => {
            e.preventDefault();
            clearCart();
            addToCart(product, 1);
            navigate('/checkout');
          }}
          className="flex-1 p-[10px_8px] bg-gradient-to-br from-[#0a9e94] to-[#088178] text-white border-none rounded-[50px] cursor-pointer font-semibold text-[13px] tracking-[0.3px] transition-all duration-300 shadow-[0_4px_14px_rgba(8,129,120,0.3)] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(8,129,120,0.45)]"
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
