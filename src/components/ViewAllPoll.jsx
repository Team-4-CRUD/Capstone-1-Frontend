import React, { useState } from "react";
import "../styles/ViewAllPoll.css";
import { useEffect } from "react";
import axios from "axios";
import { Form, NavLink } from "react-router-dom";
import arrowLeft from "../assets/images/arrowLeft.png";
import Link from "../assets/images/link.png";

function ViewAllPoll() {
  const [Forms, setForms] = useState([]);
  const [filterStatus, setFilterStatus] = useState("published");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.classList.add("Allpoll-page");

    return () => {
      document.body.classList.remove("Allpoll-page");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/PollForm");

        // For each poll, fetch totalVotes
        const updatedForms = await Promise.all(
          data.map(async (poll) => {
            try {
              const res = await axios.get(
                `http://localhost:8080/api/vote/TotalVoteCast/${poll.pollForm_id}`
              );
              //includes everything from the original poll, plus totalVotes
              return { ...poll, totalVotes: res.data.totalVotes || 0 };
            } catch {
              return { ...poll, totalVotes: 0 };
            }
          })
        );

        setForms(updatedForms);
      } catch (err) {
        console.error("Error fetching forms:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = Forms.filter(
    (item) =>
      item.status === filterStatus &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const title = "This is an alert";
  // const description = "Thanks for subscribing to our newsletter!";

  return (
    <>
      {/* <div className="home-nav">
        <img src={arrowLeft} alt="nav-btn" />
        <a href="/">Back Home</a>
      </div> */}{" "}
      <div className="container">
        <div className="flexAllpoll">
          <h1 className="allpolls-title">All Polls</h1>
          <div>
            <label htmlFor="status-select" className="viewPoll-title">
              View Polls:
            </label>
            <select
              id="status-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="selection-dropdown-allPolls"
            >
              <option value="published"> Published </option>
              <option value="ended"> Results </option>
            </select>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="all-polls-search-bar"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
      </div>
      {filteredItems.length > 0 ? (
        <div className="Allpolls-grid">
          {filteredItems.map((poll, index) => (
            <NavLink
              to={
                poll.status === "published"
                  ? `/Vote/${poll.pollForm_id}`
                  : `/Results/${poll.pollForm_id}`
              }
              className="poll-link"
              key={index}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tooltip-container">
                <div className="box-1">
                  <p>{poll.title}</p>
                </div>
                <span
                  className="tooltip"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigator.clipboard.writeText(
                      `${window.location.origin}/Vote/${poll.pollForm_id}`
                    );
                    alert("Link copied to clipboard!");
                  }}
                >
                  <img src={Link} alt="Link Png" />
                </span>
                <p>Current Votes: {poll.totalVotes}</p>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <p className="no-poll-message">No {filterStatus} polls available.</p>
      )}
    </>
  );
}

export default ViewAllPoll;
