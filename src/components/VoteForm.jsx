import React, { useState } from "react";
import "../styles/voteForm.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import arrowLeft from "../assets/images/arrowLeft.png";

function VoteForm() {
  useEffect(() => {
    document.body.classList.add("poll-form-page");

    return () => {
      document.body.classList.remove("poll-form-page");
    };
  }, []);

  const [pollForm, setPollForm] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const { pollFormId } = useParams();

  const fetchPollForm = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/PollForm/${pollFormId}`
      );
      setPollForm(data || []);
      console.log("Poll form fetched:", data);
    } catch (error) {
      console.log("Error fetching poll form:", error);
    }
  };

  useEffect(() => {
    fetchPollForm();
  }, [pollFormId]);

  useEffect(() => {
    console.log("Updated pollForm:", pollForm);
  }, [pollForm]);

  const handleRankSelection = (optionId, event) => {
    setUserSelections((prevSelections) => ({
      ...prevSelections,
      [optionId]: Number(event.target.value),
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formattedSelections = Object.keys(userSelections).map((key) => ({
      elementId: Number(key),
      rank: userSelections[key],
    }));

    console.log(formattedSelections);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/vote/submit",
        {
          pollFormId: pollFormId,
          response: formattedSelections,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
      console.log("Error submitting vote");
    }
  };

  return (
    // <div className="poll-container">
    //   <div className="exit-nav">
    //     <img src={arrowLeft} alt="Exit" />
    //     <a href="/">Exit Voting</a>
    //   </div>
    //   <div className="poll-grid">
    //     <div className="poll-info">
    //       <p className="poll-title">Best Drake Album</p>
    //       <p className="poll-description">
    //         Celebrating the Drake album that delivers the most iconic blend of
    //         lyrics, production, and cultural impact.
    //       </p>
    //     </div>
    //     <div className="poll-options-grid">
    //       <div className="options-div">
    //         <img src="/Rectangle 68.png" alt="Option 1" />
    //         <p>Take Care</p>
    //       </div>
    //       <div className="options-div">
    //         <img src="/Rectangle 69.png" alt="Option 2" />
    //         <p>Certified Lover Boy</p>
    //       </div>
    //       <div className="options-div">
    //         <img src="/Rectangle 70.png" alt="Option 3" />
    //         <p>For All the Dogs</p>
    //       </div>
    //       <div className="options-div">
    //         <img src="/Rectangle 71.png" alt="Option 4" />
    //         <p>Views</p>
    //       </div>
    //       <div className="options-div">
    //         <img src="/Rectangle 72.png" alt="Option 5" />
    //         <p>Thank Me Later</p>
    //       </div>
    //       <div className="options-div">
    //         <img src="/Rectangle 73.png" alt="Option 6" />
    //         <p>$ome $exy $ongs 4 U</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      {pollForm && pollForm.title && <h2>{pollForm.title}</h2>}

      <form onSubmit={handleFormSubmit}>
        {pollForm.pollElements &&
          Array.isArray(pollForm.pollElements) &&
          pollForm.pollElements.map((element, index) => (
            <div key={index} className="option">
              <p>{element.option}</p>
              <select
                name="rank"
                id={`rank-${index}`}
                value={userSelections[element.element_id] || ""}
                onChange={(e) => handleRankSelection(element.element_id, e)}
              >
                <option value="">Select rank</option>
                {[...Array(pollForm.pollElements.length)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Rank {i + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        <button>Submit</button>
      </form>
    </>
  );
}

export default VoteForm;
