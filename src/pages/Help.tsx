import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days. You can track your order using the 'Track My Order' page."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you are not satisfied with your purchase, you can return it within 30 days of receipt for a full refund."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India. We are working hard to bring CARA to the rest of the world soon!"
  },
  {
    question: "How can I contact support?",
    answer: "You can reach us at omkaraomm05@gmail.com or call us at +91 8926046058 between 10:00 AM and 6:00 PM, Monday to Saturday."
  }
];

const Help: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section id="page-header" className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/banner/b1.jpg')] bg-cover h-[20vh] w-full">
        <h2 className="text-white text-[46px] font-bold leading-[54px]">#helpcenter</h2>
        <p className="text-white text-[16px] mt-[15px] leading-[1.65]">Frequently Asked Questions</p>
      </section>

      <section className="section-p1 min-h-[60vh]">
        <div className="max-w-[800px] mx-auto py-[40px] px-0 font-sans text-text-main">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border bg-card-bg rounded-[8px] mb-[15px] overflow-hidden shadow-[var(--color-card-shadow)] transition-all duration-300 ${openIndex === index ? 'border-primary' : 'border-border-color'}`}
            >
              <div className="flex justify-between items-center p-[20px] bg-bg-color cursor-pointer transition-colors duration-200 hover:bg-bg-secondary" onClick={() => toggleFAQ(index)}>
                <span className="text-[18px] font-semibold text-text-main">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-primary transition-transform duration-300" size={20} /> : <ChevronDown className="text-primary transition-transform duration-300" size={20} />}
              </div>
              <div className={`overflow-hidden bg-card-bg transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] border-t border-border-color' : 'max-h-0'}`}>
                <p className="p-[20px] m-0 text-[15px] leading-[1.6] text-text-p">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Help;
