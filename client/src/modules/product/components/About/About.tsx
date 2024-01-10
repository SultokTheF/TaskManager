import React, {useEffect}  from 'react'
import './About.css'

// Import Aos ======================>
import Aos from 'aos'
import 'aos/dist/aos.css'

// Static files 
import ReactJS from "../../assets/iamges/ReactJS.png";
import NodeJS from "../../assets/iamges/NodeJS.png";
import MongoDB from "../../assets/iamges/MongoDB.png"; 

import video from "../../assets/videos/Flex.MOV";

import profile_image from '../../../../helpers/profile_image';


const About: React.FC = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, []) 

  return (
    <section className='about  section' id={`about`}>
      <div className="secContainer">

        <h2 className='title'>
          Technology Stack
        </h2>


        <div className="mainContent container grid">
          <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
            <img src={ReactJS} alt="Image" />
            <h3>React</h3>
            <p>Axios: HTTP client for making API requests</p>
            <p>Redux: State management for React applications</p>
          </div>

          <div data-aos="fade-up" data-aos-duration="2500" className="singleItem">
            <img src={NodeJS} alt="Image" />
            <h3>Node.js</h3>
            <p>Express: Web application framework for Node.js</p>
            <p>RESTful API: HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on tasks and other resources</p>
          </div>

          <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
            <img src={MongoDB} alt="Image" />
            <h3>MongoDB</h3>
            <p>NoSQL database for storing task data</p>
            <p>Document-Oriented: MongoDB stores data in documents, which are JSON-like BSON (Binary JSON) objects</p>
          </div>
        </div>

        <div className="videoCard container">
          <div className="cardContent grid">
            <div className="cardText" data-aos="fade-right">
              <h2>Developers team</h2>
              <p>Zarina 😇</p> 
              <hr/>
              <p>
                <i>
                  Leads backend development efforts, ensuring cohesive architecture and adherence to coding standards
                </i>
              </p>
              <br />
              <p>Sultaniyar 😏</p>
              <hr/>
              <p>
                <i>
                  Specializes in database design and optimization, ensuring efficient data management for the project
                </i>
              </p>
              <br />
              <p>Aldiyar 💩</p>
              <hr/>
              <p>
                <i>
                  Focuses on server-side development, implementing project functionalities and ensuring server scalability
                </i>
              </p>
              <br />
              <p>Nurai 🤡</p>
              <hr/>
              <p>
                <i>   
                  Manages quality assurance and testing, ensuring the reliability and performance of the backend server for the project
                </i>
              </p>
            </div>

            <div className="cardVideo" data-aos="fade-left">
              <video autoPlay muted loop>
                <source src={video} type='video/mp4'/>
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About