import React from "react";
import { Useinfo } from "../../context/InfoContext";

function UserRecipesList() {
  const { userByRecipe } = Useinfo();

  return (
    <div>
      {userByRecipe.map((recipe) => (
        <div className="user-recipe-container">
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

export default UserRecipesList;
