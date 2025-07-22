import React from "react";
// import "/.HomeStyles.css";

// const Home = () => {
//   return (
//     <div>
//       <h1>Hello React!</h1>
//       <img className="react-logo" src="/react-logo.svg" alt="React Logo" />
//     
//     </div>
//   );
// };
const Home = () => {
  return (
    <div className="app-container">
      <img 
        className="coolphoto" 
        src="/cool.jpg" 
        alt="Fullscreen background" 
      />
      <div className="content">
        <h1>Hello React!</h1>
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />
      </div>
    </div>
  );
};


export default Home;


