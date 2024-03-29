import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { ProjectEndpoints } from '../../../constants/endpoints'; 
import ProjectCard from '../../../components/layout/ProjectCard/ProjectCard';
import '../assets/styles/ProjectList.css';
import Project from '../../../types/Project';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [shownProjects, setShownProjects] = useState(true);

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

  const setMyProjects = () => {
    setShownProjects(true);
  }

  const setAssingedProjects = () => {
    setShownProjects(false);
  }

  return (
    <div className='project-list'>
      <section className='offer section container'>
        <div className="secContainter">
          <div className="secIntro">
            <h2 className='secTitle'>
              All the current projects
            </h2>
            <div className="buttons flex">
              <a href="projects/create" className='btn'>Create Project</a>
              <button className='btn' onClick={setMyProjects}>My Projects</button>
              <button className='btn' onClick={setAssingedProjects}>Assigned Projects</button>
            </div>
          </div>

          {shownProjects ? (
            <>
              <div className="mainContent grid">
                {/* Pass projects array as props to ProjectCard */}
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mainContent grid">
                {/* Pass projects array as props to ProjectCard */}
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </>
          )}
          <br />
          <br />
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
