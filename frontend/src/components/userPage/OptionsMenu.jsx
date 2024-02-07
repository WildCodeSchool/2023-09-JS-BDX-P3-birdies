import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Useinfo } from "../../context/InfoContext";

function OptionsMenu({ menuVisible, setFileVisible }) {
  const { user } = Useinfo();

  const showButton = () => {
    setFileVisible(!true);
  };

  return (
    <div
      className={menuVisible ? "option-menu-box visible" : "option-menu-box"}
    >
      <ul className="option-menu-list">
        <Link to="/newrecipe">
          <li className="option-menu-line">Ajouter une recette</li>
        </Link>
        <Link to={`/userSettings/${user.id}`}>
          <li className="option-menu-line">modif de compte</li>
        </Link>
        <Link to="/slideone">
          <li className="option-menu-line">deconnexion</li>
        </Link>
        <button type="button" className="avatar-btn" onClick={showButton}>
          <li className="option-menu-line avatar-btn">Modifier avatar</li>
        </button>
      </ul>
    </div>
  );
}
OptionsMenu.propTypes = {
  menuVisible: PropTypes.bool.isRequired,
  // setFileVisible: PropTypes.bool.isRequired,
  setFileVisible: PropTypes.func.isRequired,
};

export default OptionsMenu;
