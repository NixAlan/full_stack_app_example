import { Link } from "@reach/router";
import React, { useState } from "react";

const Header = (props) => {
  const { link, linkText, titleText } = props;

  return (
    <header>
      <h1
        style={{
          fontSize: "50px",
          borderBottom: "5px double lightgray",
          // marginLeft: "450px",
          // marginRight: "450px",
          margin: "0 auto",
        }}
      >
        {titleText}
      </h1>
      <Link to={link}>{linkText}</Link>
    </header>
  );
};

export default Header;
