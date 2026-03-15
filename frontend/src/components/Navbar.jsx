import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const cartCount = items.length;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/category/search/results?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light glass-nav sticky-top py-3" style={{ zIndex: 1100 }}>
      <div className="container">
        <button className="navbar-toggler border-0 ps-0 pe-2" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <Menu size={24} />
        </button>

        <Link to="/" className="navbar-brand fw-bolder fs-3 m-0" style={{ fontFamily: 'Outfit, sans-serif' }}>
          SHOP.CO
        </Link>
        
        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-3">
            <li className="nav-item"><Link className="nav-link fw-medium text-black px-0" to="/">Shop</Link></li>
            <li className="nav-item"><Link className="nav-link fw-medium text-black px-0" to="/category/category/top_selling">On Sale</Link></li>
            <li className="nav-item"><Link className="nav-link fw-medium text-black px-0" to="/category/category/new_arrival">New Arrivals</Link></li>
            <li className="nav-item"><Link className="nav-link fw-medium text-black px-0" to="/category/style/casual">Brands</Link></li>
            {token && <li className="nav-item"><Link className="nav-link fw-medium text-black px-0" to="/orders">My Orders</Link></li>}
          </ul>
        </div>

        <div className="d-flex align-items-center flex-grow-1 mx-lg-4 d-none d-lg-flex">
          <div className="input-group bg-light rounded-pill px-3 py-1 border-0 w-100">
            <span className="input-group-text bg-transparent border-0"><Search size={20} className="text-secondary" /></span>
            <input 
              type="text" 
              className="form-control bg-transparent border-0 shadow-none px-0" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <Search size={24} className="d-lg-none" />
          <Link to="/cart" className="text-dark position-relative d-flex align-items-center">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                {cartCount}
              </span>
            )}
          </Link>
          
          {token ? (
            <div className="dropdown">
              <button className="btn p-0 border-0" onClick={() => setShowUserMenu(!showUserMenu)}>
                <User size={24} />
              </button>
              
              {showUserMenu && (
                <div className="dropdown-menu dropdown-menu-end show shadow-lg border-0 rounded-4 animate-fade-in py-2" style={{ top: '100%', right: 0 }}>
                  <div className="px-3 py-2">
                    <p className="fw-bold mb-0 text-capitalize" style={{ fontSize: '14px' }}>
                      {user?.username || user?.first_name || 'User'}
                    </p>
                    <p className="text-secondary mb-0" style={{ fontSize: '12px' }}>{user?.email || 'No email'}</p>
                  </div>
                  <li><hr className="dropdown-divider" /></li>
                  <button className="dropdown-item fw-semibold text-danger" onClick={() => { dispatch(logout()); navigate('/login'); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-dark"><User size={24} /></Link>
          )}
        </div>
      </div>
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </nav>
  );
};

export default Navbar;
