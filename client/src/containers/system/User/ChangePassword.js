import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { apiUpdateUser } from "../../../services/user";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPasswordChange] = useState("");
  const [newPassword, setNewPasswordChange] = useState("");
  const [reNewPassword, setReNewPasswordChange] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPasswordChange(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPasswordChange(e.target.value);
  };

  const handleReNewPasswordChange = (e) => {
    setReNewPasswordChange(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (newPassword === reNewPassword) {
      const response = await apiUpdateUser({ oldPassword, newPassword });
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      navigate("/quan-ly/thong-tin-tai-khoan");
    }
  };
  return (
    <>
      <h3 className="py-3 px-5 border-bottom">Đổi mật khẩu</h3>
      <Form className="w-50 m-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu cũ</Form.Label>
          <Form.Control
            type="password"
            onChange={handleOldPasswordChange}
            autoComplete="password"
            minLength={6}
            maxLength={20}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu mới</Form.Label>
          <Form.Control
            type="password"
            onChange={handleNewPasswordChange}
            autoComplete="new password"
            minLength={6}
            maxLength={20}
            required
          />
          {newPassword !== reNewPassword && (
            <Form.Text className="text-danger">
              Mật khẩu không giống nhau
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nhập lại mật khẩu mới</Form.Label>
          <Form.Control
            type="password"
            onChange={handleReNewPasswordChange}
            autoComplete="re new password"
            minLength={6}
            maxLength={20}
            required
          />
          {newPassword !== reNewPassword && (
            <Form.Text className="text-danger">
              Mật khẩu không giống nhau
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Đổi mật khẩu
        </Button>
      </Form>
      <ToastContainer autoClose={1000} position="bottom-right" />
    </>
  );
};

export default ChangePassword;
