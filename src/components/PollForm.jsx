import React from "react";
import "../styles/pollForm.css";

function PollForm() {
  return (
    <div className="poll-container">
      <div className="exit-nav">
        <img src="/arrowLeft.png" alt="Exit" />
        <p>Exit Voting</p>
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
          <img src="/Rectangle 68.png" alt="Option 1" />
          <img src="/Rectangle 69.png" alt="Option 2" />
          <img src="/Rectangle 70.png" alt="Option 3" />
          <img src="/Rectangle 71.png" alt="Option 4" />
          <img src="/Rectangle 72.png" alt="Option 5" />
          <img src="/Rectangle 73.png" alt="Option 6" />
        </div>
      </div>
    </div>
  );
}

export default PollForm;
