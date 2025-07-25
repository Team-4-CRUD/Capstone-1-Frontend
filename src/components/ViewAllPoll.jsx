import React, { useState } from "react";
import "../styles/ViewAllPoll.css";
import { useEffect } from "react";
import axios from "axios";
import { Form, NavLink } from "react-router-dom";
import arrowLeft from "../assets/images/arrowLeft.png";

function ViewAllPoll() {
  useEffect(() => {
    document.body.classList.add("Allpoll-page");

    return () => {
      document.body.classList.remove("Allpoll-page");
    };
  }, []);

  const [Forms, setForms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/PollForm");

      setForms(data || []);
    } catch (err) {
      console.error("Error fetching poll forms!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = Forms.filter(
    (item) =>
      item.status === "published" &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {/* <div className="home-nav">
        <img src={arrowLeft} alt="nav-btn" />
        <a href="/">Back Home</a>
      </div> */}
      <div className="container">
        <h1 className="allpolls-title">All Polls</h1>
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
              to={`/Vote/${poll.pollForm_id}`}
              className="poll-link"
              key={index}
            >
              <div className="box-1">
                <p>{poll.title}</p>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <p className="no-poll-message">No polls available.</p>
      )}
    </>
  );
}

export default ViewAllPoll;
