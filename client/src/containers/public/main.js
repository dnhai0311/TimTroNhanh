import React from "react";
import Header from "./header";
import Navigation from "./navigation";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "../../App.css";

const Main = () => {
  return (
    <div>
      <div className="sticky-top">
        <Header />
      </div>
      <Container className=" test">
        <Outlet />
      </Container>
    </div>
  );
};

export default Main;
