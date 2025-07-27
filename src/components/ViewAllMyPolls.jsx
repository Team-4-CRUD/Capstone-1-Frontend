import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ViewAllMyPolls() {
  const [filterStatus, setFilterStatus] = useState("createdPolls");
  const [dataPoll, setDataPoll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

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
    return <p>Please log in to view your polls.</p>;
  }

  return (
    <div>
      <h1>{user.username}'s PollForms</h1>

      <div>
        <label htmlFor="status-select">View Forms: </label>
        <select
          id="status-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="createdPolls">My Polls</option>
          <option value="votedPolls">My Voted-on Polls</option>
        </select>
      </div>

      {loading ? (
        <p>Loading polls...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : dataPoll.length > 0 ? (
        <ul>
          {dataPoll
            .filter((poll) => poll && poll.pollForm_id)
            .map((poll) => (
              <li key={poll.pollForm_id} style={{ marginBottom: "20px" }}>
                <div>
                  <NavLink to={`/polls/${poll.pollForm_id}`}>
                    <h3>{poll.title}</h3>
                  </NavLink>

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
                </div>

                {filterStatus === "createdPolls" && (
                  <div style={{ marginTop: "10px" }}>
                    {poll.status === "draft" && (
                      <>
                        <button onClick={() => handleDelete(poll.pollForm_id)}>
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/polls/edit/${poll.pollForm_id}`)
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => handlePublish(poll.pollForm_id)}>
                          Publish
                        </button>
                        <button
                          onClick={() => handleDuplicate(poll.pollForm_id)}
                        >
                          Duplicate
                        </button>
                      </>
                    )}
                    {poll.status === "published" && (
                      <button onClick={() => handleEnd(poll.pollForm_id)}>
                        End
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
        </ul>
      ) : (
        <p>No polls found.</p>
      )}
    </div>
  );
}

export default ViewAllMyPolls;
