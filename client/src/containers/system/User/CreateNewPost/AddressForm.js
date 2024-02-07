import React, { memo, useEffect, useState } from "react";
import { AddressFormItem, InputPost } from "../../../../components/";

import {
  apiAllGetProvinces,
  apiGetAllDistricts,
} from "../../../../services/app";

const AddressForm = ({
  provinceSelected,
  setProvinceSelected,
  districtSelected,
  setDistrictSelected,
  address,
  setAddress,
  exactlyAddress,
  setExactlyAddress,
}) => {
  const [provinces, setProvinces] = useState({});
  const [districts, setDistricts] = useState({});

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
      const selectedDistrictInNewList = response?.data?.response.find(
        (district) => district.id === districtSelected.id
      );
      setDistrictSelected(
        selectedDistrictInNewList || {
          id: 0,
          value: "",
        }
      );
    };
    if (provinceSelected?.id > 0) {
      fetchAllDistrict(provinceSelected?.id);
    }
  }, [provinceSelected, districtSelected.id, setDistrictSelected]);

  useEffect(() => {
    setExactlyAddress(
      `${
        districtSelected &&
        districtSelected.value &&
        provinceSelected &&
        provinceSelected.value
          ? `${address}, ${districtSelected.value}, ${provinceSelected.value}`
          : provinceSelected && provinceSelected.value
          ? `${provinceSelected.value}`
          : ""
      }`
    );
  }, [
    provinceSelected,
    districtSelected,
    address,
    setExactlyAddress,
    exactlyAddress,
  ]);

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
          setValue={setProvinceSelected}
          value={provinceSelected}
        />
        <AddressFormItem
          name={"Quận/Huyện"}
          values={Object.keys(districts).length > 0 ? districts : ""}
          setValue={setDistrictSelected}
          value={districtSelected}
        />
        <InputPost name={"Địa chỉ nhà"} setValue={setAddress} value={address} />
        <InputPost
          name={"Địa chỉ chính xác"}
          isDisable={true}
          value={exactlyAddress || ""}
        />
      </div>
    </>
  );
};

export default memo(AddressForm);
