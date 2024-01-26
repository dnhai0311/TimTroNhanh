import React from "react";
import ListPost from "./ViewPost/ListPost";
import Search from "./Header/Search";

export const RentalRoom = () => {
  return (
    <>
      <Search />
      <ListPost categoryCode={"CTPT"} />
    </>
  );
};

export default RentalRoom;
