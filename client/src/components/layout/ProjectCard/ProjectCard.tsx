import React, {useEffect} from 'react'

import './ProjectCard.css';

import {BsArrowRightShort} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import { FaTasks } from "react-icons/fa";

// Import Aos ======================>
import Aos from 'aos'
import 'aos/dist/aos.css'

const ProjectCard: React.FC = () => {
    useEffect(()=>{
        Aos.init({duration: 2000})
    }, []) 

    return (
        <>
            <div data-aos="fade-up" data-aos-duration="3000" className="singleOffer">
                <div className="offerBody">
                    <div className="price">
                        <h4>
                            Project: Task Manager
                        </h4> <br />
                        <h4>
                            Due date: 31/12/2023
                        </h4>
                    </div>

                    <div className="amenities flex">
                        <div className="singleAmenity flex">
                            <FaTasks className="icon"/>
                            <small>4 active tasks</small>
                        </div>
                    </div>

                    <div className="location flex">
                        <MdLocationOn className="icon"/>
                        <small>Astana, Kazakhstan</small> 
                    </div>
                    <a className='btn flex' href={`/task/1`}>Go to Project <BsArrowRightShort className='icon'/></a>
                </div>
            </div>
        </>
    );
}

export default ProjectCard;