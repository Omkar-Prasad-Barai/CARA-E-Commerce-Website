import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { featuredProducts, newArrivals } from '../data/products';
import { motion, useScroll, useTransform } from 'framer-motion';

const blurRevealVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerContainer = {
  hidden: {},
  show: { 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
  }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
       *  HERO SECTION — Parallax Scroll Dynamics
       *  ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] sm:h-[70vh] lg:h-[90vh] w-full px-[15px] sm:px-[40px] lg:px-[80px] flex flex-col items-start justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 bg-[url('/images/hero4.png')] bg-cover bg-[top_30%_right_30%] sm:bg-[top_25%_right_0] z-0"
          style={{ y: heroBgY }}
        />
        
        {/* Parallax Foreground Content */}
        <motion.div 
          className="relative z-10 w-full"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <h4 className="pb-[15px] text-[#1a1a2e] font-medium tracking-[1px] uppercase text-[12px] sm:text-[14px]">Trade-in-offer</h4>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[46px] leading-[36px] sm:leading-[44px] lg:leading-[54px] text-[#1a1a2e] font-bold">Super values deals</h2>
          <h1 className="text-[#088178] text-[36px] sm:text-[42px] lg:text-[50px] leading-[46px] sm:leading-[52px] lg:leading-[64px] font-extrabold tracking-[-0.5px]">On all products</h1>
          <p className="text-[13px] sm:text-[14px] lg:text-[16px] text-[#64748b] my-[15px] leading-[1.65]">Save more with coupons &amp; up to 70% off!</p>
          <button
            className="bg-[#088178] text-white border-none py-[12px] px-[30px] sm:py-[14px] sm:px-[40px] rounded-[50px] cursor-pointer font-bold text-[14px] sm:text-[15px] mt-[15px] sm:mt-[20px] transition-all shadow-[0_4px_15px_rgba(8,129,120,0.3)] hover:bg-[#066b63] hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(8,129,120,0.4)]"
            onClick={() => navigate('/shop')}
          >
            Shop Now
          </button>
        </motion.div>
      </section>

      {/* Features strip — Scroll reveal */}
      <section className="section-p1 overflow-hidden">
        <motion.div 
          className="flex items-center justify-center lg:justify-between flex-wrap gap-[15px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { img: "f1", text: "Free Shipping" },
            { img: "f2", text: "Online Order" },
            { img: "f3", text: "Save Money" },
            { img: "f4", text: "Promotions" },
            { img: "f5", text: "Happy Sell" },
            { img: "f6", text: "24/7 Support" }
          ].map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="fe-box"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
              }}
              whileHover={{ y: -10 }}
            >
              <img src={`/images/features/${feature.img}.png`} alt={feature.text} />
              <h6>{feature.text}</h6>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="section-p1 text-center overflow-hidden">
        <motion.div
          variants={blurRevealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold tracking-[-0.5px] text-text-main">Featured Products</h2>
          <p className="text-text-light text-[13px] sm:text-[15px]">Summer Collection New Modern Design</p>
        </motion.div>
        
        <motion.div 
          className="pro-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>

      {/* Sale Banner */}
      <section className="section-m1 flex flex-col justify-center items-center text-center bg-[url('/images/banner/b2.jpg')] w-full h-[40vh] bg-cover bg-center px-[15px] overflow-hidden">
        <motion.div
          variants={blurRevealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h4 className="text-white text-[16px] sm:text-[20px] font-semibold">Repair Services</h4>
          <h2 className="text-white text-[22px] sm:text-[32px] lg:text-[45px] font-bold py-[15px] sm:py-[20px] px-0 leading-snug">
            Up to <span className="text-[#ef3636]">70% Off</span> — All T-Shirts &amp; Accessories
          </h2>
          <button className="btn-normal hover:!bg-white hover:!text-text-main" onClick={() => navigate('/shop')}>
            Explore More
          </button>
        </motion.div>
      </section>

      {/* New Arrivals */}
      <section className="section-p1 text-center overflow-hidden">
        <motion.div
          variants={blurRevealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold tracking-[-0.5px] text-text-main">New Arrivals</h2>
          <p className="text-text-light text-[13px] sm:text-[15px]">Summer Collection New Modern Design</p>
        </motion.div>
        
        <motion.div 
          className="pro-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>

      {/* Dual banner */}
      <section className="section-p1 overflow-hidden">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between flex-wrap gap-[20px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="flex-1 flex flex-col justify-center items-start bg-[url('/images/banner/b17.jpg')] min-w-full sm:min-w-[48%] lg:min-w-[580px] h-[40vh] sm:h-[50vh] bg-cover bg-center p-[20px] sm:p-[30px] transition-all hover:opacity-90 rounded-[16px]"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
            }}
          >
            <h4 className="text-white text-[20px] sm:text-[24px] lg:text-[28px] font-light">Crazy Deals</h4>
            <h2 className="text-white text-[24px] sm:text-[32px] lg:text-[40px] font-extrabold mb-[10px] leading-snug">Buy 1 Get 1 Free</h2>
            <span className="text-white text-[14px] sm:text-[16px] lg:text-[20px] font-medium pb-[15px]">The best classic dress is on sale at CARA</span>
            <button className="btn-white hover:!bg-primary hover:!border-primary" onClick={() => navigate('/shop')}>
              Learn More
            </button>
          </motion.div>
          <motion.div 
            className="flex-1 flex flex-col justify-center items-start bg-[url('/images/banner/b10.jpg')] min-w-full sm:min-w-[48%] lg:min-w-[580px] h-[40vh] sm:h-[50vh] bg-cover bg-center p-[20px] sm:p-[30px] transition-all hover:opacity-90 rounded-[16px]"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <h4 className="text-white text-[20px] sm:text-[24px] lg:text-[28px] font-light">Spring / Summer</h4>
            <h2 className="text-white text-[24px] sm:text-[32px] lg:text-[40px] font-extrabold mb-[10px] leading-snug">Upcoming Season</h2>
            <span className="text-white text-[14px] sm:text-[16px] lg:text-[20px] font-medium pb-[15px]">The best classic dress is on sale at CARA</span>
            <button className="btn-white hover:!bg-primary hover:!border-primary" onClick={() => navigate('/shop')}>
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Triple banner */}
      <section className="overflow-hidden mb-[40px]">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between flex-wrap px-[15px] sm:px-[40px] lg:px-[80px] gap-[15px] sm:gap-[20px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="flex-[1] flex flex-col justify-center items-start bg-[url('/images/banner/b7.jpg')] min-w-full sm:min-w-[30%] h-[25vh] sm:h-[30vh] bg-cover bg-center p-[20px] rounded-[16px]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
            }}
          >
            <h2 className="text-white font-black text-[18px] sm:text-[22px] m-0">SEASONAL SALE</h2>
            <h3 className="text-[#ec544e] font-extrabold text-[13px] sm:text-[15px] m-0 mt-[5px]">Winter Collection – 50% OFF</h3>
          </motion.div>
          <motion.div 
            className="flex-[1] flex flex-col justify-center items-start bg-[url('/images/banner/b4.jpg')] min-w-full sm:min-w-[30%] h-[25vh] sm:h-[30vh] bg-cover bg-center p-[20px] rounded-[16px]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <h2 className="text-white font-black text-[18px] sm:text-[22px] m-0">NEW FOOTWEAR COLLECTION</h2>
            <h3 className="text-[#ec544e] font-extrabold text-[13px] sm:text-[15px] m-0 mt-[5px]">Spring / Summer {new Date().getFullYear()}</h3>
          </motion.div>
          <motion.div 
            className="flex-[1] flex flex-col justify-center items-start bg-[url('/images/banner/b18.jpg')] min-w-full sm:min-w-[30%] h-[25vh] sm:h-[30vh] bg-cover bg-center p-[20px] rounded-[16px]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <h2 className="text-white font-black text-[18px] sm:text-[22px] m-0">T-SHIRTS</h2>
            <h3 className="text-[#ec544e] font-extrabold text-[13px] sm:text-[15px] m-0 mt-[5px]">New Trendy Prints</h3>
          </motion.div>
        </motion.div>
      </section>

      <Newsletter />
    </>
  );
};

export default Home;
