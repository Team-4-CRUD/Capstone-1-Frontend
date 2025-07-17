import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import css page here
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const PollMaker = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [pollElements, setPollElements] = useState({
    option: "",
    info: "",
    picture: "",
  });

  const [error, setError] = useState({
    title: "",
    description: "",
  });

  // const [apiError, setApiError] = useState("");
  // const [published, setPublished] = useState("");
  // const [selectedPoll, setSelectedPoll] = useState("");
  // const [polls, setPolls] = useState("");
  const navigate = useNavigate();

  

  const handleDeletePoll = (e) => {
    setPublished((prev) => prev.filter((poll) => poll.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    useEffect(() => {
      const fetchPolls = async () => {
        try {
          const { data } = await axios.get(`${API_BASE}/PollForm`);
          setPolls(data);
        } catch (err) {
          console.error("Error fetching polls:", err);
        }
      };
      fetchPolls();
    }, []);

    useEffect(() => {
      const fetchPollElements = async () => {
        try {
          const { data } = await axios.get(`${API_BASE}/PollElements`);
          setPollElements(data);
        } catch (err) {
          console.error("Error fetching poll elements:", err);
        }
      };
      fetchPollElements();
    }, []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // we can add a loop later that capitalizes the title once submitted
    setPollElements((prevData) => ({ ...prevData, [name]: value }));
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
          <input onChange={handleChange}
            type="text"
            name="title"
            placeholder="Pick a Title"
            value={formData.name}
            required
          />
          <input onChange={handleChange}
            type="text"
            name="description"
            placeholder="Write a Description"
            value={formData.description}
            required
          />
          <button>Allow Authenticated Users? </button>

          <input onChange={handleChange}
            type="text"
            name="question"
            placeholder="Question 1"
            value={formData.question}
            required
          />
        </div>

        <div>
          <input onChange={handleChange}
            type="text"
            name="option"
            placeholder="Pick an Option"
            value={pollElements.option}
            required
          />
          <input onChange={handleChange}
            type="text"
            name="info"
            placeholder="Write some Info"
            value={pollElements.info}
            required
          />
          <input onChange={handleChange}
            type="url"
            name="picture"
            placeholder="Choose a picture"
            value={pollElements.picture}
            required
          />
        </div>

        <div>
          <input type="text" placeholder="The cards will go here" />
        </div>

        <button id="submit" onClick={handleSubmit}>
          {" "}
          Submit Poll
        </button>
      </form>
    </>
  );
};

export default PollMaker;
