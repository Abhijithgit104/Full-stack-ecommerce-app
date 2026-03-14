import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const { token } = useSelector((state) => state.auth);
  const [showWakeUpBanner, setShowWakeUpBanner] = useState(false);

  useEffect(() => {
    let bannerTimer;
    let retryInterval;
    let attempts = 0;
    const MAX_ATTEMPTS = 30; // 30 * 2s = 60 seconds

    const pingServer = () => {
      attempts++;
      // Step 1: Use mode:'no-cors' to bypass CORS preflight during cold start.
      // Render's sleeping infrastructure blocks CORS preflight (OPTIONS) but
      // allows no-cors GET requests, which wakes the Django process.
      fetch(`${API_BASE_URL}/api/products/?limit=1`, { mode: 'no-cors' })
        .then(() => {
          // Step 2: Now try a real CORS-enabled request. If Django is awake
          // and CORS headers are present, this will succeed.
          return fetch(`${API_BASE_URL}/api/products/?limit=1`);
        })
        .then((res) => {
          if (res.ok) {
            clearTimeout(bannerTimer);
            clearInterval(retryInterval);
            setShowWakeUpBanner(false);
          }
        })
        .catch(() => {
          // Django not ready yet — keep retrying
        });

      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(retryInterval);
        setShowWakeUpBanner(false); // Give up, let user try anyway
      }
    };

    // Show the banner after 2s if backend hasn't responded yet
    bannerTimer = setTimeout(() => setShowWakeUpBanner(true), 2000);

    // Ping immediately, then every 2s
    pingServer();
    retryInterval = setInterval(pingServer, 2000);

    return () => {
      clearTimeout(bannerTimer);
      clearInterval(retryInterval);
    };
  }, []);

  return (
    <Router>
      <div className="App">

        {/* Render free-tier cold-start banner */}
        {showWakeUpBanner && (
          <div
            className="d-flex align-items-center justify-content-center gap-2 text-white py-2 px-3 text-center"
            style={{ background: '#1a1a2e', fontSize: '13px', position: 'sticky', top: 0, zIndex: 99999 }}
          >
            <span className="spinner-border spinner-border-sm" style={{ width: '14px', height: '14px', borderWidth: '2px' }}></span>
            <span>
              ⚡ Server is waking up (free tier) — this may take <strong>30–60 seconds</strong> on first load. Please wait…
            </span>
          </div>
        )}

        {token && (
          <>
            <header className="bg-black text-white text-center py-2 position-relative" style={{ fontSize: '14px' }}>
              Sign up and get 20% off to your first order.{' '}
              <a href="#" className="text-white text-decoration-underline fw-medium">Sign Up Now</a>
              <button
                className="btn-close btn-close-white position-absolute end-0 top-50 translate-middle-y me-3"
                aria-label="Close"
              ></button>
            </header>
            <Navbar />
          </>
        )}

        <main>
          <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />
            <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/product/:id" element={token ? <ProductDetail /> : <Navigate to="/login" replace />} />
            <Route path="/category/:type/:value" element={token ? <Category /> : <Navigate to="/login" replace />} />
            <Route path="/cart" element={token ? <Cart /> : <Navigate to="/" replace />} />
            <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" replace />} />
            <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" replace />} />
            <Route path="/success" element={token ? <Success /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {token && <Footer />}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
      </div>
    </Router>
  );
}

export default App;
