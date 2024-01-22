import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="row gy-4">
        <div className="col-12  border rounded bg-light">
          <h6 className="py-3 fw-bold">Danh mục cho thuê</h6>
        </div>
        <div className="col-12  border rounded bg-light">
          <h6 className="py-3 fw-bold">Xem theo giá</h6>
        </div>
        <div className="col-12  border rounded bg-light">
          <h6 className="py-3 fw-bold">Xem theo diện tích</h6>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
