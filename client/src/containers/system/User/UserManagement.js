import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserManagement = () => {
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState(userData?.name || "");
  const [facebook, setFacebook] = useState(userData?.facebook || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFacebookChange = (e) => {
    setFacebook(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Dispatch ${name}, ${facebook}`);
    // dispatch(updateUserData({ name, facebook }));
  };

  return (
    <>
      <h3 className="py-3 px-5 border-bottom">Cập nhật thông tin cá nhân</h3>
      <Form className="w-50 m-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Mã thành viên</Form.Label>
          <Form.Control placeholder={userData?.id || ""} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control placeholder={userData?.phone || ""} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tên của bạn"
            defaultValue={userData?.name || ""}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            type="text"
            placeholder="Link Facebook"
            defaultValue={userData?.facebook || ""}
            onChange={handleFacebookChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 ">
          <Form.Label className="pe-3">Mật khẩu</Form.Label>
          <Link className="text-decoration-none" to={"/quan-ly/doi-mat-khau"}>
            Đổi mật khẩu
          </Link>
        </Form.Group>
        <Form.Group className="mb-3 d-flex">
          <Form.Label className="pe-3">Ảnh đại diện</Form.Label>
          <div>
            <div
              style={{
                width: 150 + "px",
                height: 150 + "px",
                backgroundColor: "red",
              }}
            >
              Cái hình ở đây
            </div>
            <Form.Control type="file" className="mt-3" />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Lưu và cập nhật
        </Button>
      </Form>
    </>
  );
};

export default UserManagement;
