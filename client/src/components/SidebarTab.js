import React, { memo, useRef } from "react";
import icons from "../ultils/icons";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "../store/actions/post";

const SidebarTab = ({ name, value, isDouble, type, scrollFunction }) => {
  const { BsChevronRight } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (code) => {
    dispatch(getPosts(0, { [type]: code }));
    const newSearchParams = createSearchParams({
      type: [type],
      code: code,
      page: "1",
    }).toString();
    navigate(`/?${newSearchParams}`);
    scrollFunction();
  };
  return (
    <>
      <div className="col-12  border rounded bg-light">
        <h6 className="py-3 fw-bold">{name}</h6>
        {!isDouble && (
          <div className="row">
            {value?.length > 0 &&
              value.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="pb-2 mb-2 d-flex align-items-center sidebarTab col-12"
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
        )}
        {isDouble && (
          <div className="row">
            {value?.length > 0 &&
              value.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="pb-2 mb-2 d-flex align-items-center sidebarTab isDouble col-6"
                  >
                    <BsChevronRight color="#C2C2C2" className="me-1" />
                    <div
                      className="text-decoration-none fw-light sidebarItem"
                      onClick={() => handleClick(item.id)}
                    >
                      {item.value}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(SidebarTab);
