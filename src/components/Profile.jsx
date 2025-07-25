import React, { useEffect } from "react";
import "../styles/ProfileStyles.css";

const Profile = ({ userInfo }) => {
  useEffect(() => {
    document.body.classList.add("profile-page");

    return () => {
      document.body.classList.remove("profile-page");
    };
  }, []);

  console.log("user info: ", userInfo);

  if (!userInfo) {
    return <p className="loader">Loading profile...</p>;
  }

  return (
    <>
      <h1 className="profile-title">Welcome, {userInfo.username}</h1>
      <div className="profile-container">
        <div className="linear-gradient"></div>
        <div className="profile-info-container">
          <div className="user-info-container">
            <img src="https://robohash.org/flash" alt="user" />
            <p>{userInfo.username}</p>
          </div>
          <div className="edi-btn-container">
            <button className="edit-btn">Edit</button>
          </div>
        </div>
        <div className="firstLast-Name-container">
          <div className="firstName-container">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" placeholder="First Name" name="firstName" />
          </div>
          <div className="lastName-Container">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" placeholder="Last Name" name="lastName" />
          </div>
        </div>
        <div className="email-pfp-container">
          <div className="Email-container">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder="123@gmail.com" name="email" />
          </div>
          <div className="pfp-Container">
            <label htmlFor="userPfp">Profile Picture:</label>
            <input type="url" placeholder="Image URL" name="userPfp" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
