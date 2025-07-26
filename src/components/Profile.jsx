import React, { useEffect, useState } from "react";
import "../styles/ProfileStyles.css";
import axios from "axios";

const Profile = ({ userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    profilePicture: userInfo?.profilePicture || "",
  });

  useEffect(() => {
    document.body.classList.add("profile-page");

    return () => {
      document.body.classList.remove("profile-page");
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        email: userInfo.email || "",
        profilePicture: userInfo.profilePicture || "",
      });
    }
  }, [userInfo]);

  if (!userInfo) {
    return <p className="loader">Loading profile...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Sending data to the server:", formData);

      const response = await axios.patch(
        `http://localhost:8080/api/users/${userInfo.id}`,
        formData,
        { withCredentials: true }
      );

      console.log("User updated:", response.data);

      // After successful update, set formData with the updated profile picture
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        profilePicture: response.data.profilePicture || formData.profilePicture, // Use the response data profile picture
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save user info:", error);
      alert("Failed to save user info");
    }
  };

  return (
    <>
      <h1 className="profile-title">Welcome, {userInfo.username}</h1>
      <div className="profile-container">
        <div className="linear-gradient"></div>
        <div className="profile-info-container">
          <div className="user-info-container">
            <img
              src={formData.profilePicture || "https://robohash.org/flash"}
              alt="user"
            />
            <p>{userInfo.username}</p>
          </div>
          <div className="edit-btn-container">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            ) : (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: userInfo.firstName || "",
                      lastName: userInfo.lastName || "",
                      email: userInfo.email || "",
                      profilePicture: userInfo.profilePicture || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        <div className="firstLast-Name-container">
          <div className="firstName-container">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="lastName-Container">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="email-pfp-container">
          <div className="Email-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="123@gmail.com"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="pfp-Container">
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="url"
              placeholder="Image URL"
              name="profilePicture"
              value={formData.profilePicture || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
