  import { useEffect, useState } from "react";
  import { useParams, Link, useNavigate } from "react-router-dom";
   import axios from "axios";
   const API_BASE = "http://localhost:8080/api";

import React from "react";
const ViewSoloPF = () => {
   const {  pollForm_id } = useParams();
   const [PollMaker, setPollMaker] = useState(null);

   useEffect(() => {
    const fetchPollForms = async () => {
      try{
        const {data} = await axios.get(`${API_BASE}/PollForm/${pollForm_id}`);
         setPollMaker(data);
      } catch(error){
         console.error("Error fetching PollForm data:", error)
      }
   };

    fetchPollForms();
   }, [pollForm_id]);

  return (
    <>
    <h1> yoo </h1>
    </>
    
  );
};

export default ViewSoloPF;
