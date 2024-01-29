import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Useinfo } from "../../context/InfoContext";
import edit from "../../styles/img/kisspng-computer-icons-pencil-icon-design-material-design-5b09679fe42b46.8810328815273430079346.png";

function AllRecipes() {
  const { showAllRecipes } = Useinfo();
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/recipes`)
        .then((res) => setAllRecipes(res.data));
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}`
      );
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
          <button
            className="edit-recipe-and-user-pen-button"
            type="button"
            onClick={() => navigate(`/modifyrecipes/${e.id}`)}
            onKeyDown={handleDelete}
          >
            <img
              src={edit}
              alt="Modifier-la-recette"
              style={{ width: 20 }}
              className="edit-recipe-and-user-pen"
            />
          </button>
        </>
      ))}
    </div>
  );
}

export default AllRecipes;
