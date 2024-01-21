import React, { memo } from "react";

const Post = (name, price, area, location, time, info, uploader, img) => {
  return (
    <div className="col-12">
      <div className="row gx-4">
        <div className="col-4 bg-primary">Hình</div>
        <div className="col-8 bg-success">
          <div className="px-2">
            Tên trọ là Amet ut ut ipsum cillum ali quaal iquaal iquaaliq aali
            qua aliqua.
          </div>
          <div className="px-2 d-flex justify-content-between">
            <div>Giá tiền</div>
            <div>Diện tích</div>
            <div>Vị Trí</div>
            <div>Thời gian</div>
          </div>
          <div className="px-2">
            Non laborum sint culpa occaecat voluptate reprehenderit commodo
            consectetur sunt qui ad deserunt.Non laborum sint culpa occaecat
            voluptate reprehenderit commodo consectetur sunt qui ad deserunt.
          </div>
          <div className="px-2">
            Avatar
            <span>Người đăng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);
