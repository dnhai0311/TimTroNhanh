import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../public/Header/Navigation";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../store/actions/app";
import { ToastContainer } from "react-toastify";
import * as actions from "../../../store/actions";
import "./Sidebar.scss";
import { getCurrentUser } from "../../../store/actions/user";

const System = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(actions.logout());
  };
  return (
    <>
      <Navigation handleGotoTop={() => {}} />
      <Container className="m-0" fluid>
        <Row>
          <Col sm={3} className="d-block sidebar position-fixed h-100">
            <Sidebar handleSignOut={handleSignOut} />
          </Col>
          <Col sm={3}></Col>
          <Col sm={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
      <ToastContainer autoClose={1000} position="bottom-right" />
    </>
  );
};

export default System;
