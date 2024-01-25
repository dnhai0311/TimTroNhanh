import React, { memo, useEffect } from "react";
import SidebarTab from "../../../components/SidebarTab";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.scss";
import { getAcreages, getPrices } from "../../../store/actions/app";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories, prices, acreages } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getAcreages());
    dispatch(getPrices());
  }, []);

  return (
    <>
      <div className="row gy-4">
        <SidebarTab name={"Danh mục cho thuê"} value={categories} />
        <SidebarTab name={"Xem theo giá"} value={prices} isDouble={true} />
        <SidebarTab
          name={"Xem theo diện tích"}
          value={acreages}
          isDouble={true}
        />
      </div>
    </>
  );
};

export default memo(Sidebar);
