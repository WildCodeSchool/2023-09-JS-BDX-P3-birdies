import { useState, useEffect, useRef } from "react";
import burger from "../styles/icons/burger.png";

import logo from "../styles/icons/logo 3.png";
import BoxLogin from "./BoxLogin";


function Navigation() {
  const [login, setLogin] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setLogin(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  return (
    <div className="navbar-container" ref={menuRef}>
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
    </div>
  );
}

export default Navigation;
