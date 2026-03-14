import  { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useServer } from '../context/ServerContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { serverReady } = useServer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/');
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    if (token && serverReady) fetchOrders();
  }, [token, serverReady]);

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <h1 className="fw-bolder mb-5" style={{ fontSize: '32px', fontFamily: 'Outfit, sans-serif' }}>Your Orders</h1>
      <div className="d-flex flex-column gap-4">
        {Array.isArray(orders) && orders.map(order => (
          <div key={order.id} className="card border-0 rounded-4 p-4 shadow-sm order-card-hover animate-fade-in" style={{ border: '1px solid rgba(0,0,0,0.1) !important' }}>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-3 border-bottom border-secondary border-opacity-10">
              <div className="mb-2 mb-sm-0">
                <span className="text-secondary small me-2 text-uppercase font-monospace tracking-wide">Order</span>
                <span className="fw-bolder fs-5">#{order.id}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted-custom small">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className={`badge rounded-pill fw-medium px-3 py-2 text-capitalize ${
                  order.status === 'pending' ? 'bg-warning text-dark bg-opacity-25' : 
                  order.status === 'completed' ? 'bg-success text-success bg-opacity-25' : 
                  'bg-info text-primary bg-opacity-25'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="d-flex flex-column gap-3 mb-4">
              {Array.isArray(order.items) && order.items.map(item => (
                <div 
                  key={item.id} 
                  className="d-flex align-items-center gap-3 p-2 rounded-3 order-item-hover" 
                  style={{ cursor: 'pointer', transition: '0.2s', margin: '-8px' }}
                  onClick={() => navigate(`/product/${item.product_details?.id}`)}
                >
                  <div className="bg-secondary-custom rounded-3 overflow-hidden flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                    <img src={item.product_details?.image} alt={item.product_details?.name} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fs-6 fw-bold mb-1">{item.product_details?.name}</h4>
                    <p className="text-muted-custom small mb-0">Qty: {item.quantity} | Price: ${item.price}</p>
                  </div>
                  <div className="fw-bold text-black pe-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-10">
              <div className="fw-medium text-muted-custom">Total Amount</div>
              <div className="fs-3 fw-bolder text-black">${order.total_price}</div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-5 bg-light rounded-5 border border-2 border-secondary border-opacity-25" style={{ borderStyle: 'dashed !important' }}>
             <div className="display-4 mb-3">📦</div>
             <h3 className="fs-4 fw-bold mb-2">No orders found yet</h3>
             <p className="text-muted-custom mb-0">When you place an order, it will appear here.</p>
          </div>
        )}
      </div>
      <style>{`
        .order-card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .order-card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important; }
        .order-item-hover:hover { background: #F9F9F9; }
        .animate-fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Orders;
