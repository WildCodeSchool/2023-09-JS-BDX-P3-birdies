import { useState, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import burger from "../styles/icons/burger.png";
import logo from "../styles/icons/logo.png";
import BoxLogin from "./BoxLogin";
import search from "../styles/icons/Search.png";

function Navigation() {
  const [login, setLogin] = useState(false);
  const [getToggleSearch, setGetToggleSearch] = useState(false);

  const menuRef = useRef();

  const toggleSearch = () => {
    setGetToggleSearch(!getToggleSearch);
  };

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
      <div className="logo-appli-main">
        <img src={logo} alt="Lodo appli" />
      </div>
      <div className="search-logo">
        <button type="button" className="btn-search" onClick={toggleSearch}>
          <img src={search} alt="Icon search" />
        </button>
        {getToggleSearch && (
          <DebounceInput
            className="input-search"
            type="text"
            placeholder="Rechercher"
          />
        )}
      </div>
    </div>
  );
}

export default Navigation;
