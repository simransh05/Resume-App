import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Resume.css";

function Resume() {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/resume/${id}`);
        setResumeData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResume();
  }, [id]);



  if (!resumeData) return <h2>Loading...</h2>;

  return (
    <div className="resume-container">
      <div className="resume-sidebar">
        <h2>CONTACT</h2>
        <ul>
          <li>{resumeData.email}</li>
          <li>{resumeData.phone}</li>
          <li>{resumeData.dob}</li>
        </ul>

        <h2>SKILLS</h2>
        <ul>
          {resumeData.skills?.map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>

        <h2>PROJECTS</h2>
        <ul>
          {resumeData.projects?.map((project, index) => (
            <li key={index}>{project.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="resume-main">
        <div className="resume-header">
          <h1>{resumeData.name}</h1>
        </div>

        <div className="resume-section">
          <h2>Summary</h2>
          <p>{resumeData.bio}</p>
        </div>

        <div className="resume-section">
          <h2>Experience</h2>
          <ul>
            {resumeData.experience?.map((exp, index) => (
              <li key={index}>{exp.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="resume-section">
          <h2>Education</h2>
          <p>{resumeData.education}</p>
        </div>

        <div className="homeBtn">
          <button onClick={() => navigate("/create")} className="btn"> Home </button>
        </div>
        
      </div>
    </div>
  );
}

export default Resume;
