import React, { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";

const SidebarTab = ({ name, value }) => {
  const { BsChevronRight } = icons;

  return (
    <>
      <div className="col-12  border rounded bg-light">
        <h6 className="py-3 fw-bold">{name}</h6>
        {value?.length > 0 &&
          value.map((item) => {
            return (
              <div
                key={item.id}
                className="pb-2 mb-2 d-flex align-items-center sidebarTab"
              >
                <BsChevronRight color="#C2C2C2" className="me-1" />
                <Link
                  to={item.name}
                  className="text-decoration-none fw-light sidebarItem"
                >
                  {item.value}
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default memo(SidebarTab);
