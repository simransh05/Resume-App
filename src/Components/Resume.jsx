import React, { useEffect, useState } from "react";
import "../Form.css";
import { useNavigate } from "react-router-dom";

function Resume() {
  const [resumeData, setResumeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
  }, []);


  if (!resumeData) return <p>No resume data found. Please fill the form first.</p>;

  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>{resumeData.name}</h1>
        <p>{resumeData.email} | {resumeData.phone} | {resumeData.dob}</p>
      </div>

      <div className="resume-section">
        <h2>Summary</h2>
        <p>{resumeData.bio}</p>
      </div>

      <div className="resume-section">
        <h2>Experience</h2>
        <ul>
          {resumeData.experience.map((exp, index) => (
            <li key={index}>{exp.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <p>{resumeData.education}</p>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <ul>
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>
      </div>

      

      {/* Projects */}
      <div className="resume-section">
        <h2>Projects</h2>
        <ul>
          {resumeData.projects.map((project, index) => (
            <li key={index}>{project.trim()}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/create")} className="btn">Home</button>
    </div>
  );
}

export default Resume;
