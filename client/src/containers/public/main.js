import React from "react";
import Header from "./header";
import Footer from "./footer";
import Search from "./search";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "../../App.scss";

const Main = () => {
  return (
    <>
      <Header />
      <Search />
      <div className=" test">
        <div className="w-75 m-auto d-block">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
