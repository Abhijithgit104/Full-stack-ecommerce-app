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
    <nav className="navbar">
      <div className="container nav-content">
        <div className="nav-left">
          <Menu className="mobile-menu-icon" />
          <Link to="/" className="logo-link">
            <h1 className="logo">SHOP.CO</h1>
          </Link>
        </div>
        
        <ul className="nav-links">
          <li><Link to="/">Shop</Link></li>
          <li><a href="#">On Sale</a></li>
          <li><a href="#">New Arrivals</a></li>
          <li><a href="#">Brands</a></li>
        </ul>

        <div className="nav-search">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="nav-actions">
          <Search size={24} className="mobile-search-icon" />
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {token ? (
            <div className="user-menu-container">
              <button className="user-icon-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <User size={24} />
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown animate-fade-in">
                  <div className="dropdown-header">
                    <p className="user-name">{user?.username}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={() => { dispatch(logout()); navigate('/login'); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-icon-link"><User size={24} /></Link>
          )}
        </div>
      </div>
      
      <style>{`
        .navbar { padding: 24px 0; border-bottom: 1px solid #eee; background: white; position: sticky; top: 0; z-index: 1000; }
        .nav-content { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .nav-left { display: flex; align-items: center; gap: 16px; }
        .logo-link { text-decoration: none; color: inherit; }
        .logo { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; letter-spacing: -1px; margin: 0; }
        .nav-links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; }
        .nav-links li a { font-size: 16px; color: #000; font-weight: 500; text-decoration: none; }
        .nav-search { flex: 1; background: #F0F0F0; border-radius: 62px; display: flex; align-items: center; padding: 12px 16px; gap: 12px; }
        .nav-search input { background: transparent; border: none; outline: none; width: 100%; font-size: 16px; }
        .search-icon { color: #666; }
        .nav-actions { display: flex; gap: 20px; align-items: center; }
        .cart-link { position: relative; color: inherit; display: flex; align-items: center; }
        .cart-badge { position: absolute; top: -8px; right: -8px; background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; }
        .user-menu-container { position: relative; }
        .user-icon-btn { background: none; border: none; cursor: pointer; color: inherit; display: flex; align-items: center; padding: 0; }
        .user-dropdown { position: absolute; top: 100%; right: 0; margin-top: 15px; background: white; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); min-width: 200px; z-index: 1001; padding: 8px 0; }
        .dropdown-header { padding: 12px 16px; }
        .user-name { font-weight: 700; font-size: 14px; margin: 0; color: #000; }
        .user-email { font-size: 12px; margin: 4px 0 0 0; color: rgba(0,0,0,0.5); }
        .dropdown-divider { border: none; border-top: 1px solid rgba(0,0,0,0.05); margin: 8px 0; }
        .dropdown-item { width: 100%; text-align: left; padding: 10px 16px; border: none; background: none; font-size: 14px; cursor: pointer; transition: 0.2s; }
        .dropdown-item:hover { background: #F0F0F0; }
        .dropdown-item.logout { color: #FF3333; font-weight: 600; }
        
        .animate-fade-in { animation: fadeIn 0.2s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .nav-icon-link { color: inherit; text-decoration: none; display: flex; align-items: center; }
        
        .mobile-menu-icon, .mobile-search-icon { display: none; }
        @media (max-width: 992px) {
          .nav-links, .nav-search { display: none; }
          .mobile-menu-icon, .mobile-search-icon { display: block; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
