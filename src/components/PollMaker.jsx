import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/PollMakerStyles.css";
import arrowLeft from "../assets/images/arrowLeft.png";
import arrowRight from "../assets/images/arrowRight.png";

const API_BASE = "http://localhost:8080/api";

const PollMaker = () => {
  useEffect(() => {
    document.body.classList.add("PollCreation-page");
    return () => {
      document.body.classList.remove("PollCreation-page");
    };
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Element: [{ option: "", info: "", picture: "" }],
    endDate: "",
    private: false, // ✅ Auth-only toggle field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledOptions = formData.Element.filter(
      (el) => el.option.trim() !== ""
    );

    if (filledOptions.length < 2) {
      alert("Please add at least two options before submitting the poll.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/PollForm`, formData, {
        withCredentials: true,
      });
      console.log("Poll created", res.data);
      navigate("/MyPolls");
    } catch (err) {
      console.error("Error creating poll:", err);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedElements = [...formData.Element];

    if (name === "title" || name === "description") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      updatedElements[index] = { ...updatedElements[index], [name]: value };
      setFormData((prevData) => ({ ...prevData, Element: updatedElements }));
    }
  };

  const handleAddElement = () => {
    setFormData((prevData) => ({
      ...prevData,
      Element: [...prevData.Element, { option: "", info: "", picture: "" }],
    }));
  };

  const toggleAuthOnly = () => {
    setFormData((prevData) => ({
      ...prevData,
      private: !prevData.private,
    }));
  };

  return (
    <>
      <div className="split-screen">
        <div className="left-side-imgBg"></div>
        <div className="right-side-poll-container">
          <div className="nav-container">
            <div className="home-nav">
              <img src={arrowLeft} alt="home nav" />
              <Link to="/">Back Home</Link>
            </div>
            <div className="date-time-nav">
              <Link to="/">Set EndDate & Time</Link>
              <img src={arrowRight} alt="time nav" />
            </div>
          </div>

          <h1 className="createPoll-title">Create Poll</h1>

          <form onSubmit={handleSubmit}>
            <div className="Title-container">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                placeholder="Pick a Title"
                name="title"
                onChange={(e) => handleChange(e)}
                value={formData.title}
                required
              />
            </div>

            <div className="description-container">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                placeholder="Write a Description"
                name="description"
                onChange={(e) => handleChange(e)}
                value={formData.description}
                required
              />
            </div>

            {/* ✅ Auth-only Toggle */}
            <div className="auth-btn-container" style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className={`auth-btn${formData.private ? " active" : ""}`}
                onClick={toggleAuthOnly}
                aria-pressed={formData.private}
                style={{
                  background: formData.private ? "#709255" : "#ffffff",
                  color: formData.private ? "#fff" : "#333",
                  border: "1px solid #709255",
                  borderRadius: "20px",
                  padding: "1rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  width: "380px",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
              >
                {formData.private
                  ? " Auth-Only Voting: ON"
                  : " Auth-Only Voting: OFF"}
              </button>
            </div>

            {/* Poll Options */}
            {formData.Element.map((el, idx) => (
              <div key={idx} className="options-container">
                <label htmlFor="option">Poll Option {idx + 1}:</label>
                <input
                  onChange={(e) => handleChange(e, idx)}
                  type="text"
                  name="option"
                  placeholder="Pick an Option"
                  value={el.option}
                  required
                />
                <input
                  onChange={(e) => handleChange(e, idx)}
                  type="text"
                  name="info"
                  placeholder="Write some Info"
                  value={el.info}
                  required
                />
                <input
                  onChange={(e) => handleChange(e, idx)}
                  type="url"
                  name="picture"
                  placeholder="Choose a picture"
                  value={el.picture}
                  required
                />
              </div>
            ))}

            {/* Submit & Add Button */}
            <div className="submit-container">
              <input type="submit" value="Submit Poll" />
              <button type="button" onClick={handleAddElement}>
                Add Option
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PollMaker;
