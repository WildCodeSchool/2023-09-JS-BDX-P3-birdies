import React from "react";
import burger from "../../styles/icons/burger.png";
import logo from "../../styles/icons/logo 3.png";
import search from "../../styles/icons/Search.png";

function Navigation() {
  return (
    <div className="navbar-container">
      <div className="burger-logo">
        <img className="logo" src={burger} alt="icon Burger" />
      </div>
      <div className="logo">
        <img src={logo} alt="Lodo appli" />
      </div>
      <div className="search-logo">
        <img className="logo" src={search} alt="icon search" />
      </div>
    </div>
  );
}

export default Navigation;
