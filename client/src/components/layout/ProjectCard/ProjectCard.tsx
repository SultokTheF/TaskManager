import React, { useEffect } from 'react';
import './ProjectCard.css';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Project from '../../../types/Project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="3000" className="singleOffer">
      <div className="offerBody">
        <div className="price">
          <h4>Project: {project.name}</h4> <br />
          <h4>Due date: {project.dueDate}</h4>
        </div>

        <div className="amenities flex">
          <div className="singleAmenity flex">
            <FaTasks className="icon" />
            <small>{project.activeTasks} active tasks</small>
          </div>
        </div>

        <div className="location flex">
          <MdLocationOn className="icon" />
          <small>{project.location}</small>
        </div>
        <a className="btn flex" href={`/task/${project._id}`}>
          Go to Project <BsArrowRightShort className="icon" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
