import React, {useEffect} from 'react'
import './Home.css'
import Aos from "aos";
import 'aos/dist/aos.css';

const Home: React.FC = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <section className='home' id={`main`}>
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" data-aos-duration="2000" className="title">
            Task Manager
          </h1>
          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
            Manage your projects with us!
          </p>
          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <a href="/field">Start</a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Home