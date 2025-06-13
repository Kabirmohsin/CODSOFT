import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchTitle.trim()) {
      query.append("title", searchTitle.trim());
    }
    if (searchLocation.trim()) {
      query.append("location", searchLocation.trim());
    }
    navigate(`/jobs?${query.toString()}`);
  };

  return (
    <div className="homepage-container">
      {/* Search Section */}
      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder='City, state, zip code, or "remote"'
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button type="submit" className="find-jobs-btn">
          Find Jobs
        </button>
      </form>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-img-container">
          <img
            src="https://img.freepik.com/free-photo/application-occupation-profession-job-seeker-concept_53876-122755.jpg"
            alt="Welcome"
            className="hero-img"
          />
        </div>
        <h1>Welcome to JobBoard!</h1>
        <p>Create an account or sign in to see personalized job recommendations.</p>
        <button className="cta-button" onClick={openModal}>
          Get Started
        </button>
        <p className="secondary-links">
          <a href="/post-resume">Post your resume</a> – It only takes a few seconds
          <br />
          Employers: <a href="/post-job">Post a job</a>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Ready to take the next step?</h2>
            <p>
              Create an account or sign in.
              <br />
              By creating an account or signing in, you understand and agree to Job board Terms. You also consent to our Cookie and Privacy policies. You will receive marketing messages from Indeed and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.
            </p>
            <button
              className="auth-button google"
              onClick={() => alert("Continue with Google")}
            >
              Continue with Google
            </button>
            <button
              className="auth-button apple"
              onClick={() => alert("Continue with Apple")}
            >
              Continue with Apple
            </button>
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
