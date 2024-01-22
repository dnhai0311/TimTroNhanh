import React from "react";
import ListPost from "./ListPost";
import Search from "./Search";
import Banner from "./Banner";

const Home = () => {
  return (
    <>
      <Search />
      <Banner />
      <ListPost />
    </>
  );
};

export default Home;
