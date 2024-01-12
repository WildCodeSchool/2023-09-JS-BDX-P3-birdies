import axios from "axios";
import { useEffect, useState } from "react";
import { Useinfo } from "../../context/InfoContext";

function AllRecipes() {
  const { showAllRecipes } = Useinfo();
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3310/api/recipes")
        .then((res) => setAllRecipes(res.data));
    } catch (err) {
      console.warn(err);
    }
  }, [allRecipes]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3310/api/recipes/${id}`);
    } catch (err) {
      console.warn(err);
    }
    return alert("Recette supprimée"); // eslint-disable-line no-alert
  };

  return (
    <div
      className={
        !showAllRecipes ? "show-all-recipes-list" : "hide-all-recipes-list"
      }
    >
      La liste de toutes les recettes :{" "}
      {allRecipes?.map((e) => (
        <>
          <div>n°{e.id}</div>
          <div>Utilisateur: {e.userId}</div>
          <div>Nom de la recette: {e.name}</div>
          <div>Date de publication: {e.publicationDate}</div>
          <div>{e.picture}</div>
          <button
            type="button"
            className="delete-recipe-button"
            onClick={() => handleDelete(e.id)}
          >
            Supprimer
          </button>
        </>
      ))}
    </div>
  );
}

export default AllRecipes;
