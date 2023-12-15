import React from "react";

import { Home } from "../modules/product";
import { About } from "../modules/product";
import { Footer } from "../modules/product";

const MainPage: React.FC = () => {
  return (
    <>
      <Home/>
      <About/>
      <Footer/>
    </>
  );
}

export default MainPage;