import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import Banner from "./Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "../../App.scss";

const Main = () => {
  return (
    <>
      <div className="bg-gray">
        <Header />
        <Search />
        <Banner />
        <div className="w-75 m-auto d-block">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
