import PropTypes from "prop-types";
import logo from "../../styles/icons/logo.svg";
import { Useinfo } from "../../context/InfoContext";

function RecipeImage({ id }) {
  const { manageFavoriteRecipes, favoriteRecipes, recipePicture } = Useinfo();
  return (
    <div className="recipe-img-container">
      <button
        className="like-btn"
        type="button"
        value={id}
        onClick={manageFavoriteRecipes}
      >
        {favoriteRecipes.includes(parseInt(id, 10)) ? "❤️" : "🤍"}
      </button>
      <img
        src={
          recipePicture === ""
            ? logo
            : `${import.meta.env.VITE_BACKEND_URL}/${recipePicture.url}`
        }
        alt="Représentation visuelle de la recette"
      />
    </div>
  );
}

RecipeImage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RecipeImage;
