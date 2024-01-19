import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";
import "../../App.css";
import { apiGetCategories } from "../../services/category";

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.err === 0) {
        setCategories(response.data.response);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="bg-primary">
      <Container className="d-flex justify-content-center flex-wrap flex-sm-nowrap">
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
      </Container>
    </div>
  );
};

export default Navigation;
