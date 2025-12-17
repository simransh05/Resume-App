import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Create.css'
import { toast } from "react-toastify";
import api from "../util/Api"
function Create() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await api.getAllResume()
        .then((res) => setResumes(res.data));
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await api.deleteResume(id);
    setResumes(resumes.filter(r => r._id !== id));
  };

  return (
    <div className="containerCreate">
      <h1>All Resume</h1>
      <button className="btn1" onClick={() => {
        navigate("/form");
        toast.success("Opening form to create resume!")
      }}>Create New</button>

      {resumes.length === 0 ? <p className="empty">No Resume Available</p> :
        resumes?.map((r) => (
          <div key={r._id} className="elements">
            <h3 className="heading">{r.name}</h3>
            <div className="btnGroup">
              <button onClick={() => {
                navigate(`/resume/${r._id}`);
                toast.info("Viewing this resume!")
              }}>View</button>
              <button onClick={() => {
                navigate(`/form/${r._id}`);
                toast.info("Editing this resume!")
              }}>Edit</button>
              <button onClick={() => {
                handleDelete(r._id);
                toast.error("Resume deleted!")
              }}>Delete</button>
            </div>

          </div>
        ))
      }
    </div>
  );
}

export default Create;
