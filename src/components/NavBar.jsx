import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBarStyles.css";

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Capstone I</Link>
      </div>

      <div className="nav-links">
        <div className="left-links">
          {!user && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/AllPolls" className="nav-link">
                All Polls
              </Link>
            </>
          )}
        </div>

        {user && (
          <div className="user-section">
            <Link to="/pollmaker" className="nav-link">
              New Poll
            </Link>
            <Link to="/polls" className="nav-link">
              View all your Forms
            </Link>
            <Link to="/AllPolls" className="nav-link">
              All Polls
            </Link>
            <span className="username">Welcome, {user.username}!</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
