import React from 'react';
import { Database, Mail, ShieldCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <section id="page-header" className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/banner/b1.jpg')] bg-cover h-[20vh] w-full">
        <h2 className="text-white text-[46px] font-bold leading-[54px]">#privacy</h2>
        <p className="text-white text-[16px] mt-[15px] leading-[1.65]">How we handle your data.</p>
      </section>
      <section className="section-p1 min-h-[50vh]">
        <div className="info-container">

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <Database size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">1. Information Collection</h3>
              <p className="!mb-0">We collect information when you register, place an order, or subscribe to our newsletter. This includes your name, email, shipping address, and payment details.</p>
            </div>
          </div>

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">2. Information Usage</h3>
              <p className="!mb-0">Your information is used to process transactions, improve our website, and send periodic emails regarding your orders or other products.</p>
            </div>
          </div>

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">3. Data Protection</h3>
              <p className="!mb-0">We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your data to outside parties.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
