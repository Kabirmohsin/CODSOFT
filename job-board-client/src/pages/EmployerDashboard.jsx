import React, { useState } from "react";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Full Stack Developer",
      location: "Remote",
      type: "Full-Time",
      description: "We are hiring a Full Stack Developer with React and Node.js experience.",
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = jobs.length + 1;
    setJobs([...jobs, { id, ...newJob }]);
    setNewJob({ title: "", location: "", type: "", description: "" });
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>

      <section className="account-info">
        <h2>Account Info</h2>
        <p><strong>Company:</strong> ABC Tech Pvt Ltd</p>
        <p><strong>Email:</strong> hr@abctech.com</p>
      </section>

      <section className="job-postings">
        <h2>Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.type} | {job.location}</p>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="job-form">
        <h2>Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newJob.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Job Type (e.g., Full-Time)"
            value={newJob.type}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Post Job</button>
        </form>
      </section>
    </div>
  );
};

export default EmployerDashboard;
