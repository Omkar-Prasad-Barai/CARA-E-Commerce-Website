import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { allProducts } from '../data/products';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, Heart, AlertCircle } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const { addToCart, clearCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState('L');

  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Generate a pseudo-random stock number based on product id so it stays consistent
  const stockLeft = (product.id.charCodeAt(0) + product.id.charCodeAt(1)) % 15 + 3; 

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
      {/* Single product layout — flex-col on mobile, flex-row on desktop */}
      <section className="section-p1 flex flex-col lg:flex-row mt-[20px] gap-[20px] lg:gap-0">
        <div className="w-full lg:w-[40%] lg:mr-[50px]">
          <img src={mainImage} width="100%" alt={product.name} className="rounded-[8px]" />
          <div className="flex justify-between mt-[10px] gap-[6px]">
            {[product.image, ...allProducts.filter(p => p.id !== product.id).slice(0, 3).map(p => p.image)].map((img, idx) => (
              <div key={idx} className="basis-[24%] cursor-pointer rounded-[6px] overflow-hidden border-2 transition-all duration-200" style={{ borderColor: mainImage === img ? 'var(--color-primary)' : 'transparent' }}>
                <img src={img} width="100%" alt={`Product view ${idx + 1}`} onClick={() => setMainImage(img)} className="block" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[50%] pt-[10px] lg:pt-[30px]">
          <h6 className="text-[13px] sm:text-[15px] font-bold text-text-main">Home / {product.brand}</h6>
          <h4 className="py-[20px] sm:py-[40px] px-0 pb-[15px] sm:pb-[20px] text-[20px] sm:text-[25px] font-semibold text-text-main">{product.name}</h4>
          <h2 className="text-[28px] sm:text-[40px] font-bold text-text-main leading-[36px] sm:leading-[54px] mb-[15px] sm:mb-[20px]">₹{product.price}</h2>

          {stockLeft < 10 && (
            <div className="flex items-center gap-[8px] text-[#d9534f] font-semibold text-[13px] sm:text-[14px] mb-[15px] bg-[rgba(217,83,79,0.1)] p-[10px] rounded-[4px] w-fit">
              <AlertCircle size={18} />
              <span>Hurry! Only {stockLeft} left in stock.</span>
            </div>
          )}

          <div className="my-[15px] sm:my-[20px] mx-0">
            <h5 className="mb-[10px] text-[14px] sm:text-[16px] text-text-main">Select Size</h5>
            <div className="flex gap-[8px] sm:gap-[10px] flex-wrap">
              {sizes.map((size) => (
                <div 
                  key={size}
                  className={`w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] flex justify-center items-center border rounded-[4px] cursor-pointer font-semibold transition-all duration-200 text-[14px] ${selectedSize === size ? 'bg-primary text-white border-primary' : 'border-border-color bg-card-bg text-text-main hover:border-primary'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center mb-[15px] sm:mb-[20px] border border-border-color w-fit rounded-[4px] overflow-hidden">
            <button className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] bg-bg-secondary border-none cursor-pointer text-[18px] font-bold text-text-main transition-colors duration-200 hover:bg-primary-light" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <div className="w-[45px] h-[38px] sm:w-[50px] sm:h-[40px] flex justify-center items-center font-semibold border-x border-border-color bg-card-bg text-text-main">{quantity}</div>
            <button className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] bg-bg-secondary border-none cursor-pointer text-[18px] font-bold text-text-main transition-colors duration-200 hover:bg-primary-light" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div className="flex flex-wrap gap-[10px] sm:gap-[15px] mb-[15px] sm:mb-[20px]">
            <button className="py-[10px] px-[20px] sm:py-[12px] sm:px-[25px] bg-[#ff6347] text-white border-none rounded-[4px] font-semibold cursor-pointer flex items-center gap-[8px] transition-opacity duration-200 hover:opacity-90 text-[14px]" onClick={handleAddToCart}>
              <ShoppingCart size={18} /> Add To Cart
            </button>
            <button className="py-[10px] px-[20px] sm:py-[12px] sm:px-[25px] bg-primary text-white border-none rounded-[4px] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-90 text-[14px]" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button 
              className={`w-[42px] h-[42px] sm:w-[44px] sm:h-[44px] flex justify-center items-center border rounded-[4px] cursor-pointer transition-all duration-200 ${isWishlisted ? 'bg-[#fddde4] text-[#ef3636] border-[#ef3636]' : 'border-border-color bg-card-bg text-text-main hover:bg-bg-secondary hover:text-[#ef3636] hover:border-[#ef3636]'}`} 
              onClick={handleToggleWishlist}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={20} fill={isWishlisted ? "#ef3636" : "none"} />
            </button>
          </div>

          <h4 className="text-[18px] sm:text-[20px] font-semibold text-text-main mt-[15px] sm:mt-[20px] mb-[10px]">Product Details</h4>
          <span className="text-text-p text-[13px] sm:text-[15px] leading-[1.6]">The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Features include a seamless double-needle 7/8" collar, taped neck and shoulders, and double-needle sleeve and bottom hems.</span>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-p1 text-center">
        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold tracking-[-0.5px]">Related Products</h2>
        <p className="text-text-light text-[13px] sm:text-[15px]">Summer Collection New Modern Design</p>
        <div className="pro-container">
          {allProducts.slice(0, 4).map((p) => (
            <ProductCard key={`related-${p.id}`} product={p} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default ProductDetails;
