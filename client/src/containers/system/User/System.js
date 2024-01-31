import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../public/Header/Navigation";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../store/actions/app";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../../store/actions";
import "./Sidebar.scss";
import { getCurrentUser } from "../../../store/actions/user";

const System = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(actions.logout());
  };
  return (
    <>
      <Navigation handleGotoTop={() => {}} />
      <Container className="m-0" fluid>
        <Row className="vh-100">
          <Col sm={3} className="sidebar">
            <Sidebar handleSignOut={handleSignOut} />
          </Col>
          <Col sm={9} className="vh-100 ">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default System;
