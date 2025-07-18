import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewAllPoll() {
  const [dataPoll, setDataPoll] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/PollForm");
      setDataPoll(data || []);
      console.log(data);
    } catch (err) {
      console.error("Error fetching!", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {dataPoll.map((poll, index) => (
        <div key={index}>
          <h3>{poll.title}</h3>
          <p>{poll.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewAllPoll;
