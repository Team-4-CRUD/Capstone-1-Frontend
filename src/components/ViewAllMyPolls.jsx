import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/CreatorPollsStyles.css";
import arrowLeft from "../assets/images/arrowLeft.png";
import arrowRight from "../assets/images/arrowRight.png";
import { Link } from "react-router-dom";

function ViewAllMyPolls() {
  const [filterStatus, setFilterStatus] = useState("createdPolls");
  const [dataPoll, setDataPoll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    document.body.classList.add("Creator-page");
    return () => {
      document.body.classList.remove("Creator-page");
    };
  }, []);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const url =
        filterStatus === "createdPolls"
          ? "http://localhost:8080/api/creator/my-polls"
          : "http://localhost:8080/api/vote/voted-polls";

      const { data } = await axios.get(url, { withCredentials: true });

      // For createdPolls, data is an array of polls
      // For votedPolls, data.votedPolls is the array
      const polls =
        filterStatus === "createdPolls" ? data : data.votedPolls || [];

      setDataPoll(polls);
    } catch (err) {
      console.error("Error fetching polls!", err);
      setError("Failed to fetch polls.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus, user]);

  const handleDelete = async (pollFormId) => {
    try {
      await axios.delete(`http://localhost:8080/api/PollForm/${pollFormId}`, {
        withCredentials: true,
      });
      setDataPoll((prev) =>
        prev.filter((poll) => poll.pollForm_id !== pollFormId)
      );
    } catch (error) {
      console.error("Failed to delete Poll Form:", error);
    }
  };

  const handlePublish = async (pollId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/creator/${pollId}/publish`,
        {},
        { withCredentials: true }
      );
      console.log(res.data.message);

      setDataPoll((prevPolls) =>
        prevPolls.map((poll) =>
          poll.pollForm_id === pollId ? { ...poll, status: "published" } : poll
        )
      );
    } catch (error) {
      console.error("Failed to publish poll:", error);
    }
  };

  const handleEnd = async (pollId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/creator/${pollId}/end`,
        {},
        { withCredentials: true }
      );
      console.log(res.data.message);

      setDataPoll((prevPolls) =>
        prevPolls.map((poll) =>
          poll.pollForm_id === pollId ? { ...poll, status: "ended" } : poll
        )
      );
    } catch (error) {
      console.error("Failed to end poll:", error);
    }
  };

  const handleDuplicate = async (pollId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/creator/${pollId}/duplicate`,
        {},
        { withCredentials: true }
      );
      fetchData();
    } catch (error) {
      console.error("Failed to duplicate poll:", error);
    }
  };

  if (!user) {
    return <p className="auth-message">Please log in to view your polls.</p>;
  }

  return (
    <div className="creator-container">
      <div className="nav-container-creator">
        <div className="home-nav-creator">
          <img src={arrowLeft} alt="home nav" />
          <Link to="/">Back Home</Link>
        </div>
        <div className="create-poll-container">
          <Link to="/pollmaker">Create Poll</Link>
          <img src={arrowRight} alt="create poll nav" />
        </div>
      </div>
      <div className="title-select-container">
        <h1 className="creatorAllpolls-title">Your Polls</h1>
        <div className="select-container">
          <label htmlFor="status-select">View Forms: </label>
          <select
            id="status-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="selection-dropdown"
          >
            <option value="createdPolls">My Polls</option>
            <option value="votedPolls">My Voted-on Polls</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading polls...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : dataPoll.length > 0 ? (
        <div className="poll-grid-creator">
          {dataPoll
            .filter((poll) => poll && poll.pollForm_id)
            .map((poll) => (
              <div
                key={poll.pollForm_id}
                className="poll-card"
                onClick={() => navigate(`/polls/${poll.pollForm_id}`)}
              >
                <h3>{poll.title}</h3>
                {filterStatus === "createdPolls" ? (
                  <>
                    <p>{poll.description}</p>
                    <p>Status: {poll.status}</p>
                    <p>Options: {poll.pollElements?.length || 0}</p>
                    {poll.picture && (
                      <img
                        src={poll.picture}
                        alt="Poll"
                        style={{ maxWidth: "200px", maxHeight: "150px" }}
                      />
                    )}
                  </>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#555" }}>
                    You voted on this poll.
                  </p>
                )}

                {filterStatus === "createdPolls" && (
                  <div
                    style={{ marginTop: "10px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleDelete(poll.pollForm_id)}
                      className="delete-btn-creator"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/polls/edit/${poll.pollForm_id}`)
                      }
                      className="edit-btn-creator"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublish(poll.pollForm_id)}
                      className="Publish-btn-creator"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => handleDuplicate(poll.pollForm_id)}
                      className="duplicate-btn-creator"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleEnd(poll.pollForm_id)}
                      className="end-btn-creator"
                    >
                      End
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <p>No polls found.</p>
      )}
    </div>
  );
}

export default ViewAllMyPolls;
