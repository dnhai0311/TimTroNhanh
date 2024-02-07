import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddressForm from "./AddressForm";
import Overview from "./Overview";
import Picture from "./Picture";
import { apiUploadImage } from "../../../../services/app";
import { apiCreatePost } from "../../../../services/post";
import Loading from "../../../Loading";
import { useNavigate } from "react-router-dom";
import { showToastSuccess, showToastError } from "../../../ToastUtil";

const CreateNewPost = ({ isUpdate, dataPost }) => {
  const navigate = useNavigate();

  const [provinceSelected, setProvinceSelected] = useState({
    id: 0,
    value: "",
  });

  const [districtSelected, setDistrictSelected] = useState({
    id: 0,
    value: "",
  });

  const [exactlyAddress, setExactlyAddress] = useState("");
  const [address, setAddress] = useState("");
  const [categorySelected, setCategorySelected] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [acreage, setAcreage] = useState("");

  const [imgFiles, setImgFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dataPost) return;
    setTitle(dataPost?.title);
    setDescription(dataPost?.description);
    setPrice(dataPost?.attribute?.price);
    setAcreage(dataPost?.attribute?.acreage);
    setAddress(dataPost?.attribute?.address.split(", ").slice(0, 2).join(", "));
    setCategorySelected(dataPost.category);
    setProvinceSelected(dataPost?.attribute?.district?.province);
    setDistrictSelected({
      id: dataPost?.attribute?.district.id,
      value: dataPost?.attribute?.district?.value,
    });
    dataPost?.images?.path && setImgFiles(JSON.parse(dataPost?.images?.path));
  }, [dataPost]);

  const showToastErrorAndSetLoading = (message) => {
    showToastError(message);
    setIsLoading(false);
  };

  const uploadImages = async () => {
    let formData = new FormData();
    let ImgUrls = [];

    for (const file of imgFiles) {
      if (typeof file === "object") {
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_NAME);
        const response = await apiUploadImage(formData);
        if (response.status === 200)
          ImgUrls = [...ImgUrls, response.data.secure_url];
      } else {
        ImgUrls = [...ImgUrls, file];
      }
    }

    return ImgUrls;
  };

  const createPost = async (payload) => {
    const response = await apiCreatePost(payload);
    setIsLoading(false);

    if (response.status === 200) {
      showToastSuccess("Đăng bài thành công");
      navigate("/quan-ly/tin-dang");
    } else {
      showToastError(response.data.response.msg);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (+price > 0 && +acreage > 0);
    else {
      showToastErrorAndSetLoading("Giá hoặc diện tích không hợp lệ");
      return;
    }
    if (imgFiles.length === 0) {
      showToastErrorAndSetLoading(
        "Vui lòng đăng ít nhất 1 ảnh về bài đăng của bạn"
      );
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
    const ImgUrls = await uploadImages();
    payload = { ...payload, ImgUrls };
    if (!isUpdate) {
      await createPost(payload);
    }
    console.log("update + payload");
    console.log(payload);
  };

  return (
    <>
      <h3 className="border-bottom py-3 px-5">Đăng tin mới</h3>
      <Container className="px-5">
        <Row className="py-3">
          <Col md={8}>
            <AddressForm
              provinceSelected={provinceSelected}
              setProvinceSelected={setProvinceSelected}
              districtSelected={districtSelected}
              setDistrictSelected={setDistrictSelected}
              address={address}
              setAddress={setAddress}
              exactlyAddress={exactlyAddress}
              setExactlyAddress={setExactlyAddress}
            />
            <Overview
              title={title}
              description={description}
              acreage={acreage}
              price={price}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              setTitle={setTitle}
              setDescription={setDescription}
              setPrice={setPrice}
              setAcreage={setAcreage}
            />
            <Picture
              imgFiles={imgFiles}
              setImgFiles={setImgFiles}
              isUpdate={isUpdate}
            />
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
