import { useState, useEffect, useRef } from "react";
import burger from "../styles/icons/burger.png";
import logo from "../styles/icons/logo 3.png";
import search from "../styles/icons/Search.png";
import BoxLogin from "./BoxLogin";
import SearchInputPagePrincipale from "./SearchInputPagePrincipale";

function Navigation() {
  const [login, setLogin] = useState(false);
  const [getSearch, setGetSearch] = useState(false);

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
      <button
        type="button"
        className="search-logo"
        onClick={() => setGetSearch(!getSearch)}
      >
        {getSearch && <SearchInputPagePrincipale />}
        <img className="logo" src={search} alt="icon search" />
      </button>
    </div>
  );
}

export default Navigation;
