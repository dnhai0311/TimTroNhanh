import React, { useEffect, useRef, useState } from "react";
import Post from "../../../components/Post";
import { getAllPosts, getPosts } from "../../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { createSearchParams, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./ListPost.scss";

const ListPost = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const titleListRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const { posts, total } = useSelector((state) => state.post);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    const selectedPage = +pageParam - 1 >= 0 ? +pageParam - 1 : 0;
    dispatch(getPosts(selectedPage));
    setCurrentPage(selectedPage);
  }, [dispatch, location]);

  const handlePageClick = (e) => {
    const selectedPage = +e.selected;
    setCurrentPage(selectedPage);
    dispatch(getPosts(selectedPage));
    const newSearchParams = createSearchParams({
      page: selectedPage + 1,
    }).toString();
    window.history.pushState(null, "", `/?${newSearchParams}`);
    titleListRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 border rounded bg-light">
            <h5 ref={titleListRef} className="py-3 fw-bold">
              Danh sách các bài đăng
            </h5>
            <div className="row">
              {posts?.length > 0 &&
                posts.map((item) => {
                  return (
                    <Post
                      key={item?.id}
                      name={item?.name}
                      value={item?.info}
                      star={+item?.star}
                      price={item?.attribute.price}
                      area={item?.attribute.area}
                      location={item?.attribute.location}
                      uploader={item?.user.name}
                      time={item?.updatedAt}
                      img={
                        process.env.PUBLIC_URL +
                        JSON.parse(item?.images.path)[0]
                      }
                      phone={item?.user.phone}
                      id={item?.id}
                    />
                  );
                })}
            </div>
          </div>
          <div className="d-none d-md-block col-md-4 ps-5">
            <Sidebar />
          </div>
        </div>
        <div className="col-8 pt-2">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.floor(total / 3 + 1)}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination justify-content-center"
            activeClassName="active"
            forcePage={currentPage}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
};

export default ListPost;
