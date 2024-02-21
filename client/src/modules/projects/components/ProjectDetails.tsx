import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ProjectEndpoints, UserEndpoints } from "../../../constants/endpoints";
import Project from "../../../types/Project";

import TaskList from "./TaskList";

import "../assets/styles/ProjectDetails.css";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectData, setProjectData] = useState<Project | null>(null);

  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsername(value);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const response = await axios.get<Project>(
            ProjectEndpoints.getProjectById(id),
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
              },
            }
          );
          // Format date
          const formattedData = {
            ...response.data,
            dueDate: new Date(response.data.dueDate).toLocaleDateString('en-GB'), // Change 'en-GB' to your preferred locale
            createdAt: new Date(response.data.createdAt || Date.now()).toLocaleDateString('en-GB')
          };
          setProjectData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        const response = await axios.get(UserEndpoints.getUserByUsername(username), {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
        });

        if( response.status === 200 ) {
          try {
            const response2 = await axios.post(ProjectEndpoints.assignUserToPoject, 
              {
                userId: response.data.user._id,
                projectId: projectData?._id
              },
              {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
              },
            });
          } catch (error) {
            console.error("Error", error);
            setErrMsg("User not found!");
          }
        } else {
            setErrMsg("Something went wrong! Please try later")
        } 
    } catch (error) {
        console.error("Registration failed", error);
        setErrMsg("This username or email is already in use!")
    }
};

  return (
    <div className="projects-container"> 
      <div className="project">
        <div className="project-preview">
          <h6>Project</h6>
          <h2>{projectData?.name}</h2>
        </div>
        <div className="project-info">
          <div className="progress-container">
            <span className="progress-text">
              {`${projectData?.activeTasks} Active Tasks`} <br />
              {projectData?.assignedUsers?.length} Assigned Users
            </span>
          </div>
          <h6>ID</h6>
          <p>{projectData?._id}</p>
          <h6>Description</h6>
          <p>{projectData?.description}</p>
          <h6>Due Date</h6>
          <p>{projectData?.dueDate}</p>
          <h6>Location</h6>
          <p>{projectData?.location}</p>
          <h6>Created At</h6>
          <p>{projectData?.createdAt}</p>

          <a href={`/chat/${projectData?._id}`} className="btn">Go To Project Chat</a>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="text-input">Enter username:</label>
          <input
            type="text"
            id="text-input"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Assign User</button>

          <div className="errorMessage">{ errMsg }</div>
        </form>
      </div>

      {/* <TaskList/> */}
    </div>
  );
};

export default ProjectDetails;
