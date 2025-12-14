import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setTimeout(() => {
      setIsLoading(false);

      if (isLogin) {
        // Check credentials against stored user
        const storedUser = localStorage.getItem('cara_registered_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.email === email && user.password === password) {
            login();
            setSuccess('Logged in successfully! Redirecting...');
            setTimeout(() => navigate('/'), 1000);
          } else {
            setError('Invalid email or password. Please try again.');
          }
        } else {
          setError('No account found. Please register first.');
        }
      } else {
        // Register new user
        const name = formData.get('name') as string;
        const userProfile = { name, email, password };
        localStorage.setItem('cara_registered_user', JSON.stringify(userProfile));
        login();
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
      }
    }, 800);
  };

  return (
    <>
      <section
        id="page-header"
        className="about-header flex flex-col justify-center items-center text-center p-[14px] bg-[url('/images/banner/b1.jpg')] bg-cover h-[20vh] w-full"
      >
        <h2 className="text-white text-[46px] font-bold leading-[54px]">
          #{isLogin ? 'signin' : 'register'}
        </h2>
        <p className="text-white text-[16px] mt-[15px] leading-[1.65]">
          {isLogin ? 'Welcome back! Please login to your account.' : 'Join us to get amazing offers and fast checkout.'}
        </p>
      </section>

      <section className="section-p1 min-h-[60vh]">
        <div className="max-w-[450px] mx-auto my-[60px] max-md:my-[30px] p-[40px] max-md:p-[20px] bg-card-bg rounded-[8px] border border-border-color font-sans" style={{ boxShadow: 'var(--color-card-shadow)' }}>
          <div className="text-center mb-[30px]">
            <h2 className="text-[28px] text-text-main mb-[10px] font-bold leading-[1.3]">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
          </div>

          <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="flex flex-col">
                <label htmlFor="auth-name" className="text-[14px] font-semibold text-text-main mb-[8px]">
                  Full Name <span className="text-[#ef3636]">*</span>
                </label>
                <input
                  id="auth-name"
                  name="name"
                  className="py-[12px] px-[15px] border border-border-color rounded-[4px] text-[15px] outline-none bg-bg-color text-text-main transition-colors duration-300 focus:border-primary"
                  type="text"
                  placeholder="John Doe"
                  required
                  minLength={2}
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="auth-email" className="text-[14px] font-semibold text-text-main mb-[8px]">
                Email Address <span className="text-[#ef3636]">*</span>
              </label>
              <input
                id="auth-email"
                name="email"
                className="py-[12px] px-[15px] border border-border-color rounded-[4px] text-[15px] outline-none bg-bg-color text-text-main transition-colors duration-300 focus:border-primary"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="auth-password" className="text-[14px] font-semibold text-text-main mb-[8px]">
                Password <span className="text-[#ef3636]">*</span>
              </label>
              <input
                id="auth-password"
                name="password"
                className="py-[12px] px-[15px] border border-border-color rounded-[4px] text-[15px] outline-none bg-bg-color text-text-main transition-colors duration-300 focus:border-primary"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
              {!isLogin && (
                <span className="text-[12px] text-text-light mt-[5px]">Minimum 6 characters</span>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-[8px] text-[13px] font-medium text-[#ef3636] bg-[rgba(239,54,54,0.08)] px-[12px] py-[10px] rounded-[6px] border border-[rgba(239,54,54,0.2)]">
                <i className="fa-solid fa-circle-xmark"></i>
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-[8px] text-[13px] font-medium text-green-600 bg-green-50 px-[12px] py-[10px] rounded-[6px] border border-green-200">
                <i className="fa-solid fa-circle-check"></i>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white border-none p-[14px] rounded-[4px] text-[16px] font-semibold cursor-pointer transition-colors duration-300 mt-[10px] hover:bg-[#06665f] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]"
            >
              {isLoading ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
              ) : (
                isLogin ? 'Sign In' : 'Register'
              )}
            </button>
          </form>

          <div className="text-center mt-[20px] text-[14px] text-text-p">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              className="text-primary font-semibold cursor-pointer ml-[5px] hover:underline"
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
