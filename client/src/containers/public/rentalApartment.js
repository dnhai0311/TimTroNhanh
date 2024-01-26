import React from "react";
import ListPost from "./ViewPost/ListPost";
import Search from "./Header/Search";

export const RentalApartment = () => {
  return (
    <>
      <Search />
      <ListPost categoryCode={"CTCH"} />
    </>
  );
};

export default RentalApartment;
