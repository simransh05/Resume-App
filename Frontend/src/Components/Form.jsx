import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Form.css";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_BASE_URL;

function Form() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    education: "",
    skills: [""],
    projects: [
      {
        title: "",
        description: "",
        start_date: "",
        end_date: ""
      }
    ],
    experience: [""],
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${API}/${id}`)
        .then((res) => {
          setData(res.data);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    setData({ ...data, [field]: newArray });
  };

  const addField = (field) => {
    setData({ ...data, [field]: [...data[field], ""] });
  };

  const handleRemove = (field, index) => {
    const newArray = data[field].filter((_, i) => i !== index);
    setData({ ...data, [field]: newArray });
  };

  const HandleBack = () => {
    const confirm = window.confirm('Are you sure you want to go back! Once back the data will be discard');
    if (confirm) {
      navigate('/create');
    }
  }
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...data.projects];
    newProjects[index][field] = value;
    setData({ ...data, projects: newProjects });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`${API}/${id}`, data);
      navigate(`/resume/${id}`);
    } else {
      const res = await axios.post(`${API}`, data);
      navigate(`/resume/${res.data._id}`);
    }
  };

  return (
    <div className="container">
      <h1>{id ? "Edit Resume" : "Create Resume"}</h1>
      <form onSubmit={handleSubmit} className="resume-form">

        <label className="form-label">
          Name: <span className="required">*</span>
          <input
            className="form-input"
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Email: <span className="required">*</span>
          <input
            className="form-input"
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Phone number: <span className="required">*</span>
          <input
            className="form-input"
            name="phone"
            type="tel"
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Summary: <span className="required">*</span>
          <textarea
            className="form-textarea"
            name="bio"
            placeholder="About You"
            value={data.bio}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Education: <span className="required">*</span>
          <input
            className="form-input"
            name="education"
            placeholder="Education"
            value={data.education}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Skills: <span className="required">*</span>
          {data.skills.map((skill, i) => {
            return (
              <div key={i} className="array-field">
                <input
                  className="form-input"
                  placeholder="Add Skill"
                  value={skill}
                  onChange={(e) => handleArrayChange("skills", i, e.target.value)} />
                {i > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemove("skills", i)}
                  >
                    ❌
                  </button>
                )}
              </div>
            );
          })}
          <button
            type="button"
            className="add-btn"
            onClick={() => addField("skills")}
          >
            + Skill
          </button>
        </label>
        <br />

        <label className="form-label">
          <div className="main">
            Projects: <span className="required">*</span>
          </div>
          {data.projects.map((project, i) => (
            <div key={i} className="project-box">
              <div className="project-data">
                <div className={i === 0 ? "project-group" : "project-group-2"}>
                  <label className={i === 0 ? "label-form" : "label-form-2"}>Project Title:</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    value={project.title || ""}
                    onChange={(e) => handleProjectChange(i, "title", e.target.value)}
                    required
                  />
                </div>

                <div className={i === 0 ? "project-group" : "project-group-2"}>
                  <label className={i === 0 ? "label-form" : "label-form-2"}>Project Description:</label>
                  <input
                    type="text"
                    placeholder="Enter project description"
                    value={project.description || ""}
                    onChange={(e) => handleProjectChange(i, "description", e.target.value)}
                    required
                  />
                </div>

                <div className={i === 0 ? "date-fields" : "date-fields-2"}>
                  <div className={i === 0 ? "project-group" : "project-group-2"}>
                    <label>Date of Start:</label>
                    <input
                      className="dates"
                      type="date"
                      value={project.start_date || ""}
                      onChange={(e) => handleProjectChange(i, "start_date", e.target.value)}
                      required
                    />
                  </div>

                  <div className={i === 0 ? "project-group" : "project-group-2"}>
                    <label>End of Date:</label>
                    <input
                      type="date"
                      className="dates"
                      value={project.end_date || ""}
                      onChange={(e) => handleProjectChange(i, "end_date", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {i > 0 && (
                <button
                  type="button"
                  className="remove"
                  onClick={() => handleRemove("projects", i)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="add-btn"
            onClick={() => addField("projects")}
          >
            + Project
          </button>
        </label>
        <br />

        <label className="form-label">
          Experience: <span className="required">*</span>
          {data.experience.map((exp, i) => (
            <div key={i} className="array-field">
              <input
                className="form-input"
                placeholder="Add Experience"
                value={exp}
                onChange={(e) =>
                  handleArrayChange("experience", i, e.target.value)
                }
              />
              {i > 0 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemove("experience", i)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() => addField("experience")}
          >
            + Experience
          </button>
        </label>
        <br />

        <div className="submit">
          {!id && (
            <button
              className="submit-btn"
              onClick={HandleBack}
            >
              Back To Home
            </button>
          )}

          <button
            className="submit-btn"
            onClick={() => toast.info("Previewing your resume!")}
            type="submit"
          >
            {id ? "Update" : "Preview"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default Form;
