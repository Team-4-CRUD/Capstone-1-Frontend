import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import css page here
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const PollMaker = () => {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    option: "",
    info: "",
    picture: "",
  });

  // const [pollElements, setPollElements] = useState({
  //   option: "",
  //   info: "",
  //   picture: "",
  // });

  // const [error, setError] = useState({
  //   title: "",
  //   description: "",
  // });

  // const [apiError, setApiError] = useState("");
  // const [published, setPublished] = useState("");
  // const [selectedPoll, setSelectedPoll] = useState("");
  // const [polls, setPolls] = useState("");
  // const navigate = useNavigate();

  

  // const handleDeletePoll = (e) => {
  //   setPublished((prev) => prev.filter((poll) => poll.id !== id));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
        try {
          const res  = await axios.post(`${API_BASE}/PollForm`, formData);
          console.log(formData);
        } catch (err) {
          console.error("Error fetching polls:", err);
        }
     
       
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // we can add a loop later that capitalizes the title once submitted
    // setPollElements((prevElement) => ({ ...prevElement, [name]: value }));
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
            value={formData.title}
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

        </div>

        <div>
          <input onChange={handleChange}
            type="text"
            name="option"
            placeholder="Pick an Option"
            value={formData.option}
            required
          />
          <input onChange={handleChange}
            type="text"
            name="info"
            placeholder="Write some Info"
            value={formData.info}
            required
          />
          <input onChange={handleChange}
            type="url"
            name="picture"
            placeholder="Choose a picture"
            value={formData.picture}
            required
          />
        </div>

        {/* <div>
          <input type="text" placeholder="The cards will go here" />
        </div> */}

        <button id="submit" onClick={handleSubmit}>
          Submit Poll
        </button>
      </form>
    </>
  );
};

export default PollMaker;
