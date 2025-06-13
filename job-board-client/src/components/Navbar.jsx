import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">jobBoard</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Job Listings</Link></li>
        <li><Link to="/candidate">Candidate Dashboard</Link></li>
        <li><Link to="#">Salary Guide</Link></li>
        <li><Link to="/employer">Employers / Post Job</Link></li> {/* ✅ Added Employer Dashboard link */}
      </ul>
      <div className="navbar-auth">
        <Link to="/register">Sign In</Link>
        <span> | </span>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
