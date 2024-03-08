import PropTypes from "prop-types";

function RecipeImage({
  id,
  manageFavoriteRecipes,
  favoriteRecipes,
  recipePicture,
}) {
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
        src={`${import.meta.env.VITE_BACKEND_URL}/${recipePicture.url}`}
        alt="recipe-img"
      />
    </div>
  );
}

RecipeImage.propTypes = {
  id: PropTypes.string.isRequired,
  manageFavoriteRecipes: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.arrayOf.isRequired,
  recipePicture: PropTypes.objectOf.isRequired,
};

export default RecipeImage;
