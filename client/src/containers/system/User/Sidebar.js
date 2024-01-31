import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import icons from "../../../ultils/icons";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({ handleSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/").pop();
  const {
    FaCircleUser,
    FaRegFileAlt,
    MdOutlineMessage,
    MdPayment,
    LiaHistorySolid,
    LuUserSquare,
    FaSignOutAlt,
  } = icons;

  const [activeRow, setActiveRow] = useState(category);

  const navigateAndSetActiveRow = (rowName) => {
    setActiveRow(rowName);
    navigate(rowName);
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center pt-1">
          <Col sm={4}>
            <Row>
              <FaCircleUser fontSize={"40px"} />
            </Row>
          </Col>
          <Col sm={8}>
            <Row className="fw-bold">Dương Ngọc Hải</Row>
            <Row>Mã thành viên: 1</Row>
            <Row>0868242343</Row>
            <Row>Số tiền: 5389745893$</Row>
          </Col>
        </Row>
        <Row className="mt-2 mb-2">
          <Col className="p-0">
            <Button
              onClick={() => {
                navigate("dang-tin-moi");
              }}
              className="bg-success"
            >
              Đăng tin mới
            </Button>
          </Col>
        </Row>
        <Row
          onClick={() => navigateAndSetActiveRow("tin-nhan")}
          className={`sidebar-item ${activeRow === "tin-nhan" ? "active" : ""}`}
        >
          <Col>
            <MdOutlineMessage />
            <span>Tin nhắn</span>
          </Col>
        </Row>
        <Row
          onClick={() => navigateAndSetActiveRow("nap-tien")}
          className={`sidebar-item ${activeRow === "nap-tien" ? "active" : ""}`}
        >
          <Col>
            <MdOutlineMessage />
            <span>Nạp tiền</span>
          </Col>
        </Row>
        <Row
          onClick={() => navigateAndSetActiveRow("tin-dang")}
          className={`sidebar-item ${activeRow === "tin-dang" ? "active" : ""}`}
        >
          <Col>
            <FaRegFileAlt />
            <span>Quản lý tin đăng</span>
          </Col>
        </Row>
        <Row
          onClick={() => navigateAndSetActiveRow("lich-su-giao-dich")}
          className={`sidebar-item ${
            activeRow === "lich-su-giao-dich" ? "active" : ""
          }`}
        >
          <Col>
            <LiaHistorySolid />
            <span>Lịch sử giao dịch</span>
          </Col>
        </Row>
        <Row
          onClick={() => navigateAndSetActiveRow("thong-tin-tai-khoan")}
          className={`sidebar-item ${
            activeRow === "thong-tin-tai-khoan" ? "active" : ""
          }`}
        >
          <Col>
            <LuUserSquare />
            <span>Thông tin tài khoản</span>
          </Col>
        </Row>
        <Row onClick={handleSignOut} className="sidebar-item">
          <Col>
            <FaSignOutAlt />
            <span>Đăng xuất</span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Sidebar;
