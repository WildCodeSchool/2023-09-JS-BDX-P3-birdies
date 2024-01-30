import React from "react";
import { Useinfo } from "../../context/InfoContext";

function UserRecipesList() {
  const { userByRecipe } = Useinfo();
  console.info(userByRecipe);

  return <div>UserRecipesList</div>;
}

export default UserRecipesList;
