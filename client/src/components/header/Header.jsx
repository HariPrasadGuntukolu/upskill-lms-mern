import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <div className="logo" onClick={closeMenu}>
        <span className="logo-blue">U</span>
        <span className="logo-white">p</span>
        <span className="logo-blue">S</span>
        <span className="logo-white">kill</span>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      <nav className={`link ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/courses" onClick={closeMenu}>
          Courses
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        {isAuth ? (
          <Link to="/account" onClick={closeMenu}>
            Account
          </Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
