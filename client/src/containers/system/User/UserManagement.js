import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiUpdateUser } from "../../../services/user";
import { apiUploadImage } from "../../../services/app";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading";
import { showToastError, showToastSuccess } from "../../ToastUtil";
import { getCurrentUser } from "../../../store/actions/user";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [facebook, setFacebook] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFacebookChange = (e) => {
    setFacebook(e.target.value);
  };

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar?.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const avatar = e.target.files[0];
    avatar.preview = URL.createObjectURL(avatar);
    setAvatar(avatar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    document.getElementById("submitButton").disabled = true;
    let payload = {};
    if (avatar) {
      let formData = new FormData();
      formData.append("file", avatar);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_NAME);
      const response = await apiUploadImage(formData);
      payload = {
        ...payload,
        avatar: response.data.secure_url,
      };
    }
    if (name && name !== userData.name) {
      payload = {
        ...payload,
        name,
      };
    }
    if (facebook && facebook !== userData.facebook) {
      payload = {
        ...payload,
        facebook,
      };
    }
    if (Object.keys(payload).length > 0) {
      const response = await apiUpdateUser(payload);
      if (response.data.success) {
        showToastSuccess(response.data.message);
        dispatch(getCurrentUser());
      } else showToastError(response.data.message);
    }
    setIsLoading(false);
    document.getElementById("submitButton").disabled = false;
  };

  return (
    <>
      <h3 className="py-3 px-5 border-bottom">Thông tin cá nhân</h3>
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
            {avatar ? (
              <img
                style={{
                  width: 150 + "px",
                  height: 150 + "px",
                }}
                src={avatar?.preview}
                alt="avatar"
                className="border rounded-circle"
              />
            ) : (
              <img
                style={{
                  width: 150 + "px",
                  height: 150 + "px",
                  // backgroundColor: "red",
                }}
                src={userData.avatar}
                alt="avatar"
                className="border rounded-circle"
              />
            )}
            <Form.Control
              type="file"
              className="mt-3"
              onChange={handlePreviewAvatar}
            />
          </div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mb-3"
          id="submitButton"
        >
          {isLoading ? <Loading /> : <span>Lưu và cập nhật</span>}
        </Button>
      </Form>
    </>
  );
};

export default UserManagement;
