import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ProjectEndpoints } from "../../../constants/endpoints";
import Project from "../../../types/Project";

import TaskList from "./TaskList";

import "../assets/styles/ProjectDetails.css";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectData, setProjectData] = useState<Project | null>(null);

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
            createdAt: new Date(response.data.createdAt).toLocaleDateString('en-GB')
          };
          setProjectData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

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
              {`${projectData?.activeTasks} Active Tasks`}
            </span>
          </div>
          <h6>Description</h6>
          <p>{projectData?.description}</p>
          <h6>Due Date</h6>
          <p>{projectData?.dueDate}</p>
          <h6>Location</h6>
          <p>{projectData?.location}</p>
          <h6>Created At</h6>
          <p>{projectData?.createdAt}</p>
        </div>
      </div>
      <TaskList/>
    </div>
  );
};

export default ProjectDetails;
