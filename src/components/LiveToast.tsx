import React, { useState, useEffect } from 'react';

const toastData = [
  "Amit from New Delhi recently purchased a Floral Summer Shirt ⚡",
  "Sneha from Mumbai added Vintage Classic T-Shirt to their wishlist ❤️",
  "Rahul from Bengaluru bought 2 pairs of Classic Chinos 🚀",
  "Priya from Ahmedabad ordered a Premium Leather Jacket ✨",
];

const LiveToast: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start loop for toasts
    const interval = setInterval(() => {
      // Pick random message
      const randomMsg = toastData[Math.floor(Math.random() * toastData.length)];
      setToastMessage(randomMsg);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  if (!toastMessage) return null;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-[9999] max-w-sm transition-all duration-700 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-card-bg/90 backdrop-blur-md rounded-2xl shadow-[var(--color-card-shadow)] border border-border-color p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
          <i className="fa-solid fa-bell text-primary text-lg animate-bounce"></i>
        </div>
        <p className="text-sm font-medium text-text-main leading-tight">
          {toastMessage}
        </p>
      </div>
    </div>
  );
};

export default LiveToast;
