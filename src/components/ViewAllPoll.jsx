import React from "react";
import "../styles/ViewAllPoll.css";
import { useEffect } from "react";

function ViewAllPoll() {
  useEffect(() => {
    document.body.classList.add("Allpoll-page");

    return () => {
      document.body.classList.remove("Allpoll-page");
    };
  }, []);

  return (
    <>
      <h1 className="allpolls-title">All Polls</h1>
    </>
  );
}

export default ViewAllPoll;
