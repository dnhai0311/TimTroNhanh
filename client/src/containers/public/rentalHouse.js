import React from "react";
import ListPost from "./ViewPost/ListPost";
import Search from "./Header/Search";

export const RentalHouse = () => {
  return (
    <>
      <Search />
      <ListPost categoryCode={"NCT"} />
    </>
  );
};

export default RentalHouse;
