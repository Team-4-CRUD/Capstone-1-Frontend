import React from "react";
// import homeBG from "../assets/images/homeBG.jpg";
import "../styles/HomeStyles.css";
import { useEffect } from "react";

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
          <div className="s1">1</div>
          <div className="s2">1</div>
          <div className="s3">1</div>
        </div>
      </div>
    </>
  );
};

export default Home;
