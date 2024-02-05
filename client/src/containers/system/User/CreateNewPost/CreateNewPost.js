import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddressForm from "./AddressForm";
import Overview from "./Overview";
import Picture from "./Picture";
import { apiUploadImage } from "../../../../services/app";
import { apiCreatePost } from "../../../../services/post";
import Loading from "../../../Loading";
import { useNavigate } from "react-router-dom";
import { showToastSuccess, showToastError } from "../../../ToastUtil";

const CreateNewPost = () => {
  const navigate = useNavigate();

  const [districtSelected, setDistrictSelected] = useState({
    id: 0,
    value: "",
  });
  const [exactlyAddress, setExactlyAddress] = useState("");

  const [categorySelected, setCategorySelected] = useState({
    code: "",
    value: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [acreage, setAcreage] = useState("");

  const [imgFiles, setImgFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const updateDistrictSelected = (selectedDistrict) => {
    setDistrictSelected(selectedDistrict);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (+price > 0 && +acreage > 0);
    else {
      showToastError("Giá hoặc diện tích không hợp lệ");
      setIsLoading(false);
      return;
    }
    if (imgFiles.length === 0) {
      showToastError("Vui lòng đăng ít nhất 1 ảnh về bài đăng của bạn");
      setIsLoading(false);
      return;
    }

    let payload = {
      title,
      description,
      categoryCode: categorySelected.code,
      price,
      acreage,
      address: exactlyAddress,
      districtId: districtSelected.id,
    };
    if (Object.values(payload).includes("")) {
      setIsLoading(false);
      showToastError("Bạn chưa nhập đầy đủ");
      return;
    }
    showToastError("Vui lòng đợi");
    //upload anh len cloud
    let formData = new FormData();
    let ImgUrls = [];

    for (const file of imgFiles) {
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_NAME);
      const response = await apiUploadImage(formData);
      if (response.status === 200)
        ImgUrls = [...ImgUrls, response.data.secure_url];
    }

    //them vao payload
    payload = { ...payload, ImgUrls };

    //dispatch
    const response = await apiCreatePost(payload);
    setIsLoading(false);
    // console.log(response.status);
    if (response.status === 200) {
      showToastSuccess("Đăng bài thành công");
      navigate("/quan-ly/tin-dang");
    } else showToastError(response.data.response.msg);
  };

  return (
    <>
      <h3 className="border-bottom py-3 px-5">Đăng tin mới</h3>
      <Container className="px-5">
        <Row className="py-3">
          <Col md={8}>
            <AddressForm
              onUpdateDistrictSelected={updateDistrictSelected}
              setExactlyAddress={setExactlyAddress}
            />
            <Overview
              setCategorySelected={setCategorySelected}
              setTitle={setTitle}
              setDescription={setDescription}
              setPrice={setPrice}
              setAcreage={setAcreage}
            />
            <Picture imgFiles={imgFiles} setImgFiles={setImgFiles} />
            <Button
              className="w-100 p-2 mt-3 bg-success fw-bold"
              onClick={handleSubmit}
            >
              {isLoading ? <Loading /> : <span>Đăng bài</span>}
            </Button>
          </Col>
          <Col md={4}>map</Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateNewPost;
