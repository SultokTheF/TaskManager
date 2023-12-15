import React, {useEffect}  from 'react'
import './About.css'

// Import Aos ======================>
import Aos from 'aos'
import 'aos/dist/aos.css'

// Static files 
import ReactJS from "../../assets/iamges/ReactJS.png";
import NodeJS from "../../assets/iamges/NodeJS.png";
import MongoDB from "../../assets/iamges/MongoDB.png"; 


const About: React.FC = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, []) 

  return (
    <section className='about  section' id={`about`}>
      <div className="secContainer">

        <h2 className='title'>
          Technologies Used
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
      </div>
    </section>
  )
}

export default About