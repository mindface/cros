import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header className="header boxShadow">
      <div className="header__inner">
        <Nav />
      </div>
    </header>
  );
}

export default Header;
