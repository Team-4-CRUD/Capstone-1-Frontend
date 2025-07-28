import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBarStyles.css";
import axios from "axios";

const NavBar = ({ user, onLogout }) => {
  const [userPfp, setUserPfp] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu visibility

  useEffect(() => {
    if (user) {
      const savedProfilePicture = localStorage.getItem("profilePicture");
      if (savedProfilePicture) {
        setUserPfp(savedProfilePicture);
      } else {
        const fetchUserData = async () => {
          try {
            const res = await axios.get(`http://localhost:8080/api/users/me`, {
              withCredentials: true,
            });
            setUserPfp(res.data.profilePicture);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
        fetchUserData();
      }
    } else {
      setUserPfp("");
    }
  }, [user]);

  // Listen for changes to localStorage profilePicture
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "profilePicture") {
        setUserPfp(e.newValue || "");
      }
    };
    const handleProfilePictureUpdated = () => {
      const savedProfilePicture = localStorage.getItem("profilePicture");
      setUserPfp(savedProfilePicture || "");
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "profilePictureUpdated",
      handleProfilePictureUpdated
    );
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "profilePictureUpdated",
        handleProfilePictureUpdated
      );
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Capstone I</Link>
      </div>

      {/* Hamburger Menu Button (visible on small/medium screens) */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
      </div>

      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
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
              Create Poll
            </Link>
            <Link to="/MyPolls" className="nav-link">
              My Polls
            </Link>
            <Link to="/AllPolls" className="nav-link">
              All Polls
            </Link>
            <div className="user-container">
              <Link to="/profile">
                <img
                  src={userPfp || "https://robohash.org/flash"}
                  alt="user-pfp"
                  className="user-pfp"
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <Link to="/profile">
                <span className="username">{user.username}</span>
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
