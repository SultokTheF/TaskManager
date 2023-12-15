import React, {useEffect} from 'react'
import './Footer.css'
import {ImFacebook} from 'react-icons/im'
import {BsTwitter} from 'react-icons/bs'
import {AiFillInstagram} from 'react-icons/ai'
import {SiYourtraveldottv} from 'react-icons/si'

import Logo from '../../../../assets/images/logo/QUSH_logo_black_expanded.png'

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

          <div  className="socials flex">
              {/* <ImFacebook className='icon'/>
              <BsTwitter className='icon'/>
              <a href='https://www.instagram.com/qush_kz/'><AiFillInstagram className="icon"/></a> */}
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
              <a href="https://github.com/SultokTheF">Sultaniyar</a>
            </li>
            <li>
              <a href="https://github.com/flamemeister">Aldiyar</a>
            </li>
            <li>
              <a href="https://github.com/SultokTheF/TaskManager">Prject URL</a>
            </li>
         </div>
         <div data-aos="fade-up" data-aos-duration="3000" className="footerLinks">
          <span className="linkTitle">Developers</span>
           <span className='info'>Kuandyk Sultaniyar <span className='email'>220548@astanait.edu.kz</span></span>
           <span className="info">Saken Aldiyar <span className='email'>220051@astanait.edu.kz</span></span>
         </div>
      </div> 
     </div>
   )
 }
 
 export default Footer