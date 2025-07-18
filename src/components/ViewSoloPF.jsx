import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_BASE = "http://localhost:8080/api";

const ViewSoloPF = () => {
  const { id } = useParams(); // get id from URL
  const [PollMaker, setPollMaker] = useState({});

  const fetchPollForm = async () => {
    try {
       console.log("ID from useParams:", id);
      const res = await axios.get(`${API_BASE}/PollForm${id}`);
      console.log("THIS OUR DATA", res.data);
      setPollMaker(res.data);
    } catch (error) {
      console.error("Error fetching PollForm data:", error);
    }
  };

  useEffect(() => {
    fetchPollForm();
  }, [id]);

  return (
    <>
      <h1> yoo </h1>
      <h1>{PollMaker.title}</h1>
      <p>{PollMaker.description}</p>
    </>
  );
};

export default ViewSoloPF;
