import React from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaMoneyCheckAlt,
  FaVideo,
  FaHeart,
} from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-intro">
        <h1>
          About <span>UpSkill</span>
        </h1>
        <p>Your Gateway to Knowledge and Professional Growth</p>
      </div>
      <div className="card-row">
        <section className="card-style-section">
          <h2>Who We Are</h2>
          <p>
            UpSkill is a modern Learning Management System built to connect
            passionate learners with top-quality content. Whether you're a
            student, working professional, or educator, UpSkill gives you the
            tools to grow.
          </p>
        </section>

        <section className="card-style-section">
          <h2>Our Mission</h2>
          <p>
            We aim to make learning accessible, engaging, and personalized for
            everyone. Our platform blends intuitive design with powerful
            features like custom course paths, progress tracking, and real-time
            updates.
          </p>
        </section>
      </div>

      <section className="about-section features-section">
        <h2>Why Choose UpSkill?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaUserGraduate className="feature-icon" />
            <p>Comprehensive Course Management</p>
          </div>
          <div className="feature-card">
            <FaMoneyCheckAlt className="feature-icon" />
            <p>Secure Payment Integration</p>
          </div>
          <div className="feature-card">
            <FaVideo className="feature-icon" />
            <p>High-Quality Video Content</p>
          </div>

          <div className="feature-card">
            <FaHeart className="feature-icon" />
            <p>Student-Centered Design</p>
          </div>
        </div>

        <button className="explore-btn" onClick={() => navigate("/courses")}>
          Explore Courses
        </button>
      </section>
    </div>
  );
};

export default About;
