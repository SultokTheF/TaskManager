import React from "react";
import { Routes, Route } from 'react-router-dom';
import "./assets/global.css";

// Components 
import Navbar from "./components/layout/Navbar/Navbar";

// Pages
import MainPage from "./pages/MainPage";



const App: React.FC = () => {
  return (
    <>
      <Navbar/>
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <MainPage/>} />
      </Routes>
    </>
    </>
  );
}

export default App;