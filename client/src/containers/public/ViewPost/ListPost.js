import React, { useEffect, useRef, useState } from "react";
import Post from "../../../components/Post";
import { getAllPosts, getPosts } from "../../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { createSearchParams, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./ListPost.scss";

const ListPost = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const titleListRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const { posts, total } = useSelector((state) => state.post);
  const pageDisplayed = 3;
  const totalPage =
    total % pageDisplayed < 1
      ? Math.floor(total / pageDisplayed)
      : Math.floor(total / pageDisplayed) + 1;
  const scrollToTitle = () => {
    titleListRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    // dispatch(getAllPosts());
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    const priceParam = queryParams.get("priceCode");
    const acreageParam = queryParams.get("acreageCode");
    const selectedPage = +pageParam - 1 >= 0 ? +pageParam - 1 : 0;
    // dispatch(getPosts(selectedPage, { categoryCode: categoryCode }));
    !acreageParam && !priceParam
      ? dispatch(getPosts(selectedPage))
      : dispatch(
          getPosts(selectedPage, {
            [priceParam ? "priceCode" : "acreageCode"]:
              priceParam || acreageParam,
          })
        );
    setCurrentPage(selectedPage);
  }, [dispatch, location, currentPage]);

  const handlePageClick = (e) => {
    const selectedPage = +e.selected;
    setCurrentPage(selectedPage);
    const queryParams = new URLSearchParams(window.location.search);
    const priceParam = queryParams.get("priceCode");
    const acreageParam = queryParams.get("acreageCode");
    const newSearchParams = createSearchParams({
      ...(priceParam || acreageParam
        ? {
            [priceParam ? "priceCode" : "acreageCode"]:
              priceParam || acreageParam,
          }
        : {}),
      page: selectedPage + 1,
    }).toString();
    window.history.pushState(
      null,
      "",
      `${location.pathname}?${newSearchParams}`
    );
    scrollToTitle();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 border rounded bg-light ListPost">
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
                      area={item?.attribute.acreage}
                      location={item?.attribute.address}
                      uploader={item?.user.name}
                      time={item?.updatedAt}
                      img={JSON.parse(item?.images.path)[0]}
                      phone={item?.user.phone}
                      id={item?.id}
                    />
                  );
                })}
            </div>
          </div>
          <div className="d-none d-md-block col-md-4 ps-5">
            <Sidebar scrollFunction={scrollToTitle} />
          </div>
        </div>
        <div className="col-8 pt-2">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageDisplayed}
            pageCount={totalPage}
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
