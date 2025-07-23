import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function ViewSoloPF() {
  const [poll, setPoll] = useState([]);
  const { user } = useAuth();
  const { PollFormId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !PollFormId) return;
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/PollForm/${PollFormId}`,
          { withCredentials: true }
        );
        setPoll(data);
        console.log("👤 creator_id from user.id:", user.id);
      } catch (err) {
        console.error("Error fetching poll form!", err);
      }
    };

    fetchData();
  }, [user, PollFormId]);

  if (!poll) return <p>Loading...</p>;

  return (
    <>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <ul>
        {Array.isArray(poll?.pollElements) && poll.pollElements.length > 0 ? (
          poll.pollElements.map((element, index) => (
            <li key={index}>
              <div>
                <h3>{element.option}</h3>
                <p>{element.info}</p>
                <p>{element.picture}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No element found or loading failed.</p>
        )}
      </ul>
    </>
  );
}

export default ViewSoloPF;
