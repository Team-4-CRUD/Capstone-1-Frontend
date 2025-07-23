import React, { useState } from "react";
import "../styles/voteForm.css";
import { useEffect } from "react";
import axios from "axios";

function VoteForm() {
  useEffect(() => {
    document.body.classList.add("poll-form-page");

    return () => {
      document.body.classList.remove("poll-form-page");
    };
  }, []);

  const { VoteFormID } = useParams();
  const [currentForm, SetCurrentForm] = useState([]);

  const fetchVotingPoll = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/PollForm/${VoteFormID}`
      );
      SetCurrentForm(data);
      console.log("Voting Form", currentForm);
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVotingPoll();
  }, []);

  return (
    <div className="poll-container">
      <div className="exit-nav">
        <img src="/arrowLeft.png" alt="Exit" />
        <a href="/">Exit Voting</a>
      </div>
      <div className="poll-grid">
        <div className="poll-info">
          <p className="poll-title">Best Drake Album</p>
          <p className="poll-description">
            Celebrating the Drake album that delivers the most iconic blend of
            lyrics, production, and cultural impact.
          </p>
        </div>
        <div className="poll-options-grid">
          <div className="options-div">
            <img src="/Rectangle 68.png" alt="Option 1" />
            <p>Take Care</p>
          </div>
          <div className="options-div">
            <img src="/Rectangle 69.png" alt="Option 2" />
            <p>Certified Lover Boy</p>
          </div>
          <div className="options-div">
            <img src="/Rectangle 70.png" alt="Option 3" />
            <p>For All the Dogs</p>
          </div>
          <div className="options-div">
            <img src="/Rectangle 71.png" alt="Option 4" />
            <p>Views</p>
          </div>
          <div className="options-div">
            <img src="/Rectangle 72.png" alt="Option 5" />
            <p>Thank Me Later</p>
          </div>
          <div className="options-div">
            <img src="/Rectangle 73.png" alt="Option 6" />
            <p>$ome $exy $ongs 4 U</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteForm;
