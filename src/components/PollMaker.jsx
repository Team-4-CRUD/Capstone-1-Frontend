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

  const [error, setError] = useState({
    title: "",
    description: "",
  });

  const [apiError, setApiError] = useState("");
  const [published, setPublished] = useState("");
  const [selectedPoll, setSelectedPoll] = useState("");
  const [polls, setPolls] = useState("");
  const navigate = useNavigate();

  useEffect (() => {
    const fetchPolls = async() => {
    try {
      const {data} = await axios.get(`${API_BASE}/PollForm`);
      setPolls(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      }
    };
    fetchPolls();
  }, []); 

  const handleChange = (e) => {
    const {title, value} = e.target.value;
    setFormData((prevData) => ({...prevData, [title]: value}));
    // we can add a loop later that capitalizes the title once submitted
  };

  const handleDeletePoll = (e) =>{
    setPublished((prev) => prev.filter((poll) => poll.id !== id));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();


  };

  return (
    <>
      <h1>Poll Maker!</h1>
      {/* <img className="react-logo" src="/react-logo.svg" alt="React Logo" /> */}

      <p>Here you can create your own polls.</p>
      <p>More features coming soon!</p>
      <p>Stay tuned!</p>

      <input 
        type="text"
        name="title"
        placeholder="Pick a Title"
        value={formData.name}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Write a Description"
        value={formData.description}
        required
      />
      <button>Allow Authenticated Users? </button>

      <input 
        type="text"
        name="question"
        placeholder="Question 1"
        value={formData.question}
        required
      />

      <div>
        <input
          type="text" placeholder="The cards will go here"
        />
      </div>

      <button id="submit" onClick={handleSubmit}> Submit Poll</button>


    </>
  );
};


export default PollMaker;