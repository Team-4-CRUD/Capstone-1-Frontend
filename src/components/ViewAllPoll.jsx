import React, { useState } from "react";
import "../styles/ViewAllPoll.css";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import arrowLeft from "../assets/images/arrowLeft.png";

function ViewAllPoll() {
  const [Forms, setForms] = useState([]);
  const [filterStatus, setFilterStatus] = useState("published");

  useEffect(() => {
    document.body.classList.add("Allpoll-page");

    return () => {
      document.body.classList.remove("Allpoll-page");
    };
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/PollForm");

      setForms(data || []);
    } catch (err) {
      console.error("Error fetching poll forms!", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPolls = Forms.filter((poll) => poll.status === filterStatus);

  return (
    <>
      {/* <div className="home-nav">
        <img src={arrowLeft} alt="nav-btn" />
        <a href="/">Back Home</a>
      </div> */}
      {/* <div className="container">
        <h1 className="allpolls-title">All Polls</h1>
        <div className="search-container">
          <input
            type="text"
            className="all-polls-search"
            placeholder="Search..."
          />
        </div>
      </div> */}

      <div>
        <label htmlFor="status-select">View Polls:</label>
        <select
          id="status-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="published">Published</option>
          <option value="ended">Ended</option>
        </select>
      </div>

      {/* Poll list */}
      {filteredPolls.length > 0 ? (
        <ul>
          {filteredPolls.map((poll, index) => (
            <li key={index}>
              <div>
                <NavLink
                  to={
                    poll.status === "published"
                      ? `/Vote/${poll.pollForm_id}`
                      : `/Results/${poll.pollForm_id}`
                  }
                >
                  <h3>{poll.title}</h3>
                </NavLink>
                <p>{poll.description}</p>
                <p>Status: {poll.status}</p>
                <p>Options: {poll.pollElements?.length || 0}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-poll-message">No {filterStatus} polls available.</p>
      )}
    </>
  );
}

export default ViewAllPoll;
