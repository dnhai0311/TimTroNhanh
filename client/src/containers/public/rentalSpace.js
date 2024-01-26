import React from "react";
import ListPost from "./ViewPost/ListPost";
import Search from "./Header/Search";
export const RentalSpace = () => {
  return (
    <>
      <Search />
      <ListPost categoryCode={"CTMB"} />
    </>
  );
};

export default RentalSpace;
