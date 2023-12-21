import React, { useState, useEffect } from 'react';

import '../assets/styles/ProjectList.css';

import ProjectCard from '../../../components/layout/ProjectCard/ProjectCard';

const ProjectList: React.FC = () => {
return (
<>
    <div className='project-list'>
        <section className='offer section container'>
            <div className="secContainter">
                <div className="secIntro">
                    <h2 className='secTitle'>
                        All the current projects
                    </h2>
                </div>

                <div className="mainContent grid">
                    <ProjectCard/>
                </div> 
                <br />
                <br />
            </div>
        </section>
    </div>
</>
);
}

export default ProjectList;