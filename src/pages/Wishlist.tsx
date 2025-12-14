import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/about/banner.png')] bg-cover h-[20vh] w-full">
        <h2 className="text-white text-[46px] font-bold leading-[54px]">#mywishlist</h2>
        <p className="text-white text-[16px] mt-[15px] leading-[1.65]">Your favorite items saved for later.</p>
      </section>

      <section className="section-p1 min-h-[50vh]">
        {wishlist.length === 0 ? (
          <div className="text-center py-[50px] px-[20px]">
            <h3 className="text-text-p mb-[20px]">Your wishlist is currently empty.</h3>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-[#088178] text-white py-[12px] px-[25px] rounded-[4px] border-none cursor-pointer font-semibold transition-opacity hover:opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="pro-container !justify-start gap-[25px]">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Wishlist;
