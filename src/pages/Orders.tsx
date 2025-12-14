import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = localStorage.getItem('cara_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders).reverse()); // Show newest first
      } catch (e) {
        console.error("Failed to parse orders", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0eefb] to-white dark:bg-bg-secondary dark:from-bg-secondary dark:to-bg-secondary py-12 px-4 sm:px-6 lg:px-8 font-sans text-text-main transition-colors duration-400">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-text-main mb-8 border-b border-border-color pb-4">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white/70 dark:bg-card-bg/50 backdrop-blur-md rounded-2xl shadow-xl p-10 text-center border border-white/40 dark:border-border-color">
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-text-p mb-6">Looks like you haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-[#088178] text-white py-3 px-8 rounded-xl font-bold tracking-wide transition-all duration-300 hover:bg-[#066b63] shadow-[0_4px_14px_rgba(8,129,120,0.3)] hover:shadow-[0_6px_20px_rgba(8,129,120,0.4)]"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.orderId} className="bg-white/70 dark:bg-card-bg/50 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/40 dark:border-border-color transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-border-color gap-4">
                  <div>
                    <p className="text-sm text-text-p font-medium">Order Placed: {new Date(order.creationDate).toLocaleDateString()}</p>
                    <p className="text-lg font-bold text-text-main mt-1">{order.orderId}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-text-p font-medium">Total Amount</p>
                    <p className="text-xl font-extrabold text-primary">₹{order.financialTotal}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {order.itemMetadata && order.itemMetadata.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-sm border border-border-color" />
                      <div>
                        <p className="font-semibold text-text-main line-clamp-1">{item.name}</p>
                        <p className="text-sm text-text-p mt-1">Qty: {item.quantity} | ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border-color">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(8,129,120,0.6)] animate-pulse"></span>
                    <span className="text-sm font-semibold text-text-main">Status: {order.currentStatus}</span>
                  </div>
                  <button 
                    onClick={() => {
                      sessionStorage.setItem('lastOrderId', order.orderId);
                      navigate('/track-order');
                    }}
                    className="w-full sm:w-auto bg-[#ff6347] text-white border-none py-[10px] px-[24px] cursor-pointer rounded-xl font-semibold text-[14px] tracking-wide transition-all duration-300 hover:opacity-90 shadow-[0_4px_14px_rgba(255,99,71,0.3)] hover:shadow-[0_6px_20px_rgba(255,99,71,0.4)]"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
