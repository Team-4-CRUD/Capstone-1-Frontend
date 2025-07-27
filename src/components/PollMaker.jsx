import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PollMakerStyles.css";
import arrowLeft from "../assets/images/arrowLeft.png";
import arrowRight from "../assets/images/arrowRight.png";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Modal from "react-modal";

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
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Count how many options have a non-empty 'option' field
    const filledOptions = formData.Element.filter(
      (el) => el.option.trim() !== ""
    );

    if (filledOptions.length < 2) {
      alert("Please add at least two options before submitting the poll.");
      return;
    }

    // if (!formData.endDate || new Date(formData.endDate) <= new Date()) {
    //   alert("Please set a valid future end date and time for the poll.");
    //   return;
    // }

    try {
      const res = await axios.post(`${API_BASE}/PollForm`, formData, {
        withCredentials: true,
      });
      console.log("Poll created", res.data);
      console.log(formData);
      navigate("/MyPolls");
    } catch (err) {
      console.error("Error creating poll:", err);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const AddEl = [...formData.Element];
    AddEl[index] = {
      ...AddEl[index],
      [name]: value,
    };
    if (name === "title" || name === "description") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        Element: AddEl,
      }));
    }
  };

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleAddElement = () => {
    setFormData((prevData) => ({
      ...prevData,
      Element: [...prevData.Element, { option: "", info: "", picture: "" }],
    }));
    console.log();
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
            <div
              className="date-time-nav"
              style={{ cursor: "pointer" }}
              onClick={openModal}
            >
              <span
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontWeight: 400,
                  fontFamily: "Inconsolata",
                }}
              >
                Set EndDate & Time
              </span>
              <img src={arrowRight} alt="time and nav nav" />
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                overlay: {
                  backgroundColor: "rgba(0,0,0,0.4)",
                  zIndex: 1000,
                },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "16px",
                  padding: "2rem",
                  minWidth: "320px",
                  maxWidth: "90vw",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                },
              }}
              ariaHideApp={false}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={closeModal}
                  style={{
                    fontSize: "1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              </div>
              <div style={{ textAlign: "center" }}>
                <h2>Set End Date & Time</h2>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  style={{
                    fontSize: "1.1rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    margin: "1.5rem 0",
                    width: "80%",
                  }}
                  min={new Date().toISOString().slice(0, 16)}
                />
                <div
                  style={{
                    color: "#709255",
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  {formData.endDate
                    ? `Selected: ${new Date(formData.endDate).toLocaleString()}`
                    : "No date/time selected"}
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: "#709255",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.5rem 1.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Save & Close
                </button>
              </div>
            </Modal>
          </div>
          <h1 className="createPoll-title">Create Poll</h1>
          <form onSubmit={handleSubmit}>
            <div className="Title-container">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                placeholder="Pick a Title"
                name="title"
                onChange={handleChange}
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
                onChange={handleChange}
                value={formData.description}
                required
              />
            </div>
            <div className="auth-btn-container">
              <button
                type="button"
                className={`auth-btn${formData.private ? " active" : ""}`}
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    private: !prevData.private,
                  }))
                }
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
                }}
              >
                {formData.private
                  ? "Auth-Only Voting: ON"
                  : "Auth-Only Voting: OFF"}
              </button>
            </div>

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
            <div className="submit-container">
              <input type="submit" />
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
