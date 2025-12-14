import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { allProducts } from '../data/products';

const PRODUCTS_PER_PAGE = 8;

const Shop: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = allProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Shop header banner */}
      <section className="bg-[url('/images/banner/b1.jpg')] w-full h-[30vh] sm:h-[40vh] bg-cover flex justify-center items-center text-center flex-col p-[14px]">
        <h2 className="text-white text-[32px] sm:text-[46px] font-bold leading-[42px] sm:leading-[54px]">#stayhome</h2>
        <p className="text-white text-[13px] sm:text-[16px] mt-[15px] leading-[1.65]">Save more with coupons &amp; up to 70% off!</p>
      </section>

      {/* Product grid */}
      <section className="section-p1 text-center">
        <div className="pro-container">
          {visibleProducts.map((product) => (
            <ProductCard key={`shop-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="section-p1 text-center flex justify-center gap-[8px] sm:gap-[10px] flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="no-underline bg-bg-secondary py-[10px] px-[14px] sm:py-[12px] sm:px-[16px] rounded-[4px] text-text-main font-semibold cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-border-color"
            aria-label="Previous page"
          >
            <i className="fa-solid fa-arrow-left text-[14px]"></i>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`no-underline py-[10px] px-[16px] sm:py-[12px] sm:px-[18px] rounded-[4px] font-semibold cursor-pointer transition-all duration-200 border ${
                currentPage === page
                  ? 'bg-primary text-white border-primary'
                  : 'bg-bg-secondary text-text-main border-border-color hover:bg-primary hover:text-white hover:border-primary'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="no-underline bg-bg-secondary py-[10px] px-[14px] sm:py-[12px] sm:px-[16px] rounded-[4px] text-text-main font-semibold cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-border-color"
            aria-label="Next page"
          >
            <i className="fa-solid fa-arrow-right text-[14px]"></i>
          </button>
        </section>
      )}

      <Newsletter />
    </>
  );
};

export default Shop;
