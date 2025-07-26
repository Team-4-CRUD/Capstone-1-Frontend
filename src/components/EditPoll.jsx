import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditStyles.css";
import axios from "axios";

const EditPoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    pollElements: [{ id: Date.now(), option: "", info: "", picture: "" }],
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
          pollElements: (res.data.pollElements || []).map((el) => ({
            ...el,
            id: el.id || Date.now() + Math.random(), // Ensure uniqueness
          })),
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

    const filledOptions = editFormData.pollElements.filter(
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
      navigate("/MyPolls");
    } catch (err) {
      console.error("Error updating poll:", err);
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedElements = [...editFormData.pollElements];
      updatedElements[index] = {
        ...updatedElements[index],
        [name]: value,
      };
      setEditFormData((prevData) => ({
        ...prevData,
        pollElements: updatedElements,
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
      pollElements: [
        ...prevData.pollElements,
        { id: Date.now(), option: "", info: "", picture: "" },
      ],
    }));
  };

  const handleDeleteElement = (idToDelete) => {
    setEditFormData((prevData) => ({
      ...prevData,
      pollElements: prevData.pollElements.filter((el) => el.id !== idToDelete),
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
            <input
              type="checkbox"
              checked={editFormData.private || false}
              onChange={(e) =>
                setEditFormData((prevData) => ({
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

          {editFormData.pollElements.map((el) => (
            <div key={el.id}>
              <input
                type="text"
                name="option"
                placeholder="Pick an Option"
                value={el.option}
                onChange={(e) =>
                  handleChange(
                    e,
                    editFormData.pollElements.findIndex(
                      (opt) => opt.id === el.id
                    )
                  )
                }
                required
              />
              <input
                type="text"
                name="info"
                placeholder="Write some Info"
                value={el.info}
                onChange={(e) =>
                  handleChange(
                    e,
                    editFormData.pollElements.findIndex(
                      (opt) => opt.id === el.id
                    )
                  )
                }
                required
              />
              <input
                type="url"
                name="picture"
                placeholder="Choose a picture"
                value={el.picture}
                onChange={(e) =>
                  handleChange(
                    e,
                    editFormData.pollElements.findIndex(
                      (opt) => opt.id === el.id
                    )
                  )
                }
                required
              />
              <button
                type="button"
                className="delete-option-button"
                onClick={() => handleDeleteElement(el.id)}
                disabled={editFormData.pollElements.length <= 2}
              >
                ❌
              </button>
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
