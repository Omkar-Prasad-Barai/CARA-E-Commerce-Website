import React, { useState } from 'react';
import Newsletter from '../components/Newsletter';
import { Map, Phone, Clock, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formState;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormError('Please fill in all fields before submitting.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
      {/* Contact header banner */}
      <section className="flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/about/banner.png')] bg-cover h-[30vh] sm:h-[40vh] w-full">
        <h2 className="text-white text-[32px] sm:text-[46px] font-bold leading-[42px] sm:leading-[54px]">#let&apos;s_talk</h2>
        <p className="text-white text-[13px] sm:text-[16px] mt-[15px] leading-[1.65]">LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      {/* Contact info + map — flex-col on mobile */}
      <section className="section-p1 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[25px] sm:gap-[30px]">
        <div className="w-full lg:w-[40%]">
          <span className="text-[11px] sm:text-[12px] font-semibold text-text-main">GET IN TOUCH</span>
          <h2 className="text-[20px] sm:text-[26px] leading-[28px] sm:leading-[35px] py-[15px] sm:py-[20px] px-0 text-text-main font-bold">
            Visit one of our agency locations or contact us today
          </h2>
          <h3 className="text-[14px] sm:text-[16px] pb-[15px] text-text-main font-semibold">Head Office</h3>
          <ul className="m-0 p-0">
            <li className="list-none flex items-center gap-[10px] sm:gap-[15px] py-[8px] sm:py-[10px] px-0 text-text-p">
              <Map size={18} className="text-text-main shrink-0" />
              <p className="m-0 text-[13px] sm:text-[14px]">Hirakud, Sambalpur, Odisha, India</p>
            </li>
            <li className="list-none flex items-center gap-[10px] sm:gap-[15px] py-[8px] sm:py-[10px] px-0 text-text-p">
              <Mail size={18} className="text-text-main shrink-0" />
              <a href="mailto:omkaraomm05@gmail.com" className="m-0 text-[13px] sm:text-[14px] text-text-p hover:text-primary transition-colors">
                omkaraomm05@gmail.com
              </a>
            </li>
            <li className="list-none flex items-center gap-[10px] sm:gap-[15px] py-[8px] sm:py-[10px] px-0 text-text-p">
              <Phone size={18} className="text-text-main shrink-0" />
              <a href="tel:+918926046058" className="m-0 text-[13px] sm:text-[14px] text-text-p hover:text-primary transition-colors">
                +91 8926046058
              </a>
            </li>
            <li className="list-none flex items-center gap-[10px] sm:gap-[15px] py-[8px] sm:py-[10px] px-0 text-text-p">
              <Clock size={18} className="text-text-main shrink-0" />
              <p className="m-0 text-[13px] sm:text-[14px]">Monday to Saturday: 10:00 AM – 6:00 PM</p>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-[55%] h-[280px] sm:h-[400px] rounded-[8px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14909.117495574044!2d83.8643806!3d21.5284004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a20d4370db79f17%3A0xc3c9a59b64ea7d0c!2sHirakud%20Dam%2C%20Odisha!5e0!3m2!1sen!2sin!4v1717904324123!5m2!1sen!2sin"
            className="w-full h-full border-none"
            allowFullScreen={true}
            loading="lazy"
            title="CARA Office Location Map"
          ></iframe>
        </div>
      </section>

      {/* Contact form + staff — flex-col on mobile */}
      <section className="section-p1 flex flex-col lg:flex-row justify-between m-[15px] sm:m-[30px] p-[15px] sm:p-[40px] lg:p-[80px] border border-border-color gap-[30px] sm:gap-[40px]">
        {formSuccess ? (
          <div className="w-full lg:w-[65%] flex flex-col items-center justify-center text-center py-[30px] sm:py-[40px]">
            <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-primary-light flex items-center justify-center mb-[15px] sm:mb-[20px]">
              <i className="fa-solid fa-check text-primary text-[24px] sm:text-[28px]"></i>
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-bold text-text-main mb-[10px]">Message Sent!</h3>
            <p className="text-text-p text-[13px] sm:text-[15px] mb-[20px] sm:mb-[25px]">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setFormSuccess(false)}
              className="bg-primary text-white border-none py-[10px] px-[24px] sm:py-[12px] sm:px-[28px] rounded-[50px] font-semibold text-[13px] sm:text-[14px] cursor-pointer transition-all duration-300 hover:bg-[#066b63]"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="w-full lg:w-[65%] flex flex-col items-start" onSubmit={handleSubmit} noValidate>
            <span className="text-[11px] sm:text-[12px] font-semibold text-text-main">LEAVE A MESSAGE</span>
            <h2 className="text-[20px] sm:text-[26px] py-[15px] sm:py-[20px] px-0 text-text-main font-bold">We love to hear from you</h2>

            <label htmlFor="contact-name" className="text-[12px] sm:text-[13px] font-semibold text-text-main mb-[5px]">
              Full Name <span className="text-[#ef3636]">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-[10px_12px] sm:p-[12px_15px] outline-none mb-[15px] sm:mb-[20px] border border-border-color bg-bg-color text-text-main font-sans rounded-[4px] focus:border-primary transition-colors text-[14px]"
              type="text"
              placeholder="Your Name"
              required
            />

            <label htmlFor="contact-email" className="text-[12px] sm:text-[13px] font-semibold text-text-main mb-[5px]">
              Email Address <span className="text-[#ef3636]">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full p-[10px_12px] sm:p-[12px_15px] outline-none mb-[15px] sm:mb-[20px] border border-border-color bg-bg-color text-text-main font-sans rounded-[4px] focus:border-primary transition-colors text-[14px]"
              type="email"
              placeholder="your@email.com"
              required
            />

            <label htmlFor="contact-subject" className="text-[12px] sm:text-[13px] font-semibold text-text-main mb-[5px]">
              Subject <span className="text-[#ef3636]">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full p-[10px_12px] sm:p-[12px_15px] outline-none mb-[15px] sm:mb-[20px] border border-border-color bg-bg-color text-text-main font-sans rounded-[4px] focus:border-primary transition-colors text-[14px]"
              type="text"
              placeholder="Subject"
              required
            />

            <label htmlFor="contact-message" className="text-[12px] sm:text-[13px] font-semibold text-text-main mb-[5px]">
              Message <span className="text-[#ef3636]">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="w-full p-[10px_12px] sm:p-[12px_15px] outline-none mb-[15px] sm:mb-[20px] border border-border-color bg-bg-color text-text-main font-sans rounded-[4px] focus:border-primary transition-colors resize-none text-[14px]"
              cols={30}
              rows={8}
              placeholder="Your Message"
              required
            ></textarea>

            {formError && (
              <div className="flex items-center gap-[8px] text-[12px] sm:text-[13px] font-medium text-[#ef3636] bg-[rgba(239,54,54,0.08)] px-[12px] py-[10px] rounded-[6px] border border-[rgba(239,54,54,0.2)] mb-[15px] w-full">
                <i className="fa-solid fa-circle-xmark"></i> {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white border-none py-[12px] px-[20px] sm:py-[14px] sm:px-[24px] cursor-pointer rounded-[4px] font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:bg-[#066b63] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-[8px]"
            >
              {isSubmitting ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</>
              ) : 'Submit Message'}
            </button>
          </form>
        )}

        <div className="w-full lg:w-[30%] flex flex-col gap-[20px] sm:gap-[25px]">
          <div className="flex items-start">
            <img
              className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] object-cover mr-[12px] sm:mr-[15px] rounded-full"
              src="/images/people/1.png"
              alt="John Doe — Senior Marketing Manager"
            />
            <p className="m-0 text-[12px] sm:text-[13px] leading-[22px] sm:leading-[25px] text-text-p">
              <span className="block text-[14px] sm:text-[16px] font-semibold text-text-main">John Doe</span>
              Senior Marketing Manager<br />
              Phone: +91 89260 46058<br />
              Email: omkaraomm05@gmail.com
            </p>
          </div>
          <div className="flex items-start">
            <img
              className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] object-cover mr-[12px] sm:mr-[15px] rounded-full"
              src="/images/people/2.png"
              alt="William Smith — Senior Marketing Manager"
            />
            <p className="m-0 text-[12px] sm:text-[13px] leading-[22px] sm:leading-[25px] text-text-p">
              <span className="block text-[14px] sm:text-[16px] font-semibold text-text-main">William Smith</span>
              Senior Marketing Manager<br />
              Phone: +91 89260 46058<br />
              Email: omkaraomm05@gmail.com
            </p>
          </div>
          <div className="flex items-start">
            <img
              className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] object-cover mr-[12px] sm:mr-[15px] rounded-full"
              src="/images/people/3.png"
              alt="Emma Stone — Senior Marketing Manager"
            />
            <p className="m-0 text-[12px] sm:text-[13px] leading-[22px] sm:leading-[25px] text-text-p">
              <span className="block text-[14px] sm:text-[16px] font-semibold text-text-main">Emma Stone</span>
              Senior Marketing Manager<br />
              Phone: +91 89260 46058<br />
              Email: omkaraomm05@gmail.com
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default Contact;
