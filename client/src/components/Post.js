import React, { memo } from "react";
import icons from "../ultils/icons";
import "../App.scss";

const { FaStar, FaRegUserCircle } = icons;

const Post = ({
  name,
  price,
  area,
  location,
  star,
  time,
  value,
  uploader,
  img,
}) => {
  return (
    <div className="col-12 py-3 border-top border-bottom border-dark">
      <div className="row gx-4">
        <div className="col-4 d-flex">
          <img
            src={process.env.PUBLIC_URL + img}
            className=" rounded post-thumb"
          />
        </div>
        <div className="col-8 bg-light">
          <div className="px-2 fw-bold text-danger line-clamp text-justify">
            {name}
          </div>
          <div className="px-2 ">
            {Array(5)
              .fill()
              .map((_, index) =>
                index < star ? (
                  <FaStar key={index} color="#FFD24E" />
                ) : (
                  <FaStar key={index} color="#fffff" />
                )
              )}
          </div>
          <div className="px-2 d-flex justify-content-between">
            <div className="fw-bold text-success">{price}</div>
            <div>{area}</div>
            <div>{location}</div>
            <div>Hôm nay</div>
          </div>
          <div className="px-2 my-2 line-clamp text-justify fw-light">
            {value}
          </div>
          <div className="px-2 d-flex align-items-center">
            <FaRegUserCircle fontSize={"20px"} />
            <span className="px-2">{uploader}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);
