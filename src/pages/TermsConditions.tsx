import React from 'react';
import { CheckSquare, UserCheck, AlertTriangle } from 'lucide-react';

const TermsConditions: React.FC = () => {
  return (
    <>
      <section id="page-header" className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/banner/b1.jpg')] bg-cover h-[20vh] w-full">
        <h2 className="text-white text-[46px] font-bold leading-[54px]">#terms</h2>
        <p className="text-white text-[16px] mt-[15px] leading-[1.65]">Rules and guidelines for using our services.</p>
      </section>
      <section className="section-p1 min-h-[50vh]">
        <div className="info-container">

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <CheckSquare size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">1. Acceptance of Terms</h3>
              <p className="!mb-0">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>
          </div>

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <UserCheck size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">2. User Account</h3>
              <p className="!mb-0">If you create an account on the website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
            </div>
          </div>

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">3. Product Descriptions</h3>
              <p className="!mb-0">We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default TermsConditions;
