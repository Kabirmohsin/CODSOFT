import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./JobListingsPage.css";

// ✅ Hook to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const JobListingsPage = () => {
  const [applyJob, setApplyJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });
  const [formError, setFormError] = useState("");

  const query = useQuery();
  const searchTitle = query.get("title")?.toLowerCase() || "";
  const searchLocation = query.get("location")?.toLowerCase() || "";

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      openings: 5,
      description:
        "Develop and maintain user interfaces with React.js and modern JavaScript frameworks.",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Amazon",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-6 years",
      openings: 3,
      description:
        "Build scalable backend APIs and microservices with Node.js and AWS infrastructure.",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Microsoft",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "4-7 years",
      openings: 2,
      description:
        "Implement CI/CD pipelines and manage cloud infrastructure using Azure.",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Facebook",
      location: "Remote",
      type: "Contract",
      experience: "1-3 years",
      openings: 1,
      description:
        "Design intuitive user interfaces and seamless user experiences.",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "IBM",
      location: "Chennai, India",
      type: "Full-time",
      experience: "3-5 years",
      openings: 4,
      description:
        "Analyze data and build machine learning models to solve business problems.",
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "Infosys",
      location: "Pune, India",
      type: "Internship",
      experience: "0-1 year",
      openings: 6,
      description:
        "Work across frontend and backend technologies and gain hands-on experience.",
    },
    {
      id: 7,
      title: "Cloud Architect",
      company: "Oracle",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5-8 years",
      openings: 2,
      description:
        "Design cloud computing strategies and oversee cloud architecture implementation.",
    },
    {
      id: 8,
      title: "Cybersecurity Analyst",
      company: "Cisco",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      openings: 3,
      description:
        "Monitor, detect, and respond to cybersecurity threats and vulnerabilities.",
    },
    {
      id: 9,
      title: "Machine Learning Engineer",
      company: "NVIDIA",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "4-6 years",
      openings: 2,
      description:
        "Develop machine learning models and AI algorithms for advanced applications.",
    },
    {
      id: 10,
      title: "Mobile App Developer",
      company: "Samsung",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-5 years",
      openings: 4,
      description:
        "Create and maintain mobile applications for iOS and Android platforms.",
    },
    {
      id: 11,
      title: "Product Manager - IT",
      company: "Adobe",
      location: "Remote",
      type: "Full-time",
      experience: "5-7 years",
      openings: 1,
      description:
        "Lead product development cycles for software products and coordinate cross-functional teams.",
    },
    {
      id: 12,
      title: "QA Engineer",
      company: "TCS",
      location: "Pune, India",
      type: "Full-time",
      experience: "2-4 years",
      openings: 5,
      description:
        "Design test cases, automate testing and ensure software quality assurance.",
    },
  ];

  // ✅ Filter jobs by searchTitle and searchLocation
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchTitle);
    const locationMatch = job.location.toLowerCase().includes(searchLocation);
    return titleMatch && locationMatch;
  });

  const openApplyForm = (job) => {
    setApplyJob(job);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
    });
    setFormError("");
  };

  const closeApplyForm = () => setApplyJob(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resume) {
      setFormError("Please fill all required fields and upload your resume.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");
    alert(`Application submitted for ${applyJob.title} by ${formData.fullName}`);
    closeApplyForm();
  };

  return (
    <div className="job-listings-page">
      <h1>IT Job Openings</h1>
      <p className="job-listings-subtitle">
        Explore the latest job openings in IT across top companies. Click on a job for details and apply now!
      </p>

      <ul className="job-list">
        {filteredJobs.map((job) => (
          <li key={job.id} className="job-item">
            <Link to={`/jobs/${job.id}`} className="job-link">
              <div className="job-title">{job.title}</div>
              <div className="job-company">{job.company}</div>
              <div className="job-location">{job.location}</div>
              <div className="job-details">
                <span className="job-type">{job.type}</span>
                <span className="job-experience">{job.experience} experience</span>
                <span className="job-openings">{job.openings} openings</span>
              </div>
            </Link>
            <p className="job-description">{job.description}</p>
            <button className="apply-btn" onClick={() => openApplyForm(job)}>Apply Now</button>
          </li>
        ))}
      </ul>

      {filteredJobs.length === 0 && (
        <p className="no-results">No jobs found for your search.</p>
      )}

      {applyJob && (
        <div className="modal-overlay" onClick={closeApplyForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Apply for {applyJob.title} at {applyJob.company}</h2>
            <form className="apply-form" onSubmit={handleSubmit}>
              {formError && <p className="form-error">{formError}</p>}

              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />

              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />

              <label htmlFor="resume">Upload Resume (PDF) *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                required
              />

              <label htmlFor="coverLetter">Cover Letter (Optional)</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Write a brief cover letter"
                rows="4"
              ></textarea>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">Submit Application</button>
                <button type="button" className="cancel-btn" onClick={closeApplyForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
