import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-[20px] bg-bg-color font-sans">
      <div className="max-w-[500px] mx-auto">
        <div className="text-[120px] font-extrabold text-primary leading-none mb-[10px] select-none">
          404
        </div>
        <h1 className="text-[32px] font-bold text-text-main mb-[15px]">
          Page Not Found
        </h1>
        <p className="text-text-p text-[16px] leading-[1.65] mb-[35px]">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-[15px] justify-center flex-wrap">
          <Link
            to="/"
            className="bg-primary text-white border-none py-[13px] px-[32px] rounded-[50px] font-semibold text-[15px] no-underline transition-all duration-300 hover:bg-[#066b63] hover:-translate-y-[2px] shadow-[0_4px_15px_rgba(8,129,120,0.3)]"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="bg-transparent text-primary border-[1.5px] border-primary py-[13px] px-[32px] rounded-[50px] font-semibold text-[15px] no-underline transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-[2px]"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
