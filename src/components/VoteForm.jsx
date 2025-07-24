import React, { useState } from "react";
import "../styles/voteForm.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function VoteForm() {
  useEffect(() => {
    document.body.classList.add("poll-form-page");

    return () => {
      document.body.classList.remove("poll-form-page");
    };
  }, []);

  const [currentForm, setCurrentForm] = useState([]);
  const [userRankings, setUserRankings] = useState([]); // State to store user rank's
  const [selectedRanks, setSelectedRanks] = useState([]);
  const { VoteFormID } = useParams();

  const fetchVotingPoll = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/PollForm/${VoteFormID}`
      );
      setCurrentForm(data || []);
      console.log("Voting Form fetched:", data);
    } catch (error) {
      console.log("Error fetching voting form:", error);
    }
  };

  useEffect(() => {
    fetchVotingPoll();
  }, [VoteFormID]);

  useEffect(() => {
    console.log("Updated currentForm:", currentForm);
  }, [currentForm]);

  const handleRankChange = (elementID, event) => {
    const selectedRank = Number(event.target.value);

    if (
      isNaN(selectedRank) ||
      selectedRank <= 0 ||
      selectedRank > currentForm.pollElements.length
    ) {
      alert(
        "Please select a valid rank between 1 and " +
          currentForm.pollElements.length
      );
      return;
    }

    if (selectedRanks.includes(selectedRank)) {
      alert(
        "This rank has already been assigned to another element. Please choose a unique rank."
      );
      return;
    }

    setSelectedRanks((prevRanks) => {
      const updatedRanks = prevRanks.filter((rank) => rank !== selectedRank);
      updatedRanks.push(selectedRank);
      return updatedRanks;
    });

    setUserRankings((prevData) => ({
      ...prevData,
      // Update the rank for the specific element using its unique ID (elementID)
      // Convert the selected rank (which is a string) to a number using `Number()`
      [elementID]: Number(event.target.value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    {
      /* COMMENT: to help me remember Object.keys() */
    }

    // Create the array of votes by iterating over each element in userRankings
    const votes = Object.keys(userRankings).map((elementID) => ({
      user_id: currentForm.creator_id,
      poll_id: VoteFormID,

      // element_id: The ID of the poll element the user is voting on (from the current poll element)
      element_id: elementID, // `elementID` comes from the keys of userRankings

      // rank: The rank the user selected for the current poll element (from userRankings state)
      rank: userRankings[elementID], // Fetch the rank for the given elementID from state
    }));

    // The resulting `votes` array will contain an object for each element the user has ranked.

    try {
      const res = await axios.post(
        "http://localhost:8080/api/vote/submit",
        votes
      );
    } catch (error) {
      console.error();
      console.log("Error sending data");
    }
  };

  const isFormValid =
    currentForm.pollElements &&
    currentForm.pollElements.length > 0 &&
    selectedRanks.length === currentForm.pollElements.length;

  return (
    // <div className="poll-container">
    //   <div className="exit-nav">
    //     <img src="/arrowLeft.png" alt="Exit" />
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
      {currentForm && currentForm.title && <h2>{currentForm.title}</h2>}

      <form onSubmit={handleSubmit}>
        {currentForm.pollElements &&
          Array.isArray(currentForm.pollElements) &&
          currentForm.pollElements.map((poll, index) => (
            <div key={index} className="option">
              <p>{poll.option}</p>
              <select
                name="rank"
                id={`rank-${index}`}
                value={userRankings[poll.element_id] || ""}
                onChange={(e) => handleRankChange(poll.element_id, e)}
              >
                {/* Loops through and gives you each rank number (1-based) */}
                {/* Renders all rank options: Rank 1, Rank 2, etc. */}
                <option value="">Select rank</option>
                {[...Array(currentForm.pollElements.length)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Rank {i + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        <button disabled={!isFormValid}>Submit</button>
      </form>
    </>
  );
}

export default VoteForm;
