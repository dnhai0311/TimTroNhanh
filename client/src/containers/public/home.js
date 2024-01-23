import React from "react";
import ListPost from "./ViewPost/ListPost";
import Search from "./Header/Search";
import Banner from "./Header/Banner";

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
