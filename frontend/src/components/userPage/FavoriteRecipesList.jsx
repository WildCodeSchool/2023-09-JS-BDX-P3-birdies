import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Useinfo } from "../../context/InfoContext";
import PenImg from "../../styles/icons/Pen-img.png";
import star from "../../styles/icons/Star.png";

function FavoriteRecipesList({ kindOfRecipes }) {
  const { recipes, Average } = Useinfo();

  function handleDeleteRecipe() {
    console.info("recette supprimée");
  }
  return (
    <div className="recipe-container">
      {recipes.map((recipe) => (
        <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
          <div
            className="recipe-card"
            style={{
              backgroundImage: `url(${recipe.picture})`,
            }}
          >
            {kindOfRecipes === "mines" && (
              <Link to={`/modifyRecipes/${recipe.id}`} className="modify-btn">
                <img src={PenImg} alt="pen" className="pen-img" />
              </Link>
            )}
            <button
              type="button"
              className="delete-btn"
              onClick={handleDeleteRecipe}
            >
              x
            </button>
            <h3 className="recipe-name">{recipe.name}</h3>
            <div className="rate-container">
              <div className="stars">
                <img src={star} alt="star-img" />
                <div className="on-note">{Average(recipe.notes)}/5</div>
              </div>
              <div className="votes">
                <p className="votes">{recipe.notes.length} votes</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
FavoriteRecipesList.propTypes = {
  kindOfRecipes: PropTypes.string.isRequired,
};
export default FavoriteRecipesList;
