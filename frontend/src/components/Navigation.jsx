import React, { useState } from "react";
import burger from "../styles/icons/burger.png";
import logo from "../styles/icons/logo 3.png";
import search from "../styles/icons/Search.png";
import BoxLogin from "./BoxLogin";

function Navigation() {
  const [login, setLogin] = useState(false);
  return (
    <div className="navbar-container">
      <button
        type="button"
        className="burger-logo"
        onClick={() => setLogin(!login)}
      >
        <img className="logo" src={burger} alt="icon Burger" />
      </button>
      {login && <BoxLogin />}
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
