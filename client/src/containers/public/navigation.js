import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../App.scss";
import { getCategories } from "../../store/actions/category";

const Navigation = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <div className="bg-primary sticky-top">
        <div className="w-100 w-sm-75 m-auto d-flex justify-content-start flex-wrap flex-md-nowrap text-nowrap">
          <div key={0} className="">
            <NavLink
              to="/"
              className={
                "text-light fw-bold text-decoration-none navItem d-inline-block py-2 px-2 text-center"
              }
            >
              Trang chủ
            </NavLink>
          </div>
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <div key={item.id} className="">
                  <NavLink
                    to={item.name}
                    className={
                      "text-light fw-bold text-decoration-none navItem d-inline-block py-2 px-2 text-center"
                    }
                  >
                    {item.value}
                  </NavLink>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default memo(Navigation);
