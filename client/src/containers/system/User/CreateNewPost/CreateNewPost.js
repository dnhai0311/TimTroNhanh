import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddressForm from "./AddressForm";
import Overview from "./Overview";
import Picture from "./Picture";

const CreateNewPost = () => {
  const [districtSelected, setDistrictSelected] = useState({
    id: 0,
    value: "",
  });

  const [address, setAddress] = useState("");

  const [categorySelected, setCategorySelected] = useState({
    id: 0,
    value: "",
  });

  const updateDistrictSelected = (selectedDistrict) => {
    setDistrictSelected(selectedDistrict);
  };

  const updateAddress = (address) => {
    setAddress(address);
  };

  // console.log(districtSelected.id);

  return (
    <>
      <h3 className="border-bottom py-3 px-5">Đăng tin mới</h3>
      <Container className="px-5">
        <Row className="py-3">
          <Col md={8}>
            <AddressForm
              onUpdateDistrictSelected={updateDistrictSelected}
              onUpdateAddress={updateAddress}
            />
            <Overview />
            <Picture />
            <Button className="w-100 p-2 mt-3 bg-success fw-bold">
              Đăng bài
            </Button>
          </Col>
          <Col md={4}>map</Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateNewPost;