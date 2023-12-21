import React from "react";
import { Routes, Route } from 'react-router-dom';
import "./assets/global.css";

// Components 
import Navbar from "./components/layout/Navbar/Navbar";

// Pages
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";



const App: React.FC = () => {
  return (
    <>
      <Navbar/>
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <MainPage/>} />
        <Route path="/login" element={ <LoginPage/>} />
        <Route path="/register" element={ <RegisterPage/>} />
      </Routes>
    </>
    </>
  );
}

export default App;