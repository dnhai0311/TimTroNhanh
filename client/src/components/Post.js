import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import "../App.scss";

const { FaStar, FaRegUserCircle, FaHeart } = icons;

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
  phone,
}) => {
  const [isRed, setIsRed] = useState(false);

  return (
    <div className="col-12 py-3 border-top border-bottom border-dark">
      <div className="row gx-4">
        <div className="col-4 d-flex position-relative">
          <img
            src={process.env.PUBLIC_URL + img}
            alt="thumbnail"
            className=" rounded post-thumb"
          />
          <div className={"position-absolute bottom-0 end-0 "}>
            <FaHeart
              className={`mx-4 my-2 icon-heart ${
                isRed ? "text-danger" : "text-dark"
              }`}
              fontSize={"25px"}
              onClick={() => {
                setIsRed(!isRed);
              }}
            />
          </div>
        </div>
        <div className="col-8 bg-light">
          <div className="px-2 fw-bold text-danger line-clamp text-justify ">
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
            <div className="fw-bold text-success text-truncate">{price}</div>
            <div className="text-truncate">{area}</div>
            <div className="text-truncate">{location}</div>
            <div className="text-truncate">Hôm nay</div>
          </div>
          <div className="px-2 my-2 line-clamp text-justify fw-light">
            {value}
          </div>
          <div className="px-2">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <FaRegUserCircle fontSize={"20px"} />
                <span className="px-2 text-truncate">{uploader}</span>
              </div>
              <div className="col-6 text-end text-truncate p-1 text-light">
                <span className="border p-1 rounded bg-primary ">
                  Liên hệ: {phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);
