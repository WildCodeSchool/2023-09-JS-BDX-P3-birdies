/* eslint-disable jsx-a11y/img-redundant-alt */

import { Link } from "react-router-dom";
import { Useinfo } from "../../context/InfoContext";
import logo from "../../styles/icons/logo.svg";

function SlideBestOne() {
  const { lastRecipes, favoriteRecipes, manageFavoriteRecipes } = Useinfo();

  return (
    <div className="slide-one-container">
      {(lastRecipes ?? []).map((recipe) => (
        <div className="slide-best-one-container" key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>
            <div className="card-container">
              <div className="content-container">
                <h1 style={{ color: "white" }}>{recipe.name}</h1>
              </div>
              <div className="content-container-picture">
                <img
                  className="recipe-image"
                  src={
                    recipe.url === null
                      ? logo
                      : `${import.meta.env.VITE_BACKEND_URL}/${recipe.url}`
                  }
                  alt="représentation de la recette"
                />
              </div>
            </div>
          </Link>
          <div className="container-icon-recipe">
            <button
              className="btn-like-box"
              type="button"
              value={recipe.id}
              onClick={manageFavoriteRecipes}
            >
              {favoriteRecipes.includes(parseInt(recipe.id, 10)) ? "❤️" : "🤍"}
            </button>
            <span>{recipe.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlideBestOne;
