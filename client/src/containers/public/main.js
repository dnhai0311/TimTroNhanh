import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "../../App.scss";

import { useDispatch } from "react-redux";
import {
  getAcreages,
  getCategories,
  getPrices,
  getProvinces,
} from "../../store/actions/app";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getAcreages());
    dispatch(getPrices());
    dispatch(getCategories());
  }, []);
  return (
    <>
      <div className="bg-gray">
        <Header />
        <div className="w-100 w-sm-75 m-auto d-block">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
