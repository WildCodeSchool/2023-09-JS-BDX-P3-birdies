import replyArrow from "../../styles/icons/Reply Arrow.png";
import logo from "../../styles/icons/logo.png";

function RecipeHeader() {
  return (
    <div className="recipe-header">
      <div className="arrow-container">
        <img src={replyArrow} alt="fleche retour" />
      </div>
      <div className="logo-container">
        <img src={logo} alt="logo retour" />
      </div>
    </div>
  );
}

export default RecipeHeader;
