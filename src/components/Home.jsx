import React from "react";
// import homeBG from "../assets/images/homeBG.jpg";
import "../styles/HomeStyles.css";
import { useEffect } from "react";
import voteIcon from "../assets/images/voteIcon.png";

const Home = () => {
  useEffect(() => {
    document.body.classList.add("home-page");

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="wrapper">
          <p className="left-side">Rank the Vote</p>
          <div className="right-side">
            <p>RankUp</p>
          </div>
        </div>
      </div>
      <div className="category-container">
        <div className="title-flex">
          <p className="container-title">Categories</p>
          <p className="container-second-title">All</p>
        </div>
        <hr />
        <div className="rectangle-grid">
          <div className="s1"></div>
          <div className="s2"></div>
          <div className="s3"></div>
          <div className="s4"></div>
          <div className="s5"></div>
          <div className="s6"></div>
          <div className="s7"></div>
          <div className="s8"></div>
          <div className="s9"></div>
          <div className="s10"></div>
          <div className="s11"></div>
          <div className="s12"></div>
          <div className="s13"></div>
          <div className="s14"></div>
        </div>
      </div>
      <div className="vote-container">
        <div className="vote-title-flex">
          <p className="container-title-vote">Vote</p>
          <img
            src={voteIcon}
            alt="Vote Icon"
            className="container-second-title"
          />
        </div>
        <hr />
        <div className="voting-grid-wrapper">
          <div className="voting-grid">
            <div className="v1"></div>
            <div className="v2"></div>
            <div className="v3"></div>
            <div className="v4"></div>
            <div className="v5"></div>
            <div className="v6"></div>
          </div>
        </div>
        <div className="btn-container">
          <button className="vote-home-btn">Vote Now!</button>
        </div>
      </div>
    </>
  );
};

export default Home;
