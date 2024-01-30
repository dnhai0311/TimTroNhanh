import React from "react";
import Contact from "./Contact.js";

const Footer = () => {
  console.log("render");
  return (
    <>
      <div className="w-100 w-sm-75 m-auto">
        <Contact />
      </div>
    </>
  );
};

export default Footer;
