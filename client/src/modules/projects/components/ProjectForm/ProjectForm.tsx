import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { ProjectEndpoints } from "../../../../constants/endpoints";
import useUserData from "../../../../hooks/useUserData";
import Project from "../../../../types/Project";

const ProjectForm: React.FC = () => {
  const userData = useUserData();
  const [errMsg, setErrMsg] = useState("");

  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    createdBy: userData?._id || "",
    dueDate: "",
    location: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(ProjectEndpoints.createProject, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if( response.status === 200 ) {
        console.log("Registration successful", response.data);
        // Clear form data on successful registration
        setFormData({
          name: "",
          description: "",
          createdBy: userData?._id || "",
          dueDate: "",
          location: ""
        });
        alert("Success on Register!");
        window.location.replace( '/' )
      } else {
        setErrMsg("Something went wrong! Please try later")
      } 
    } catch (error) {
      console.error("Registration failed", error);
      setErrMsg("This username or email is already in use!")
    }
  };

  return (
    <>
      <div className="project-form">
        <div className="form-box register-form">
          <h2>Project Creation Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Project Name</label>
            </div>
            <div className="user-box">
              <textarea 
                name="description" 
                placeholder="Project Description" 
                rows={1}
                value={formData.description}
                onChange={handleTextAreaChange}
                required
              ></textarea>
              <label>Project Description</label>
            </div>
            <div className="user-box">
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-box">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
              <label>Location</label>
            </div>
            {/* <div className="errorMessage">{ errMsg }</div> */}
            <button className="btn" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;