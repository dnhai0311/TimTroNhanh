import React, { memo } from "react";
import picture from "../assets/banner/banner.png";
import icons from "../ultils/icons";
import "../App.scss";

const { FaStar, FaRegUserCircle } = icons;

const Post = (name, price, area, location, time, info, uploader, img) => {
  return (
    <div className="col-12 py-3 border-top border-bottom border-dark">
      <div className="row gx-4">
        <div className="col-4 d-flex">
          <img src={picture} className="w-100 rounded " />
        </div>
        <div className="col-8 bg-light">
          <div className="px-2 fw-bold text-danger line-clamp text-justify">
            Phòng Master Tolet riêng Căn hộ Chung cư Era Town Đức Khải, Phường
            Phú Mỹ, Quận 7
          </div>
          <div className="px-2 ">
            <FaStar color="#FFD24E" />
            <FaStar color="#FFD24E" />
            <FaStar color="#FFD24E" />
            <FaStar color="#FFD24E" />
            <FaStar color="#FFD24E" />
          </div>
          <div className="px-2 d-flex justify-content-between">
            <div className="fw-bold text-success">1.7 Triệu/Tháng</div>
            <div>27m²</div>
            <div>Quận 7, Hồ Chí Minh</div>
            <div>2 ngày trước</div>
          </div>
          <div className="px-2 my-2 line-clamp text-justify fw-light">
            -- Khai trương toà nhà CHDV với nhiều dạng căn hộ Studio, Duplex và
            căn hộ 1 PN tại địa chỉ 71 Bạch Đằng, ngay ngã tư Hàng Xanh, Quận
            Bình Thạnh. Giá thuê : 6,5 – 11 triệu. Tặng voucher giảm 1 triệu cho
            khách vô ở liền. -- Toàn bộ căn hộ được trang bị đầy đủ nội thất cao
            cấp : Cửa khoá từ, Tủ bếp trên dưới, Tủ lạnh, Lò viba, Máy hút mùi,
            Giường, Tủ, Chăn, Ga, Gối Nệm, Bàn ghế…
          </div>
          <div className="px-2 d-flex align-items-center">
            <FaRegUserCircle fontSize={"20px"} />
            <span className="px-2">Hải Dương</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);
