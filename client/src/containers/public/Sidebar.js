import React, { memo } from "react";
import SidebarTab from "../../components/SidebarTab";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.category);
  return (
    <>
      <div className="row gy-4">
        <SidebarTab name={"Danh mục cho thuê"} value={categories} />
        <SidebarTab name={"Xem theo giá"} value={""} />
        <SidebarTab name={"Xem theo diện tích"} value={""} />
      </div>
    </>
  );
};

export default memo(Sidebar);
