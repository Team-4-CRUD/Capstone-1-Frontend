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
      setDataPoll((prev) => prev.filter((poll) => poll.pollForm_id !== PollFormId));
    } catch (error) {
      console.error("Failed to delete Poll Form: ", error);
    }
  };

  // Prevent errors for mapping
  const polls = Array.isArray(dataPoll) ? dataPoll : [];

  return (
    <div>
      <h1>{user.username} PollForms</h1>
      <p>Creator ID: {user ? user.id : "Not logged in"}</p>
      <NavLink to="/pollmaker">Add another form</NavLink>

      <ul>
        {polls.length > 0 ? (
          polls.map((poll, index) => (
            <li key={index}>
              <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <p>Number of options: {poll.pollElements?.length || 0}</p>
              </div>
              <div>
                <button onClick={() => handleDelete(poll.pollForm_id)}>
                  Delete Form
                </button>
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
