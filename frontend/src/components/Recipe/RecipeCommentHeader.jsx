import logo from "../../styles/icons/logo.png";

function RecipeCommentHeader() {
  return (
    <div className="leave-comments-header">
      <div className="leave-comments-picture-area">
        <img src={logo} alt="logo" />
      </div>
      <div className="leave-comments-title-area">
        <h2 className="leave-comments-title">Partagez votre avis !</h2>
      </div>
    </div>
  );
}

export default RecipeCommentHeader;
