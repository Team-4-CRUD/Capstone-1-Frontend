import React, { useEffect, useState } from "react";
import "../styles/ProfileStyles.css";
import axios from "axios";

const Profile = ({ userInfo, setUser }) => {
  const [formData, setFormData] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.body.classList.add("profile-page");
    return () => {
      document.body.classList.remove("profile-page");
    };
  }, []);

  // 🆕 Fetch latest user info on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          withCredentials: true,
        });

        const updatedUser = res.data.user;

        const savedProfilePicture = localStorage.getItem("profilePicture");

        const updatedData = {
          firstName: updatedUser.firstName || "",
          lastName: updatedUser.lastName || "",
          email: updatedUser.email || "",
          profilePicture:
            savedProfilePicture || updatedUser.profilePicture || "",
          isAdmin: updatedUser?.isAdmin || false,
        };

        setFormData(updatedData);
        setSavedData(updatedData);
        setUser(updatedUser); // ✅ updates global state if passed in
      } catch (err) {
        console.error("Error fetching user data in profile page:", err);
      }
    };

    fetchUserData();
  }, []);

  if (!formData) {
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
      const response = await axios.patch(
        `http://localhost:8080/api/users/${userInfo.id}`,
        formData,
        { withCredentials: true }
      );

      const updatedUser = response.data.user;

      const updatedForm = {
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        email: updatedUser.email || "",
        profilePicture: updatedUser.profilePicture || "",
        isAdmin: updatedUser.isAdmin || false,
      };

      setFormData(updatedForm);
      setSavedData(updatedForm);
      setUser(updatedUser); // ✅ updates global state

      localStorage.setItem(
        "profilePicture",
        updatedUser.profilePicture || formData.profilePicture
      );

      window.dispatchEvent(new Event("profilePictureUpdated"));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save user info:", error);
      alert("Failed to save user info");
    }
  };

  return (
    <>
      <h1 className="profile-title">
        Welcome, {formData.firstName || userInfo.username}
      </h1>

      {formData?.isAdmin && (
        <p style={{ color: "green", marginLeft: "5rem", fontWeight: "bold" }}>
          Admin privileges.
        </p>
      )}

      <div className="profile-container">
        <div className="linear-gradient"></div>
        <div className="profile-info-container">
          <div className="user-info-container">
            <img src={formData.profilePicture} alt="user" />
           {userInfo && <p>{userInfo?.username}</p>} 
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
                    setFormData(savedData);
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
