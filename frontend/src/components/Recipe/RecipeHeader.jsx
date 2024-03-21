import { Link, useNavigate } from "react-router-dom";
import replyArrow from "../../styles/icons/Reply Arrow.svg";
import logo from "../../styles/icons/logo.svg";

function RecipeHeader() {
  const navigate = useNavigate();

  return (
    <div className="recipe-header">
      <div className="arrow-container">
        <button
          type="button"
          className="button-box"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={replyArrow} alt="fleche retour" />
        </button>
      </div>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="logo retour" />
        </Link>
      </div>
    </div>
  );
}

export default RecipeHeader;
