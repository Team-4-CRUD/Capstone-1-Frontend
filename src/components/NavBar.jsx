import React from "react";
import { Link, NavLink } from "react-router-dom";
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
              <Link to="/Vote" className="nav-link">
                Poll
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
              Create Poll
            </Link>
            <Link to="/MyPolls" className="nav-link">
              My Polls
            </Link>
            <Link to="/AllPolls" className="nav-link">
              All Polls
            </Link>
            <div className="user-container">
              <img
                src="https://robohash.org/flash"
                alt="user-pfp"
                className="user-pfp"
              />
              <Link to="/profile">
                <span className="username">{user.username}!</span>
              </Link>
            </div>
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
