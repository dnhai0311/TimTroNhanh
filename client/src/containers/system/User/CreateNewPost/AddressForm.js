import React, { useEffect, useState } from "react";
import { AddressFormItem, InputPost } from "../../../../components/";

import {
  apiAllGetProvinces,
  apiGetAllDistricts,
} from "../../../../services/app";

const AddressForm = ({ onUpdateDistrictSelected, onUpdateAddress }) => {
  const [provinces, setProvinces] = useState({});
  const [districts, setDistricts] = useState({});
  const [address, setAddress] = useState("");

  const [provinceSelected, setProvinceSelected] = useState({
    id: 0,
    value: "",
  });
  const [districtSelected, setDistrictSelected] = useState({
    id: 0,
    value: "",
  });

  useEffect(() => {
    const fetchAllProvinces = async () => {
      const response = await apiAllGetProvinces();
      if (response?.data?.response) {
        setProvinces(response?.data?.response);
      }
    };
    fetchAllProvinces();
  }, []);

  useEffect(() => {
    const fetchAllDistrict = async (provinceId) => {
      if (Object.keys(provinceSelected).length === 0) return;
      const response = await apiGetAllDistricts(provinceId);
      if (response?.data?.response) {
        setDistricts(response?.data?.response);
      }
    };
    setDistrictSelected({
      id: 0,
      value: "",
    });
    fetchAllDistrict(provinceSelected?.id);
  }, [provinceSelected]);

  useEffect(() => {
    onUpdateDistrictSelected(districtSelected);
  }, [districtSelected, onUpdateDistrictSelected]);

  useEffect(() => {
    onUpdateAddress(address);
  }, [address, onUpdateAddress]);

  // console.log(
  //   "Tỉnh: " + provinceSelected.value + " " + "Quận : " + districtSelected.value
  // );
  return (
    <>
      <h4>Địa chỉ cho thuê</h4>
      <div className="d-flex mt-3 flex-wrap">
        <AddressFormItem
          name={"Tỉnh/Thành phố"}
          values={Object.keys(provinces).length > 0 ? provinces : ""}
          setId={setProvinceSelected}
        />
        <AddressFormItem
          name={"Quận/Huyện"}
          values={Object.keys(districts).length > 0 ? districts : ""}
          setId={setDistrictSelected}
        />
        <InputPost name={"Địa chỉ nhà"} setValue={setAddress} />
        <InputPost
          name={"Địa chỉ chính xác"}
          isDisable={true}
          value={`${
            districtSelected.value && provinceSelected.value
              ? `${address} ${districtSelected.value}, ${provinceSelected.value}`
              : `${provinceSelected.value}`
          }`}
        />
      </div>
    </>
  );
};

export default AddressForm;
