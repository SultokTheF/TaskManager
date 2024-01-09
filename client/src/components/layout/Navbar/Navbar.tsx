import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Navbar.css';

import {AiFillCloseCircle} from 'react-icons/ai';
import {TbGridDots} from 'react-icons/tb';

import User from "../../../types/User";
import { userValidateEndpoint } from "../../../helpers/endpoints";

const Navbar:React.FC = () => {
  const [active, setActive]  = useState('navBar')

  const showNav = ()=>{
    setActive('navBar activeNavbar')
  }
  const removeNav = ()=>{
    setActive('navBar')
  }

  //code statement to add a background color to the header.
  const [transparent, setTransparent] = useState('header')
  const addBg = ()=>{
    if(window.scrollY >= 10){
    setTransparent('header activeHeader')
    }else{
    setTransparent('header')
    }
  }
  window.addEventListener('scroll', addBg)

  const [userData, setUserData] = useState<(User & { roles: Array<any> }) | null>(null);

  useEffect( () => {
      if( !localStorage.getItem( "accessToken" ) ) {
      } else {
        axios.get(
          userValidateEndpoint,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem( 'accessToken' )}`,
              'Content-Type': 'application/json',
            },
          }
        ).then(response => {
          setUserData(response.data.user);
        }).catch(error => {
          localStorage.removeItem( 'accessToken' );
          window.location.replace( '/' );
          console.error('Error fetching user data:', error);
        });
      }
  }, []);


  return (
    <>
      <section className='navBarSection'>
      <header className={transparent}>

        <div className="logoDiv">
          <a href="/" className="logo flex"><h1>Task Manager</h1></a>
       </div>

        <div className={active}>
          <ul onClick={removeNav} className="navLists flex">
            <li className="navItem">
              <a href="/#main" className="navLink">Main</a>
            </li>
            <li className="navItem">
              <a href="/#about" className="navLink">About</a>
            </li>
            <li className="navItem">
              <a href="/#contact" className="navLink">Developers</a>
            </li>

            <div className="headerBtns flex">
              {localStorage.getItem("accessToken") ? (
                <>
                  <button className="btn loginBtn">
                    <Link to="/profile">{userData?.username}</Link>
                  </button>
                  <button className="btn">
                    <Link to="/" onClick={() => {
                      localStorage.removeItem( 'accessToken' );
                      window.location.replace( '/' );
                    }}>
                      Logout
                    </Link>
                  </button>
                </>
              ) : (
                <>
                  <button className="btn loginBtn">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn">
                    <Link to="/register">Register</Link>
                  </button>
                </>
              )}
            </div>
          </ul>
          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className='icon'/>
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className='icon'/>
        </div>
      </header>
    </section>
    </>
  );
}

export default Navbar;