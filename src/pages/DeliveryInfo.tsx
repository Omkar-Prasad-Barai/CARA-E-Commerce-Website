import React from 'react';
import { Truck, DollarSign, Globe } from 'lucide-react';

const DeliveryInfo: React.FC = () => {
  return (
    <>
      <section id="page-header" className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/banner/b1.jpg')] bg-cover h-[20vh] w-full">
        <h2 className="text-white text-[46px] font-bold leading-[54px]">#delivery</h2>
        <p className="text-white text-[16px] mt-[15px] leading-[1.65]">Everything you need to know about our shipping.</p>
      </section>

      <section className="section-p1 min-h-[50vh]">
        <div className="info-container">
          
          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">Shipping Times</h3>
              <p className="!mb-0">We process all orders within 1-2 business days. Standard delivery within India takes 3-5 business days. Express delivery takes 1-2 business days.</p>
            </div>
          </div>

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">Shipping Costs</h3>
              <p className="!mb-0">Standard delivery is a flat rate of ₹40 on all orders. Express delivery is available for ₹80.</p>
            </div>
          </div>

          <div className="info-card flex gap-[20px] max-md:flex-col items-start">
            <div className="info-icon shrink-0 mt-[5px]">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="!border-none !pb-0 !mb-[10px]">International Shipping</h3>
              <p className="!mb-0">Currently, we only ship within India. We are working on expanding our reach internationally soon.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default DeliveryInfo;
