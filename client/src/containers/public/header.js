import React, { useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./navigation";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, msg } = useSelector((state) => state.auth);

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(() => {
    isLoggedIn && toast.success(msg);
  }, [isLoggedIn]);

  return (
    <>
      <Navbar className="sticky-sm-top bg-light">
        <Container className="flex-column flex-sm-row">
          <Link to={"/home"}>
            <Navbar.Brand style={{ margin: 0 }}>
              <img
                src={logo}
                width="175"
                height="80"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          {!isLoggedIn ? (
            <Navbar>
              <Button className="bg-primary m-1" onClick={() => goLogin(false)}>
                Đăng nhập
              </Button>
              <Button className="bg-primary m-1" onClick={() => goLogin(true)}>
                Đăng ký
              </Button>
            </Navbar>
          ) : (
            <Navbar>
              <Button className="bg-danger m-1">Tạo bài đăng mới</Button>
              <Button
                className="bg-success m-1"
                onClick={() => {
                  dispatch(actions.logout());
                  toast.success("Đăng xuất thành công");
                  navigate("/");
                }}
              >
                Đăng xuất
              </Button>
            </Navbar>
          )}
        </Container>
        <ToastContainer autoClose={1000} position="bottom-right" />
      </Navbar>
      <Navigation />
    </>
  );
};

export default Header;
