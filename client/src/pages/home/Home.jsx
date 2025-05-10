import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Ignite Your Potential with UpSkill</h1>
          <p>Upgrade Your Skills, Transform Your Future</p>
          <button onClick={() => navigate("/courses")} className="start-button">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
