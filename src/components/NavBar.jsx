import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Capstone I</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <div className="user-section">
            <span className="username">Welcome, {user.username}!</span>
            <div>
              <Link to="/pollmaker" className="nav-link">
                New Poll
              </Link>
              <Link to="/polls">
                View all your Forms
              </Link>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
            <Link to="/Poll" className="nav-link">
              Poll
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
