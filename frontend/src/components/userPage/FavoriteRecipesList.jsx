import { Useinfo } from "../../context/InfoContext";

function FavoriteRecipesList() {
  const { favoriteRecipesComplete } = Useinfo();

  return (
    <div>
      {favoriteRecipesComplete.map((recipe) => (
        <div className="recipe-container-show">
          <button type="button" className="delete-btn">
            x
          </button>
          <h3 className="recipe-name">{recipe.name}</h3>
          <div className="recipe-picture">{recipe.picture}</div>
          <div className="publication-date">{recipe.publicationDate}</div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipesList;
