import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/EditStyles.css";
import axios from "axios";

const EditPoll = () => {
  const { id } = useParams();

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    Element: [{ option: "", info: "", picture: "" }],
  });

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/PollForm/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log("Fetched data:", res.data);

        setEditFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          Element:
            Array.isArray(res.data.pollElements) &&
            res.data.pollElements.length > 0
              ? res.data.pollElements
              : [{ option: "", info: "", picture: "" }],
        });
      } catch (err) {
        console.error("Error fetching poll data:", err);
      }
    };

    fetchPollData();

    document.body.classList.add("edit-page");
    return () => {
      document.body.classList.remove("edit-page");
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledOptions = editFormData.Element.filter(
      (el) => el.option.trim() !== ""
    );

    if (filledOptions.length < 2) {
      alert("Please add at least two options before submitting the poll.");
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:8080/api/PollForm/${id}`,
        editFormData,
        { withCredentials: true }
      );
      console.log("Poll updated:", res.data);
    } catch (err) {
      console.error("Error updating poll:", err);
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedElements = [...editFormData.Element];
      updatedElements[index] = {
        ...updatedElements[index],
        [name]: value,
      };
      setEditFormData((prevData) => ({
        ...prevData,
        Element: updatedElements,
      }));
    } else {
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddElement = () => {
    setEditFormData((prevData) => ({
      ...prevData,
      Element: [...prevData.Element, { option: "", info: "", picture: "" }],
    }));
  };

  return (
    <>
      <h1 className="edit-poll-title">Edit Poll {id}</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="edit-header-fields">
            <label>Poll Title</label>
            <input
              type="text"
              name="title"
              placeholder="Pick a Title"
              value={editFormData.title}
              onChange={handleChange}
              required
            />

            <label>Poll Description</label>
            <input
              type="text"
              name="description"
              placeholder="Write a Description"
              value={editFormData.description}
              onChange={handleChange}
              required
            />
          </div>

          {Array.isArray(editFormData.Element) &&
            editFormData.Element.map((el, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  name="option"
                  placeholder="Pick an Option"
                  value={el.option}
                  onChange={(e) => handleChange(e, idx)}
                  required
                />
                <input
                  type="text"
                  name="info"
                  placeholder="Write some Info"
                  value={el.info}
                  onChange={(e) => handleChange(e, idx)}
                  required
                />
                <input
                  type="url"
                  name="picture"
                  placeholder="Choose a picture"
                  value={el.picture}
                  onChange={(e) => handleChange(e, idx)}
                  required
                />
              </div>
            ))}

          <input type="submit" value="Update Poll" />
          <button type="button" onClick={handleAddElement}>
            Add Option
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPoll;
