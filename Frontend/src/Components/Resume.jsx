import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Resume.css";
import { FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { toast } from 'react-toastify'
const API = import.meta.env.VITE_BASE_URL;

function Resume() {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API}/${id}`);
        setResumeData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResume();
  }, [id]);

  if (!resumeData) return <h2>Loading...</h2>;

  return (
    <div className="resume-panel">
      <div className="resume-container">
        <div className="resume-sidebar">
          <h2>CONTACT</h2>
          <ul>
            <li><FaEnvelope className="icon" /> {resumeData.email} </li>
            <li><FaPhone className="icon" /> {resumeData.phone} </li>
            <li><FaCalendarAlt className="icon" /> {resumeData.dob}</li>
          </ul>

          <h2>SUMMARY</h2>
          <p>{resumeData.bio}</p>

          <h2>SKILLS</h2>
          <ul>
            {resumeData.skills?.map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>

        </div>

        <div className="resume-main">
          <div className="resume-header">
            <h1>{resumeData.name}</h1>
          </div>

          <div className="resume-section">
            <h2>Experience</h2>
            <ul>
              {resumeData.experience?.map((exp, index) => (
                <li key={index}>
                  {resumeData.experience.length > 1 && "• "}{exp.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div className="resume-section">
            <h2>Projects</h2>
            <ul>
              {resumeData.projects?.map((project, index) => (
                <li key={index}>
                  {resumeData.projects.length > 1 && "• "}{project.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div className="resume-section">
            <h2>Education</h2>
            <p>{resumeData.education}</p>
          </div>

        </div>
      </div>

      <div className="homeBtn">
        <button onClick={() => {
          navigate("/create");
          toast.success("Going back home!")
        }} className="btn"> Home </button>
      </div>
    </div>
  );
}

export default Resume;
