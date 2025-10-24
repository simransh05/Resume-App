import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Form.css";

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
          Name:
          <input className="form-input" name="name" placeholder="Full Name" value={data.name} onChange={handleChange} required />
        </label><br />

        <label className="form-label">
          Email:
          <input className="form-input" name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} required />
        </label><br />

        <label className="form-label">
          Phone number:
          <input className="form-input" name="phone" type="tel" placeholder="Phone" value={data.phone} onChange={handleChange} required />
        </label><br />

        <label className="form-label">
          Summary:
          <textarea className="form-textarea" name="bio" placeholder="Short Bio" value={data.bio} onChange={handleChange} required />
        </label><br />

        <label className="form-label">
          Education:
          <input className="form-input" name="education" placeholder="Education" value={data.education} onChange={handleChange} required />
        </label><br />

        <label className="form-label">
          Skills:
          {data.skills.map((skill, i) => (
            <input
              key={i}
              className="form-input"
              value={skill}
              onChange={(e) => handleArrayChange("skills", i, e.target.value)}
            />
          ))}
          <button type="button" className="add-btn" onClick={() => addField("skills")}>+ Skill</button>
        </label><br />

        <label className="form-label">
          Projects:
          {data.projects.map((p, i) => (
            <input
              key={i}
              className="form-input"
              value={p}
              onChange={(e) => handleArrayChange("projects", i, e.target.value)}
            />
          ))}
          <button type="button" className="add-btn" onClick={() => addField("projects")}>+ Project</button>
        </label><br />

        <label className="form-label">
          Experience:
          {data.experience.map((exp, i) => (
            <input
              key={i}
              className="form-input"
              value={exp}
              onChange={(e) => handleArrayChange("experience", i, e.target.value)}
            />
          ))}
          <button type="button" className="add-btn" onClick={() => addField("experience")}>+ Experience</button>
        </label><br />

        <label className="form-label">
          Date of Birth:
          <input className="form-input" name="dob" type="date" value={data.dob} onChange={handleChange} required />
        </label><br />
        <div className="submit">
          <button className="submit-btn" type="submit">{id ? "Update" : "Preview"}</button>
        </div>
        
      </form>
    </div>
  );
}

export default Form;
