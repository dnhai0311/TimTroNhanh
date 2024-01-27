import React, { memo } from "react";

const SearchItem = ({
  text,
  IconBefore,
  IconAfter,
  fontWeight,
  handleShow,
}) => {
  return (
    <>
      <div
        onClick={handleShow}
        className="bg-light p-1 mx-1 my-1 border rounded w-100 w-lg-25 fw-normal d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer" }}
      >
        <div className=" d-flex justify-content-between align-items-center text-nowrap d-inline-block text-truncate mx-1">
          {IconBefore}
          <span className={fontWeight}>{text}</span>
        </div>
        {IconAfter}
      </div>
    </>
  );
};

export default memo(SearchItem);
