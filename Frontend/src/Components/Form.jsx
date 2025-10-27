import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Form.css";
import { toast } from "react-toastify";

function Form() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    education: "",
    skills: [""],
    projects: [""],
    experience: [""],
    dob: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/resume/${id}`)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:4000/resume/${id}`, data);
      navigate(`/resume/${id}`);
    } else {
      const res = await axios.post("http://localhost:4000/resume", data);
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
          Projects: <span className="required">*</span>
          {data.projects.map((p, i) => (
            <div key={i} className="array-field">
              <input
                className="form-input"
                placeholder="Add Project"
                value={p}
                onChange={(e) =>
                  handleArrayChange("projects", i, e.target.value)
                }
              />
              {i > 0 && (
                <button
                  type="button"
                  className="remove-btn"
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

        <label className="form-label">
          Date of Birth: <span className="required">*</span>
          <input
            className="form-input"
            name="dob"
            type="date"
            value={data.dob}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <div className="submit">
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
