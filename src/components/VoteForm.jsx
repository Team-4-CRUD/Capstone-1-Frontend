import React, { useState, useEffect } from "react";
import "../styles/voteForm.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "../assets/images/arrowLeft.png";

function VoteForm() {
  const [pollForm, setPollForm] = useState([]);
  const [userSelections, setUserSelections] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");
  const [warnedAboutIncomplete, setWarnedAboutIncomplete] = useState(false);
  const { pollFormId } = useParams();

  useEffect(() => {
    document.body.classList.add("poll-form-page");
    return () => {
      document.body.classList.remove("poll-form-page");
    };
  }, []);

  const fetchPollForm = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/PollForm/${pollFormId}`
      );
      setPollForm(data || []);
      if (data.hasVoted) {
        setHasVoted(true);
        setMessage("You have already voted on this poll.");
      }
    } catch (error) {
      console.log("Error fetching poll form:", error);
    }
  };

  const checkIfVoted = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/vote/has-voted/${pollFormId}`,
        { withCredentials: true }
      );
      if (res.data.hasVoted) {
        setHasVoted(true);
        setMessage("You have already voted on this poll.");
      } else {
        fetchDraft();
      }
    } catch (error) {
      console.log("Error checking if voted: ", error);
    }
  };

  const fetchDraft = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/drafts/draft/${pollFormId}`,
        { withCredentials: true }
      );
      if (res.data.partialRes) {
        const selections = {};
        res.data.partialRes.forEach(({ elementId, rank }) => {
          selections[elementId] = rank;
        });
        setUserSelections(selections);
        setMessage("Loaded your saved draft.");
      }
    } catch (err) {
      console.log("No draft found or error loading draft:", err);
    }
  };

  const handleRankSelection = (optionId, event) => {
    setUserSelections((prevSelections) => ({
      ...prevSelections,
      [optionId]: Number(event.target.value),
    }));
  };

  const handleSaveDraft = async () => {
    const formattedSelections = Object.keys(userSelections).map((key) => ({
      elementId: Number(key),
      rank: userSelections[key],
    }));

    try {
      await axios.patch(
        "http://localhost:8080/api/drafts/save-draft",
        {
          PollFormId: pollFormId,
          partialRes: formattedSelections,
        },
        { withCredentials: true }
      );
      setMessage("Draft saved successfully.");
    } catch (err) {
      console.error("Error saving draft:", err);
      setMessage("Could not save your draft. Please try again.");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formattedSelections = Object.keys(userSelections).map((key) => ({
      elementId: Number(key),
      rank: userSelections[key],
    }));

    const totalOptions = pollForm?.pollElements?.length || 0;

    if (formattedSelections.length !== totalOptions) {
      if (!warnedAboutIncomplete) {
        setWarnedAboutIncomplete(true);
        setMessage(
          "Warning: You haven't ranked all options. Click submit again to confirm."
        );
        return;
      }
    }

    const ranks = Object.values(userSelections);
    const uniqueRanks = new Set(ranks);

    if (ranks.length !== uniqueRanks.size) {
      setMessage("Each rank must be unique. Please check your selections.");
      return;
    }

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
      console.log(response.data);
      setHasVoted(true);
      setMessage("Thank you for voting! Your response has been recorded.");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("You have already voted on this poll.");
        setHasVoted(true);
      } else {
        setMessage("Error submitting vote. Please try again later.");
      }
      console.error("Error submitting vote:", error);
    }
  };

  useEffect(() => {
    fetchPollForm();
    checkIfVoted();
  }, [pollFormId]);

  return (
    <>
      <div className="poll-container">
        <div className="exit-nav">
          <img src={arrowLeft} alt="Exit" />
          <Link to="/AllPolls">Exit Voting</Link>
        </div>
        <div className="poll-grid">
          <div className="poll-info">
            {pollForm?.title && <p className="poll-title">{pollForm.title}</p>}
            <p className="poll-description">{pollForm.description}</p>
            {message && (
              <div
                style={{
                  margin: "1rem 0",
                  color: hasVoted ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {message}
              </div>
            )}
          </div>
          <form onSubmit={handleFormSubmit} className="poll-options-form">
            {pollForm.pollElements?.length > 0 && (
              <div className="poll-options-grid">
                {pollForm.pollElements.map((element, index) => (
                  <div key={index} className="options-div">
                    <p>{element.option}</p>
                    <select
                      name="rank"
                      id={`rank-${index}`}
                      value={userSelections[element.element_id] || ""}
                      onChange={(e) =>
                        handleRankSelection(element.element_id, e)
                      }
                      disabled={hasVoted}
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
              </div>
            )}
            <div className="button-container">
              <button className="submit-button" disabled={hasVoted}>
                Submit
              </button>
              {!hasVoted && (
                <button
                  type="button"
                  className="save-draft-button"
                  onClick={handleSaveDraft}
                  style={{ marginLeft: "1rem" }}
                >
                  Save Draft
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VoteForm;

{
  /* <div className="poll-options-grid">
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
      </div> */
}

{
  /* {pollForm && pollForm.title && <h2>{pollForm.title}</h2>}

{message && (
  <div
  style={{
    margin: "1rem 0",
    color: hasVoted ? "green" : "red",
    fontWeight: "bold",
    }}
    >
    {message}
    </div>
    )}
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
      disabled={hasVoted}
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
        <button disabled={hasVoted}>Submit</button>
        </form> */
}
