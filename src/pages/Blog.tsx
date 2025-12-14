import React from 'react';
import Newsletter from '../components/Newsletter';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    date: 'Oct 24, 2025',
    readTime: '5 min read',
    category: 'Fashion',
    image: '/images/blog/b1.jpg',
    title: 'The Cotton-Jersey Zip-Up Hoodie',
    excerpt: 'Discover why the cotton-jersey zip-up hoodie remains a wardrobe staple. From casual Sundays to layered office looks, this versatile piece combines comfort with effortless style.',
  },
  {
    id: 2,
    date: 'Oct 21, 2025',
    readTime: '4 min read',
    category: 'Lifestyle',
    image: '/images/blog/b2.jpg',
    title: 'How to Style a Quiff',
    excerpt: 'The quiff is back and bolder than ever. Learn how to pair sharp haircuts with the right outfit — from slim-fit chinos to oversized tees for a head-turning, modern aesthetic.',
  },
  {
    id: 3,
    date: 'Oct 15, 2025',
    readTime: '6 min read',
    category: 'Trends',
    image: '/images/blog/b3.jpg',
    title: 'Must-Have Skater Girl Items',
    excerpt: 'From graphic tees to chunky sneakers — explore the essential pieces every skater girl needs in her wardrobe this season. Bold, expressive, and effortlessly cool.',
  },
  {
    id: 4,
    date: 'Oct 08, 2025',
    readTime: '3 min read',
    category: 'Fashion',
    image: '/images/blog/b4.jpg',
    title: 'Runway-Inspired Trends',
    excerpt: 'Top runway looks made wearable for everyday life. We break down the key trends from this season\'s fashion weeks and show you how to incorporate them into your personal style.',
  },
  {
    id: 5,
    date: 'Sep 29, 2025',
    readTime: '7 min read',
    category: 'Menswear',
    image: '/images/blog/b6.jpg',
    title: 'AW20 Menswear Trends',
    excerpt: 'Autumn/Winter menswear has never been so exciting. Explore the key silhouettes, textures, and colour palettes defining the season — from oversized outerwear to tailored classics.',
  },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

const Blog: React.FC = () => {
  const featuredPost = blogPosts[0];
  const gridPosts = blogPosts.slice(1);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
       *  EDITORIAL HEADER
       *  ═══════════════════════════════════════════════════════════ */}
      <section className="pt-[40px] pb-[40px] md:pb-[60px] px-4 md:px-6 lg:px-[80px] text-center bg-bg-main">
        <motion.h1 
          className="text-[36px] md:text-[46px] lg:text-[54px] font-extrabold text-text-main tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          The Journal
        </motion.h1>
        <motion.p 
          className="text-text-light text-[15px] md:text-[18px] mt-2 md:mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Thoughts, trends, and editorial stories from the CARA team.
        </motion.p>
      </section>

      <section className="px-4 md:px-6 lg:px-[80px] pb-[60px] max-w-[1400px] mx-auto overflow-hidden">
        
        {/* ═══════════════════════════════════════════════════════════
         *  FEATURED POST (HERO ARTICLE)
         *  ═══════════════════════════════════════════════════════════ */}
        <motion.div 
          className="mb-16 md:mb-24 group cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Image Container */}
            <div className="w-full lg:w-[60%] overflow-hidden rounded-[24px] shadow-[0_8px_30px_var(--color-card-shadow)]">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            
            {/* Content Container */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center">
              {/* Rich Metadata */}
              <div className="flex items-center gap-3 mb-4 text-[13px] font-semibold tracking-[0.5px]">
                <span className="bg-bg-secondary text-primary px-3 py-[6px] rounded-full uppercase">{featuredPost.category}</span>
                <span className="text-text-light">{featuredPost.date}</span>
                <span className="text-text-light">• {featuredPost.readTime}</span>
              </div>
              
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-text-main leading-[1.1] mb-4 tracking-[-0.5px]">
                {featuredPost.title}
              </h2>
              
              <p className="text-text-light text-[15px] md:text-[17px] leading-[1.7] mb-8">
                {featuredPost.excerpt}
              </p>
              
              {/* Animated Underline Link */}
              <Link to="/blog" className="inline-flex relative w-fit text-[14px] md:text-[15px] font-bold text-text-main tracking-[1px] uppercase group/link">
                Continue Reading
                <span className="absolute -bottom-[4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-out group-hover/link:w-full"></span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
         *  STANDARD POSTS GRID (BENTO STAGGER)
         *  ═══════════════════════════════════════════════════════════ */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {gridPosts.map((post) => (
            <motion.div key={post.id} variants={cardVariant} className="flex flex-col group cursor-pointer h-full">
              {/* Image Container */}
              <div className="w-full overflow-hidden rounded-[20px] mb-5 shadow-[0_4px_20px_var(--color-card-shadow)]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[260px] md:h-[300px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              
              {/* Rich Metadata */}
              <div className="flex items-center gap-3 mb-3 text-[12px] font-semibold tracking-[0.5px]">
                <span className="bg-bg-secondary text-primary px-3 py-1 rounded-full uppercase">{post.category}</span>
                <span className="text-text-light">{post.date}</span>
                <span className="text-text-light">• {post.readTime}</span>
              </div>
              
              <h3 className="text-[20px] md:text-[24px] font-bold text-text-main leading-snug mb-3 tracking-[-0.3px]">
                {post.title}
              </h3>
              
              <p className="text-text-light text-[14px] md:text-[15px] leading-[1.6] mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              {/* Animated Underline Link */}
              <div className="mt-auto">
                <Link to="/blog" className="inline-flex relative w-fit text-[13px] md:text-[14px] font-bold text-text-main tracking-[1px] uppercase group/link">
                  Continue Reading
                  <span className="absolute -bottom-[4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-out group-hover/link:w-full"></span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
       *  PAGINATION
       *  ═══════════════════════════════════════════════════════════ */}
      <section className="flex justify-center items-center gap-2 pb-[60px]">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold cursor-pointer border-none transition-transform duration-300 ease-out hover:-translate-y-1 shadow-[0_4px_14px_rgba(8,129,120,0.3)]">1</button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-secondary text-text-main font-semibold cursor-pointer border-none transition-all duration-300 ease-out hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(8,129,120,0.3)]">2</button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-secondary text-text-main font-semibold cursor-pointer border-none transition-all duration-300 ease-out hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_14px_rgba(8,129,120,0.3)]">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </section>

      <Newsletter />
    </>
  );
};

export default Blog;
