import React from "react";
import Post from "../../components/Post";

const ListPost = () => {
  return (
    <>
      <div className="container">
        <div className="row gx-5">
          <div className="col-12 col-md-8 border rounded bg-light">
            <h5 className="py-3 fw-bold">Danh sách các bài đăng</h5>
            <div className="row">
              <Post />
              <Post />
              <Post />
            </div>
          </div>
          <div className="d-none d-md-block col-md-4">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPost;
