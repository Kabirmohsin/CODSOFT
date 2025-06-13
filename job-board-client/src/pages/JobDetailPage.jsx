import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetailPage.css";

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
    salary: "₹8-12 LPA",
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
    salary: "₹10-15 LPA",
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
    salary: "₹12-18 LPA",
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
    salary: "₹6-10 LPA",
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
    salary: "₹9-14 LPA",
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
    salary: "₹3-5 LPA",
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
    salary: "₹15-22 LPA",
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
    salary: "₹10-16 LPA",
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
    salary: "₹12-20 LPA",
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
    salary: "₹8-14 LPA",
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
    salary: "₹18-25 LPA",
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
    salary: "₹6-9 LPA",
  },
];

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobId = parseInt(id, 10);
  const job = jobs.find((job) => job.id === jobId);

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });
  const [formError, setFormError] = useState("");

  if (!job) {
    return (
      <div className="job-detail-page">
        <h2>Job not found</h2>
        <button onClick={() => navigate("/jobs")}>Back to Job Listings</button>
      </div>
    );
  }

  const openApplyForm = () => {
    setShowApplyForm(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
    });
    setFormError("");
  };

  const closeApplyForm = () => setShowApplyForm(false);

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
    alert(`Application submitted for ${job.title} by ${formData.fullName}`);
    closeApplyForm();
  };

  return (
    <div className="job-detail-page">
      <button className="back-btn" onClick={() => navigate("/jobs")}>
        &larr; Back to Jobs
      </button>
      <h1>{job.title}</h1>
      <h3>{job.company}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Job Type:</strong> {job.type}</p>
      <p><strong>Experience Required:</strong> {job.experience}</p>
      <p><strong>Openings:</strong> {job.openings}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong></p>
      <p className="job-description">{job.description}</p>

      <button className="apply-btn" onClick={openApplyForm}>
        Apply Now
      </button>

      {showApplyForm && (
        <div className="modal-overlay" onClick={closeApplyForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Apply for {job.title} at {job.company}</h2>
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

export default JobDetailPage;
