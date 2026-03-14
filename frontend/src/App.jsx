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
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        {token && (
          <>
            <header className="banner">
              Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a>
              <button className="close-banner">×</button>
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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {token && <Footer />}

      <style>{`
        .banner {
          background: #000;
          color: #fff;
          text-align: center;
          padding: 10px 0;
          font-size: 14px;
          position: relative;
        }
        .banner a {
          text-decoration: underline;
          font-weight: 500;
        }
        .close-banner {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          color: white;
          font-size: 20px;
        }
        .divider {
          height: 1px;
          background: rgba(0,0,0,0.1);
        }
      `}</style>
      </div>
    </Router>
  );
}

export default App;
