import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../pages/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/ASmartBuy5.png";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [location]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-dark navbar-dark fixed-top px-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand me-4" style={{ color: "orange" }}>
            <img src={logo} alt="ASmartBuy" height="50" className="me-2" />
          </Link>

          {/* Desktop Menu - Left Side */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link to="/home" className={`btn btn-outline-warning ${location.pathname === "/home" ? "active" : ""}`}>Home</Link>
            <Link to="/products" className={`btn btn-outline-warning ${location.pathname.startsWith("/product") ? "active" : ""}`}>Products</Link>
            <Link to="/about" className={`btn btn-outline-warning ${location.pathname === "/about" ? "active" : ""}`}>About</Link>
            <Link to="/contact" className={`btn btn-outline-warning ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
          </div>
        </div>

        {/* Desktop Menu - Right Side (Theme, Register, Login, Cart) */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <div className="nav-item mx-2" onClick={toggleTheme} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "white" }}>
            {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
          </div>

          <Link to="/register" className="btn btn-outline-primary">Register</Link>
          <Link to="/login" className="btn btn-outline-success">Login</Link>
          <Link to="/cart" className={`btn btn-outline-info position-relative ${location.pathname === "/cart" ? "active" : ""}`}>
            Cart
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="btn btn-outline-light d-lg-none" onClick={() => setMenuOpen(true)}>
          <FiMenu size={25} />
        </button>
      </nav>

      {/* Sliding Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="btn-close-menu" onClick={() => setMenuOpen(false)}>
          <FiX size={30} />
        </button>
        <ul className="mobile-menu-list">
          <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><button onClick={toggleTheme} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>{theme === "light" ? "Dark Mode" : "Light Mode"}</button></li>
          <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link></li>
        </ul>
      </div>

      {/* Custom CSS */}
      <style>{`
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 250px;
          height: 100vh;
          background: #333;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: 0.3s ease-in-out;
          z-index: 1000;
        }
        .mobile-menu.open {
          right: 0;
        }
        .btn-close-menu {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .mobile-menu-list {
          list-style: none;
          padding: 0;
        }
        .mobile-menu-list li {
          margin: 15px 0;
        }
        .mobile-menu-list li a, .mobile-menu-list li button {
          color: white;
          text-decoration: none;
          font-size: 18px;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Navbar;
