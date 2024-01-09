import React, {useEffect} from 'react'
import './Footer.css'

// import AOS ============================>
import Aos from 'aos'
import 'aos/dist/aos.css'

const Footer: React.FC = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, []) 

  return (
    <div className='footer' id={`contact`}>
      <div className="secCotainer container grid">
        <div data-aos="fade-up" data-aos-duration="2000" className="logoDiv">
          <div className="footerLogo">
            <a href="#" className="logo flex"><h1>Task Manager</h1></a>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="2500" className="footerLinks">
          <span className="linkTitle">Pages</span>
          <li>
            <a href="/#main">Home</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
        </div>
        <div data-aos="fade-up" data-aos-duration="3000" className="footerLinks">
          <span className="linkTitle">Links</span>
          <li>
            <a href="https://github.com/SultokTheF">Sultok 😏</a>
          </li>
          <li>
            <a href="https://github.com/flamemeister">Flamemeister 💩</a>
          </li>
          <li>
            <a href="https://github.com/nurzhanova2">Ziya 😇</a>
          </li>
          <li>
            <a href="https://github.com/samxael">Samsa 🤡</a>
          </li>
        </div>
        <div data-aos="fade-up" data-aos-duration="3000" className="footerLinks">
          <span className="linkTitle">Developers</span>
          <span className='info'>Kuandyk Sultaniyar <br /> <span className='email'>220548@astanait.edu.kz</span></span>
          <span className="info">Saken Aldiyar <br /> <span className='email'>220051@astanait.edu.kz</span></span>
          <span className="info">Zarina Nurzhanova <br /> <span className='email'>220037@astanait.edu.kz</span></span>
          <span className="info">Nuray Yelgazy <br /> <span className='email'>220717@astanait.edu.kz</span></span>
        </div>
      </div> 
    </div>
  )
}

export default Footer