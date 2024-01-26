import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using Axios for HTTP requests
import { ProjectEndpoints } from '../../../constants/endpoints'; // Adjust the path accordingly
import ProjectCard from '../../../components/layout/ProjectCard/ProjectCard'; // Import the refactored ProjectCard
import '../assets/styles/ProjectList.css';
import Project from '../../../types/Project';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(
          ProjectEndpoints.getProjects,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className='project-list'>
      <section className='offer section container'>
        <div className="secContainter">
          <div className="secIntro">
            <h2 className='secTitle'>
              All the current projects
            </h2>
          </div>

          <div className="mainContent grid">
            {/* Pass projects array as props to ProjectCard */}
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          <br />
          <br />
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
