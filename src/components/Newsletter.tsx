import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="section-p1 section-m1 flex flex-col sm:flex-row justify-between flex-wrap items-start sm:items-center bg-[url('/images/banner/b14.png')] bg-no-repeat bg-[20%_30%] bg-newsletter-bg gap-[20px]">
      <div className="newstext">
        <h4 className="text-[22px] sm:text-[28px] lg:text-[33px] font-bold text-white leading-snug">Sign Up For Newsletters</h4>
        <p className="text-[13px] sm:text-[15px] lg:text-[18px] font-semibold text-newsletter-text">Get E-mail updates about our latest shop and <span className="text-[#ffbd26]">special offer.</span></p>
      </div>
      <div className="flex w-full sm:w-[50%] lg:w-[40%]">
        <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
        <input
          id="newsletter-email"
          className="h-[3.125rem] px-[1.25em] text-[14px] w-full border border-transparent rounded-[4px] rounded-r-none outline-none font-sans"
          type="email"
          placeholder="Your email address"
          required
        />
        <button className="btn-normal !rounded-l-none !py-0 !h-[3.125rem] whitespace-nowrap">Sign Up</button>
      </div>
    </section>
  );
};

export default Newsletter;
