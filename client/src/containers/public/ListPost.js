import React, { useEffect } from "react";
import Post from "../../components/Post";
import { getPosts } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";

const ListPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  console.log(posts);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 border rounded bg-light">
            <h5 className="py-3 fw-bold">Danh sách các bài đăng</h5>
            <div className="row">
              {/* <Post />
              <Post />
              <Post /> */}
              {posts?.length > 0 &&
                posts.map((item) => {
                  return (
                    <Post
                      key={item.id}
                      name={item.name}
                      value={item.info}
                      star={+item.star}
                      price={item.attribute.price}
                      area={item.attribute.area}
                      location={item.attribute.location}
                      uploader={item.user.name}
                      time={item.updatedAt}
                      img={
                        process.env.PUBLIC_URL + JSON.parse(item.images.path)[0]
                      }
                      phone={item.user.phone}
                    />
                  );
                })}
            </div>
          </div>
          <div className="d-none d-md-block col-md-4 ps-5">
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
