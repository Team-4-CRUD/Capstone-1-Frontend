import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import css page here
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";

const PollMaker = () => {
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

  const handleAddElement = () => {
    setFormData((prevData) => ({
      ...prevData,
      Element: [...prevData.Element, { option: "", info: "", picture: "" }],
    }));
    console.log();
  };

  return (
    <>
      <h1>Poll Maker!</h1>
      {/* <img className="react-logo" src="/react-logo.svg" alt="React Logo" /> */}

      <p>Here you can create your own polls.</p>
      <p>More features coming soon!</p>
      <p>Stay tuned!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Pick a Title"
            value={formData.title}
            required
          />
          <input
            onChange={handleChange}
            type="text"
            name="description"
            placeholder="Write a Description"
            value={formData.description}
            required
          />
          <input
            type="checkbox"
            checked={formData.private || false}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                private: e.target.checked,
              }))
            }
            name="AuthUser"
          />
          <label htmlFor="AuthUser">
            Allow only authenticated users to vote?
          </label>
        </div>

        {formData.Element.map((el, idx) => (
          <div key={idx}>
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
        <input type="submit" />
        <button type="button" onClick={handleAddElement}>
          Add Option
        </button>
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              endDate: e.target.value,
            }))
          }
        />
        <label htmlFor="endDate">Poll End Date & Time</label>
      </form>
    </>
  );
};

export default PollMaker;
