import React from "react";
import Button from "react-bootstrap/Button";
import SearchItem from "../../components/SearchItem";
import icons from "../../ultils/icons";

const {
  BsChevronRight,
  IoLocationOutline,
  BsHouseDoor,
  IoPricetagsOutline,
  BiArea,
  FaSearch,
} = icons;

const Search = () => {
  return (
    <>
      <div className="w-100 searchBar ">
        <div className="mx-auto p-3 bg-danger border rounded d-flex flex-column flex-lg-row justify-content-start">
          <SearchItem
            text={"Phòng trọ"}
            IconBefore={<BsHouseDoor className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
            fontWeight={"fw-bold"}
          />
          <SearchItem
            text={"Toàn quốc"}
            IconBefore={<IoLocationOutline className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
          />
          <SearchItem
            text={"Chọn giá"}
            IconBefore={<IoPricetagsOutline className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
          />
          <SearchItem
            text={"Chọn diện tích"}
            IconBefore={<BiArea className="mx-1" color="#C2C2C2" />}
            IconAfter={<BsChevronRight color="#C2C2C2" />}
          />
          <Button className="w-100 w-lg-25 my-1 mx-1 fw-bold p-1 d-flex justify-content-center align-items-center">
            <FaSearch className="mx-1" />
            <span>Tìm kiếm</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Search;
