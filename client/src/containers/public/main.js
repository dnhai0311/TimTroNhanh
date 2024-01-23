import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navigation from "./Header/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "../../App.scss";

const Main = () => {
  return (
    <>
      <div className="bg-gray">
        <Header />
        <Navigation />
        <div className="w-75 m-auto d-block">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
