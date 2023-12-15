import { Link } from "react-router-dom";
import replyArrow from "../../styles/icons/Reply Arrow.png";
import logo from "../../styles/icons/logo.png";

function RecipeHeader() {
  return (
    <Link to="/">
      <div className="recipe-header">
        <div className="arrow-container">
          <img src={replyArrow} alt="fleche retour" />
        </div>
        <div className="logo-container">
          <img src={logo} alt="logo retour" />
        </div>
      </div>
    </Link>
  );
}

export default RecipeHeader;
