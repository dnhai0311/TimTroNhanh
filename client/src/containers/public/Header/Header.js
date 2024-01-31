import React, { useCallback, useEffect, useState, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import DropDownManage from "../../../components/DropDownManage";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { path } from "../../../ultils/constant";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import icons from "../../../ultils/icons";
import Navigation from "./Navigation";
import "./Header.scss";
import * as actions from "../../../store/actions/";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HeaderRef = useRef();
  const { FaCircleUser, FaUserPlus, FaArrowUp } = icons;
  const [showGoToTop, setShowGoToTop] = useState(false);

  const { isLoggedIn, msg } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  const handleGotoTop = () => {
    HeaderRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSignOut = () => {
    dispatch(actions.logout());
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (msg !== "") {
      isLoggedIn && toast.success(msg);
      dispatch(actions.setMsg());
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar className="bg-light" ref={HeaderRef}>
        <div className="d-flex flex-column flex-sm-row w-75 m-auto  justify-content-between align-items-center">
          <Link to={"/"}>
            <Navbar.Brand style={{ margin: 0 }}>
              <img
                src={logo}
                width="200"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          {!isLoggedIn ? (
            <Navbar>
              <Button
                className="bg-primary m-1 d-flex align-items-center"
                onClick={() => goLogin(false)}
              >
                <FaCircleUser className="mx-1" />
                <span>Đăng nhập</span>
              </Button>
              <Button
                className="bg-primary m-1 d-flex align-items-center"
                onClick={() => goLogin(true)}
              >
                <FaUserPlus className="mx-1" />
                <span>Đăng ký</span>
              </Button>
            </Navbar>
          ) : (
            <Navbar>
              <div className="me-2">
                <span>Xin chào, {userData?.name?.split(" ").pop()}!</span>
              </div>
              <Button
                className="bg-success"
                onClick={() => {
                  navigate("/tin-da-luu");
                }}
              >
                Tin đã lưu
              </Button>
              <Button
                className="bg-danger m-1"
                onClick={() => {
                  navigate("/quan-ly/dang-tin-moi");
                }}
              >
                Tạo bài đăng mới
              </Button>
              <DropDownManage handleSignOut={handleSignOut} />
            </Navbar>
          )}
        </div>
        <ToastContainer autoClose={1000} position="bottom-right" />
      </Navbar>
      <Navigation handleGotoTop={handleGotoTop} />
      {showGoToTop && (
        <div
          className="position-fixed end-0 bottom-0 mb-4 me-4 bg-primary p-3 border rounded-circle text-light btnOnTop"
          onClick={handleGotoTop}
        >
          <FaArrowUp fontSize={"20px"} />
        </div>
      )}
    </>
  );
};

export default Header;
