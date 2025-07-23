import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

function ViewAllCreatorPolls() {
  const [dataPoll, setDataPoll] = useState([]);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/creator/my-polls",
        {
          withCredentials: true,
        }
      );

      setDataPoll(data || []);
      console.log("👤 creator_id from user.id:", user.id);
    } catch (err) {
      console.error("Error fetching poll forms!", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (PollFormId) => {
    try {
      await axios.delete(`http://localhost:8080/api/PollForm/${PollFormId}`);
      setDataPoll((prev) =>
        prev.filter((poll) => poll.pollForm_id !== PollFormId)
      );
    } catch (error) {
      console.error("Failed to delete Poll Form: ", error);
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

      // Update state to reflect new status
      setDataPoll((prevPolls) =>
        prevPolls.map((poll) =>
          poll.pollForm_id === pollId ? { ...poll, status: "published" } : poll
        )
      );
    } catch (error) {
      console.error("Failed to publish poll:", error);
    }
  };

  // Prevent errors for mapping
  const polls = Array.isArray(dataPoll) ? dataPoll : [];

  if (!user) {
    return <p>Please log in to view your polls.</p>;
  }

  return (
    <div>
      <h1>{user.username} PollForms</h1>

      <ul>
        {polls.length > 0 ? (
          polls.map((poll, index) => (
            <li key={index}>
              <div>
                <NavLink to={`/polls/${poll.pollForm_id}`}>
                  <h3>{poll.title}</h3>
                </NavLink>
                <p>{poll.description}</p>
                <p>Status: {poll.status}</p>
                <p>Options: {poll.pollElements?.length || 0}</p>
              </div>
              <div>
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

                    <button
                      onClick={() => handlePublish(poll.pollForm_id)}
                      disabled={!poll.pollForm_id}
                    >
                      Publish
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No polls found or loading failed.</p>
        )}
      </ul>
    </div>
  );
}

export default ViewAllCreatorPolls;
