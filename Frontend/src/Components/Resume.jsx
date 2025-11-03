import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Resume.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { toast } from 'react-toastify'
import api from "../util/Api"
function Resume() {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.getResume(id)
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
          </ul>

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
            <h2>Summary</h2>
            <p>{resumeData.bio}</p>
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
            {resumeData.projects &&
              resumeData.projects.filter(
                (p) => p.title?.trim() || p.description?.trim()
              ).length > 0 && (
                <>
                  <h2>Projects</h2>
                  <ul>
                    {resumeData.projects.map((project, index) => (
                      <li key={index}>
                        <div className="project-info">
                          <strong>
                            {resumeData.projects.length > 1 && index + 1 + " "}
                            {project.title}
                          </strong>
                          <br />
                          <em>{project.start_date} - {project.end_date}</em>
                          <br />
                        </div>
                        <span>{project.description}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
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
