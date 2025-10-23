import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("resumeData", JSON.stringify(data));
    navigate("/resume");
  };

  return (
    <div className="container">
      <h2 className="heading">Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        Name: <input name="name" placeholder="Full Name" value={data.name} onChange={handleChange} className="input" required /><br />
        Email: <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} className="input" required /><br />
        Phone: <input name="phone" type="tel" placeholder="Phone Number" value={data.phone} onChange={handleChange} className="input" required /><br />
        Bio: <textarea name="bio" placeholder="Short Bio" value={data.bio} onChange={handleChange} className="input text" required /><br />
        Education: <input name="education" placeholder="Education" value={data.education} onChange={handleChange} className="input" required /><br />

        <label>Skills:</label>
        {data.skills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleArrayChange("skills", index, e.target.value)}
              className="input"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addField("skills")} className="btnSmall">+ Add Skill</button><br />

        <label>Projects:</label>
        {data.projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              value={project}
              onChange={(e) => handleArrayChange("projects", index, e.target.value)}
              className="input"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addField("projects")} className="btnSmall">+ Add Project</button><br />

        <label>Experience:</label>
        {data.experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              value={exp}
              onChange={(e) => handleArrayChange("experience", index, e.target.value)}
              className="input"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addField("experience")} className="btnSmall">+ Add Experience</button><br />

        Date of Birth: <input name="dob" type="date" value={data.dob} onChange={handleChange} className="input" required /><br />
        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  );
}

export default Form;
