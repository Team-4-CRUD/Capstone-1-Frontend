import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewAllCreatorPolls() {
  const [dataPoll, setDataPoll] = useState([]);
  const { creator_id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        ` http://localhost:8080/api/creator/${creator_id}`
      );
      setDataPoll(data || []);
      console.log("👤 creator_id from URL:", creator_id);
    } catch (err) {
      console.error("Error fetching poll forms!", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [creator_id]);

  //prevent erros for mapping
  const polls = Array.isArray(dataPoll) ? dataPoll : [];

  return (
    <div>
      <h1> User PollForms </h1>
      <p>Creator ID: {creator_id}</p>

      {polls.length > 0 ? (
        polls.map((poll, index) => (
          <div key={index}>
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
            <p>Number of options: {poll.pollElements.length}</p>
          </div>
        ))
      ) : (
        <p>No polls found or loading failed.</p>
      )}
    </div>
  );
}

export default ViewAllCreatorPolls;
