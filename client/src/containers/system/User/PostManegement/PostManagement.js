import React, { useEffect, useState } from "react";
import PostTable from "./PostTable";
import { Container, Row, Button } from "react-bootstrap";
import { apiGetAllPosts } from "../../../../services/user";
import moment from "moment";
import UpdatePost from "./UpdatePost";

const PostManagement = () => {
  const [posts, setPosts] = useState({});
  const [total, setTotal] = useState(0);
  const [isShowPostUpdate, setIsShowPostUpdate] = useState(false);
  const [selectedPost, setSelectedPost] = useState(0);

  const columns = [
    {
      accessorKey: "postId",
      header: "Mã tin",
    },
    {
      accessorKey: "postImg",
      header: "Ảnh đại diện tin",
      cell: (props) => {
        return (
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={JSON.parse(props.getValue())[0]}
              width={100}
              height={100}
              alt="thumbnail"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Tiêu đề",
      cell: (props) => {
        return (
          <div className="text-wrap" style={{ width: "250px" }}>
            {props.getValue()}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Giá",
      cell: (props) => {
        const price = props.getValue();
        return price < 1
          ? `${price * 1000}.000 đồng/tháng`
          : `${price} triệu/tháng`;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Ngày cập nhật",
      cell: (updatedAt) => moment(updatedAt.getValue()).format("DD-MM-YYYY"),
    },
    {
      accessorKey: "expiredAt",
      header: "Ngày hết hạn",
      cell: (expiredAt) => moment(expiredAt.getValue()).format("DD-MM-YYYY"),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
    },
    {
      accessorKey: "action",
      header: "Tuỳ chọn",
      cell: (props) => {
        return (
          <>
            <div className="d-flex flex-column">
              <Button
                className="w-100 my-1 bg-success"
                onClick={() => {
                  setIsShowPostUpdate(true);
                  setSelectedPost(props.row.original.postId);
                }}
              >
                Sửa
              </Button>
              <Button
                className="w-100 my-1 bg-danger"
                onClick={() => {
                  setSelectedPost(props.row.original.postId);
                }}
              >
                Xoá
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await apiGetAllPosts();
      setPosts(response.data.response.rows);
      setTotal(response.data.response.count);
    };
    fetchAllPosts();
  }, []);

  return (
    <>
      <h3 className="border-bottom py-3 px-5">Quản lý tin đăng</h3>
      <Container className="px-1">
        <Row>
          <PostTable columns={columns} data={posts} total={total} />
        </Row>
      </Container>
      {isShowPostUpdate && (
        <UpdatePost
          isShow={isShowPostUpdate}
          setIsShow={setIsShowPostUpdate}
          selectedPostId={selectedPost}
        />
      )}
    </>
  );
};

export default PostManagement;
