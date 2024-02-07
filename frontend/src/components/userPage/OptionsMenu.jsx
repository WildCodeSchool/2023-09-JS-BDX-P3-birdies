import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Useinfo } from "../../context/InfoContext";

// eslint-disable-next-line react/prop-types
function OptionsMenu({ menuVisible, setOnOff, onOff }) {
  const { user, logout } = Useinfo();

  return (
    <div
      className={menuVisible ? "option-menu-box visible" : "option-menu-box"}
    >
      <ul className="option-menu-list">
        <Link to="/newrecipe">
          <li className="option-menu-line">Ajouter recette</li>
        </Link>
        <Link to={`/userSettings/${user.id}`}>
          <li className="option-menu-line">Modifier compte</li>
        </Link>
        <button
          type="button"
          className="avatar-btn"
          onClick={() => setOnOff(!onOff)}
        >
          <li className="option-menu-line avatar-btn">Avatar</li>
        </button>
        <Link to="/">
          <button type="button" className="avatar-btn" onClick={logout}>
            Déconnexion
          </button>
        </Link>
      </ul>
    </div>
  );
}
OptionsMenu.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
};

export default OptionsMenu;
