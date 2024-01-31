import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ChangePassword = () => {
  const [password, setPasswordChange] = useState("");
  const [newPassword, setNewPasswordChange] = useState("");
  const [reNewPassword, setReNewPasswordChange] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordChange(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPasswordChange(e.target.value);
  };

  const handleReNewPasswordChange = (e) => {
    setReNewPasswordChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Dispatch ${password}, ${newPassword}, ${reNewPassword}`);
    // dispatch(updateUserData({ name, facebook }));
  };
  return (
    <>
      <h3 className="py-3 px-5 border-bottom">Đổi mật khẩu</h3>
      <Form className="w-50 m-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu cũ</Form.Label>
          <Form.Control
            type="password"
            onChange={handlePasswordChange}
            autoComplete="password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu mới</Form.Label>
          <Form.Control
            type="password"
            onChange={handleNewPasswordChange}
            autoComplete="new password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nhập lại mật khẩu mới</Form.Label>
          <Form.Control
            type="password"
            onChange={handleReNewPasswordChange}
            autoComplete="re new password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Đổi mật khẩu
        </Button>
      </Form>
    </>
  );
};

export default ChangePassword;
