import React, { useState } from "react";
import { AddressFormItem, InputPost } from "../../../../components/";
import { useSelector } from "react-redux";

const Overview = () => {
  const { categories } = useSelector((state) => state.app);
  const { userData } = useSelector((state) => state.user);

  const [categorySelected, setCategorySelected] = useState({
    id: 0,
    value: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [acreage, setAcreage] = useState("");

  return (
    <>
      <div className="mt-5">
        <h4>Thông tin mô tả</h4>
        <AddressFormItem
          name={"Loại chuyên mục"}
          values={categories}
          setId={setCategorySelected}
        />
        <InputPost name={"Tiêu đề"} setValue={setTitle} />
        <InputPost
          name={"Nội dung mô tả"}
          setValue={setDescription}
          isTextArea={true}
        />
        <InputPost
          name={"Thông tin liên hệ"}
          value={userData.name || ""}
          isDisable={true}
          width="w-50"
        />
        <InputPost
          name={"Số điện thoại"}
          value={userData.phone || ""}
          isDisable={true}
          width="w-50"
        />
        <InputPost
          name={"Giá cho thuê"}
          setValue={setPrice}
          isAfter={true}
          text={"đồng/tháng"}
          width="w-50"
        />
        <InputPost
          name={"Diện tích"}
          setValue={setAcreage}
          isAfter={true}
          text={"m²"}
          width="w-50"
        />
      </div>
    </>
  );
};

export default Overview;
