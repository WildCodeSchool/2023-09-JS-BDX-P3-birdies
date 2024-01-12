import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function AllRecipes({ recipeListVisible }) {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3310/api/recipes")
        .then((res) => setAllRecipes(res.data));
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <div
      className={
        recipeListVisible ? "show-all-recipes-list" : "hide-all-recipes-list"
      }
    >
      La liste de toutes les recettes :{" "}
      {allRecipes.map((e) => (
        <>
          <div>n°{e.id}</div>
          <div>Utilisateur: {e.userId}</div>
          <div>Nom de la recette: {e.name}</div>
          <div>Date de publication: {e.publicationDate}</div>
          <div>{e.picture}</div>
        </>
      ))}
    </div>
  );
}
AllRecipes.propTypes = {
  recipeListVisible: PropTypes.bool.isRequired,
};
export default AllRecipes;
