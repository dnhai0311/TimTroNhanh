import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { SearchItem, MyModal } from "../../../components/";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../../ultils/icons";
import "./Search.scss";
import { getDistricts, getProvinces } from "../../../store/actions/app";
import { createSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
  const {
    BsChevronRight,
    IoLocationOutline,
    BsHouseDoor,
    IoPricetagsOutline,
    BiArea,
    FaSearch,
  } = icons;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState(false);
  // const [isShowDistrict, setIsShowDistrict] = useState(false);
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);

  const [category, setCategory] = useState({});
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [price, setPrice] = useState({});
  const [acreage, setAcreage] = useState({});

  const [param, setParam] = useState("");

  const { categories, prices, acreages, provinces, districts } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDistricts(province.id));
  }, [province.id]);

  const handleShow = (content, data) => {
    setContent(content);
    setData(data);
    setIsShowModal(true);
  };

  const handleSelect = (content, item) => {
    if (content === "Loại trọ") setCategory(item);
    if (content === "Vị trí") setProvince(item);
    if (content === "Giá") setPrice(item);
    if (content === "Diện tích") setAcreage(item);
  };

  const handleSubmit = () => {
    category.code
      ? navigate(`/${category.name}/?${param}`)
      : navigate(`?${param}`);
  };

  useEffect(() => {
    const params = createSearchParams({
      provinceId: province.id || "",
      minPrice: price.min || "",
      maxPrice: price.max || "",
      minAcreage: acreage.min || "",
      maxAcreage: acreage.max || "",
    }).toString();
    setParam(params);
  }, [isShowModal, param, province, price, acreage]);

  return (
    <>
      <div className="w-100 searchBar ">
        <div className="mx-auto p-3 bg-danger border rounded d-flex flex-column flex-lg-row justify-content-start">
          <SearchItem
            text={category?.value || "Toàn bộ"}
            IconBefore={<BsHouseDoor className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
            // fontWeight={"fw-bold"}
            handleShow={() => handleShow("Loại trọ", categories)}
          />
          <SearchItem
            text={province?.value || "Toàn bộ"}
            IconBefore={<IoLocationOutline className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
            // handleShow={
            //   province.id
            //     ? () => handleShow(province.value, districts)
            //     : () => handleShow("Vị trí", provinces)
            // }
            handleShow={() => handleShow("Vị trí", provinces)}
          />
          <SearchItem
            text={price?.value || "Chọn giá"}
            IconBefore={<IoPricetagsOutline className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
            handleShow={() => handleShow("Giá", prices)}
          />
          <SearchItem
            text={acreage?.value || "Chọn diện tích"}
            IconBefore={<BiArea className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
            handleShow={() => handleShow("Diện tích", acreages)}
          />
          <Button
            className="w-100 w-lg-25 my-1 mx-1 fw-bold p-1 d-flex justify-content-center align-items-center"
            onClick={handleSubmit}
          >
            <FaSearch className="mx-1" />
            <span>Tìm kiếm</span>
          </Button>
        </div>
      </div>
      {isShowModal && (
        <MyModal
          handleSelect={handleSelect}
          setIsShowModal={setIsShowModal}
          content={content}
          data={data}
        />
      )}
    </>
  );
};

export default Search;
