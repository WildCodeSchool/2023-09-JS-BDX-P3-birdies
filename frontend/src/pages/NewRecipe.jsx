import { useEffect, useState } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";
import IngredientsList from "../components/NewRecice/Ingredients-list";

function NewRecipe() {
  const [ingreds, setIngreds] = useState([
    {
      name: "patate",
      quantity: 100,
    },
  ]);
  const [image, setImage] = useState({ file: null });
  const [ingredientSearch, setIngredientSearch] = useState("");
  // const [ingredientsFound, setIngredientsFound] = useState([]);
  const [guestsNumber, setGuestsNumber] = useState(0);
  const [inputs, setInputs] = useState([[]]);

  // affiche l'image choisie
  const handleChangeImage = (e) => {
    setImage({ file: URL.createObjectURL(e.target.files[0]) });
  };

  // change le nombre de personnes pour lequel est prévue la recette
  function changeGuestsNumber(e) {
    if (e.target.innerHTML === "+") {
      setGuestsNumber(guestsNumber + 1);
    } else if (e.target.innerHTML === "-" && guestsNumber > 1) {
      setGuestsNumber(guestsNumber - 1);
    }
  }

  // utilise le texte de recherche pour rechercher un ingrédient
  const searchIngredient = (e) => {
    setIngredientSearch(e.target.value);
  };

  // crée la ligne de l'ingrédient et stock celui-ci
  const createIngredientLine = () => {
    setIngreds([...ingreds, { name: ingredientSearch }]);
    setIngredientSearch("");
  };
  // ajoute une ligne d'étape de la recette
  const handleAdd = () => {
    const text = [...inputs, []];
    setInputs(text);
  };
  // set l'array du state de l'étape qui est remplie avec le texte écrit
  const handleChange = (onChangeValue, i) => {
    console.info(i);
    const inputData = [...inputs];
    inputData[i] = onChangeValue.target.value;
    setInputs(inputData);
  };
  // supprime la ligne d'étape sélectionnée
  const handleDelete = (i) => {
    const deleteInput = [...inputs];
    deleteInput.splice(i, 1);
    setInputs(deleteInput);
  };
  // supprime l'ingrédient de notre choix
  const handleDeleteIngredient = (i) => {
    const deleteIngredient = [...ingreds];
    deleteIngredient.splice(i, 1);
    setIngreds(deleteIngredient);
  };

  // console.info(inputs);
  // console.info(ingreds);
  const apiCall = () => {
    axios
      .get(
        `https://france.openfoodfacts.net/api/v2/search?categories_tags_fr=${ingredientSearch}&fields=product_name_fr,nutrition_grades`
      )
      .then((response) => {
        console.info(response.data.products);
      })
      .catch((err) => {
        console.info(err.message);
      });
  };

  useEffect(() => {
    apiCall();
  }, [ingredientSearch]);
  console.info(ingreds);
  return (
    <div className="page">
      <RecipeHeader />
      <form className="new-recipe-form" action="">
        <input
          type="text"
          className="new-recipe-title"
          placeholder="Votre titre de recette"
        />
        <label>
          <h2>Votre Image</h2>
          <input
            type="file"
            name="Ajouter"
            onClick={(e) => handleChangeImage(e)}
          />
          <div className="new-recipe-image-container">
            <img className="new-recipe-image" src={image.file} alt="your pic" />
          </div>
        </label>
        <label>
          Nombre de personnes :{/*  */}
          <div className="people-number-selection">
            <button type="button" onClick={changeGuestsNumber}>
              -
            </button>
            <p className="people-number">{guestsNumber}</p>
            <button type="button" onClick={changeGuestsNumber}>
              +
            </button>
          </div>
          {/*  */}
        </label>
        <div className="new-ingredients-container">
          <h2>Ingrédients</h2>
          <div className="search-area">
            {/*  */}
            <DebounceInput
              type="text"
              onChange={searchIngredient}
              value={ingredientSearch}
              debounceTimeout={350}
            />
            <button type="button" onClick={createIngredientLine}>
              Ajouter
            </button>
          </div>
          <IngredientsList
            ingreds={ingreds}
            handleDeleteIngredient={handleDeleteIngredient}
          />
        </div>
        <div className="new-steps-container">
          <h2>Étapes</h2>
          <button type="button" onClick={() => handleAdd()}>
            +
          </button>
          {inputs.map((input, i) => (
            <div>
              <h5>Etape {i + 1}</h5>
              <textarea
                name=""
                id=""
                cols="38"
                rows="2"
                value={input}
                onChange={(e) => handleChange(e, i)}
              />
              <button type="button" onClick={() => handleDelete(i)}>
                supprimer
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default NewRecipe;
