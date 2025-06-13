import React, { useState } from "react";
import "./CandidateDashboard.css";

function CandidateDashboard() {
  const [applications, setApplications] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", status: "Applied" },
    { id: 2, title: "Backend Developer", company: "Microsoft", status: "Under Review" },
    { id: 3, title: "UI/UX Designer", company: "Facebook", status: "Rejected" },
  ]);

  const [savedJobs, setSavedJobs] = useState([
    "Full Stack Developer - Amazon",
    "Data Scientist - Netflix",
  ]);

  const [newSavedJob, setNewSavedJob] = useState("");

  // Remove application by id
  const removeApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  // Add a new saved job
  const addSavedJob = () => {
    if (newSavedJob.trim() !== "") {
      setSavedJobs([...savedJobs, newSavedJob.trim()]);
      setNewSavedJob("");
    }
  };

  // Remove saved job by index
  const removeSavedJob = (index) => {
    setSavedJobs(savedJobs.filter((_, i) => i !== index));
  };

  return (
    <div className="candidate-dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back, Candidate!</h1>
        <p>Here’s an overview of your job applications and saved jobs.</p>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <h2>My Applications</h2>
          <ul>
            {applications.map(({ id, title, company, status }) => (
              <li key={id}>
                <strong>{title}</strong> - {company}{" "}
                <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>{status}</span>
                <button onClick={() => removeApplication(id)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Saved Jobs</h2>
          <ul>
            {savedJobs.map((job, index) => (
              <li key={index}>
                {job}
                <button onClick={() => removeSavedJob(index)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add new saved job"
            value={newSavedJob}
            onChange={(e) => setNewSavedJob(e.target.value)}
          />
          <button onClick={addSavedJob} className="add-btn">Add Job</button>
        </div>

        <div className="card">
          <h2>Profile Completion</h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: "75%" }}></div>
          </div>
          <p>75% complete. Update your profile for better job matches!</p>
        </div>
      </section>
    </div>
  );
}

export default CandidateDashboard;
