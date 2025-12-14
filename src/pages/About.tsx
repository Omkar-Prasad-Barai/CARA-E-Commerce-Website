import React from 'react';
import Newsletter from '../components/Newsletter';

const About: React.FC = () => {
  return (
    <>
      <section
        id="page-header"
        className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/about/banner.png')] bg-cover h-[30vh] sm:h-[40vh] w-full"
      >
        <h2 className="text-white text-[32px] sm:text-[46px] font-bold leading-[42px] sm:leading-[54px]">#KnowUs</h2>
        <p className="text-white text-[13px] sm:text-[16px] mt-[15px] leading-[1.65]">Read all about our journey and vision.</p>
      </section>

      {/* About header — flex-col on mobile, flex-row on desktop */}
      <section id="about-head" className="section-p1 flex flex-col lg:flex-row items-center gap-[25px] sm:gap-[40px]">
        <img
          className="w-full lg:w-[calc(50%-20px)] h-auto rounded-[8px]"
          src="/images/about/a6.jpg"
          alt="CARA team collaborating on fashion curation"
          loading="lazy"
        />
        <div className="w-full lg:w-[calc(50%-20px)]">
          <h2 className="text-[24px] sm:text-[32px] font-bold mb-4">Who We Are?</h2>
          <p className="text-text-p leading-[1.65] mb-4 text-[13px] sm:text-[16px]">
            At Cara, we are a passionate community of retail curators and design experts, unified by a dedicated retail
            focus. Our mission is to connect global customers with unique, high-quality, curated clothing and collections
            that express individual modern style.
          </p>
          <p className="text-text-p leading-[1.65] text-[13px] sm:text-[16px]">
            <strong className="text-text-main">Our Core Values:</strong> We believe in the power of quality, integrity,
            and exceptional service. Every piece in our collection is meticulously curated for style and craftsmanship,
            ensuring value and joy for our customers with each purchase.
          </p>
        </div>
      </section>

      <section id="about-app" className="section-p1 text-center flex flex-col items-center">
        <h2 className="text-[24px] sm:text-[32px] font-bold mb-6">Download Our App</h2>
        <p className="text-text-p text-[13px] sm:text-[15px] mb-[20px]">Available on App Store and Google Play</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <img
            className="w-[120px] sm:w-[150px] cursor-pointer hover:opacity-80 transition-opacity rounded-[8px] shadow-sm hover:shadow-md"
            src="/images/pay/app.jpg"
            alt="Download CARA on the Apple App Store"
            loading="lazy"
          />
          <img
            className="w-[120px] sm:w-[150px] cursor-pointer hover:opacity-80 transition-opacity rounded-[8px] shadow-sm hover:shadow-md"
            src="/images/pay/play.jpg"
            alt="Download CARA on Google Play Store"
            loading="lazy"
          />
        </div>
      </section>

      <section id="feature" className="section-p1 flex items-center justify-center lg:justify-between flex-wrap gap-[15px]">
        <div className="fe-box">
          <img src="/images/features/f1.png" alt="Free Shipping on all orders" loading="lazy" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f2.png" alt="Easy Online Order" loading="lazy" />
          <h6>Online Order</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f3.png" alt="Save Money with great deals" loading="lazy" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f4.png" alt="Exclusive Promotions" loading="lazy" />
          <h6>Promotions</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f5.png" alt="Happy Sell guarantee" loading="lazy" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f6.png" alt="24/7 Customer Support" loading="lazy" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default About;
