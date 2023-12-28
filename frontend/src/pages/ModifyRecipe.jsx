import { useEffect, useState } from "react";
import axios from "axios";
import { MDBAutocomplete } from "mdb-react-ui-kit";
import { MDBFileUpload } from "mdb-react-file-upload";
import { Link, useParams } from "react-router-dom";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";
import IngredientsList from "../components/NewRecice/Ingredients-list";
import { Useinfo } from "../context/InfoContext";

function ModifyRecipe() {
  const { recipes } = Useinfo();
  const { id } = useParams();
  const chosenRecipe = recipes.find((recipe) => recipe.id.toString() === id);
  const [ingreds, setIngreds] = useState([]);
  const [recipeName, setRecipeName] = useState(chosenRecipe.name);
  const [image, setImage] = useState({ file: chosenRecipe.picture }); // ---> IMAGE A RECUPERER
  const [ingredientSearch, setIngredientSearch] = useState(""); // !!! ce que l'on tape dans la recherche NE PAS UTILISER POUR RECUPERER LA VALEUR
  const [ingredientSelected, setIngredientSelected] = useState(null); // chaine de caracteres
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]); // ---> INGREDIENTS A RECUPERER
  const [essai, setEssai] = useState([]); // ce que nous renvoie l'API
  const [guestsNumber, setGuestsNumber] = useState(chosenRecipe.peopleNumber);
  const [inputs, setInputs] = useState([[]]); // ---> ETAPES A RECUPERER

  // Appel de l'API selon l'ingrédient et filtrer si contient un nutritin grade
  const apiCall = async (ingredient) => {
    const response = await axios.get(
      `https://france.openfoodfacts.net/api/v2/search?categories_tags_fr=${ingredient}&fields=product_name_fr,nutriscore_data`
    );
    const productsList = response.data.products.filter(
      (products) => products.nutriscore_data !== undefined
    );
    console.info(productsList);
    const withEnergyPdct = productsList.filter(
      (product) => product.nutriscore_data.energy !== undefined
    );
    console.info(withEnergyPdct);
    setIngredientsFound(productsList);
  };
  // création du nom de la recette
  const handleNameChange = (e) => {
    setRecipeName(e.target.value);
  };

  // change le nombre de personnes pour lequel est prévue la recette
  function changeGuestsNumber(e) {
    if (e.target.innerHTML === "+") {
      setGuestsNumber(guestsNumber + 1);
    } else if (e.target.innerHTML === "-" && guestsNumber > 1) {
      setGuestsNumber(guestsNumber - 1);
    }
  }
  // rajoute la ligne de l'ingredient choisi
  const createIngredientLine = () => {
    const filteredTry = essai.filter(
      (element) => element.product_name_fr === ingredientSelected
    );
    const newIngredient = {
      name: filteredTry[0].product_name_fr,
      nutritionValue: filteredTry[0].nutriscore_data.energy,
    };
    console.info(newIngredient);
    setRecipeIngredients([...ingreds, newIngredient]);
    setIngreds([...ingreds, { name: ingredientSearch }]);
    // setRecipeIngredients([...recipeIngredients, filteredTry]);
    setIngredientSearch("");
  };

  // ajoute une ligne d'étape de la recette
  const handleAdd = () => {
    const text = [...inputs, []];
    setInputs(text);
  };
  // set l'array du state de l'étape qui est remplie avec le texte écrit
  const handleChange = (onChangeValue, i) => {
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
    const deleteIngreds = [...ingreds];
    deleteIngreds.splice(i, 1);

    const deleteRecipeIngredients = [...recipeIngredients];
    deleteRecipeIngredients.splice(i, 1);
    setIngreds(deleteIngreds);
    setRecipeIngredients(deleteRecipeIngredients);
  };

  const searchIngredient = (value) => {
    setIngredientSearch(value);
  };

  const handleSelect = (value) => {
    setIngredientSelected(value);
    setEssai(ingredientsFound);
  };

  useEffect(() => {
    apiCall(ingredientSearch);
  }, [ingredientSearch]);

  const showAll = () => {
    const recipe = {
      name: recipeName,
      picture: image[0],
      peopleNumber: guestsNumber,
      ingredients: recipeIngredients,
      steps: inputs,
    };
    console.info(recipe);
  };

  return (
    <div className="page">
      <RecipeHeader />
      <form className="new-recipe-form" action="">
        <input
          type="text"
          className="new-recipe-title"
          placeholder="Votre titre de recette"
          value={recipeName}
          onChange={handleNameChange}
        />
        <MDBFileUpload getInputFiles={(file) => setImage(file)} />
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
        </label>
        <div className="new-ingredients-container">
          <h2 className="recipe-part">Ingrédients</h2>
          <div className="search-area">
            <MDBAutocomplete
              data={ingredientsFound} // valeur retour de l'appel d'API utiliséé pour le display value
              label="Ingrédient"
              value={ingredientSearch} // affiche le texte écrit dans onSearch
              onSearch={searchIngredient} // lance l'appel d'api a chaque changement
              displayValue={(ingredient) => `${ingredient.product_name_fr}`} // affiche les différents ingrédient possibles
              onSelect={handleSelect} // stock le nom de l'ingredient dans <ingredientSelected>
            />
            <button
              className="add-remove-button"
              type="button"
              onClick={createIngredientLine}
            >
              +
            </button>
          </div>
          <IngredientsList
            ingreds={ingreds}
            handleDeleteIngredient={handleDeleteIngredient}
          />
        </div>
        <div className="new-steps-container">
          <h2 className="recipe-part step3">Étapes</h2>
          <button
            className="add-remove-button"
            type="button"
            onClick={() => handleAdd()}
          >
            +
          </button>
          {inputs.map((input, i) => (
            <div className="recipe-step">
              <h5>Etape {i + 1}</h5>
              <textarea
                name=""
                id=""
                cols="38"
                rows="2"
                value={input}
                onChange={(e) => handleChange(e, i)}
              />
              <button
                className="delete-button"
                type="button"
                onClick={() => handleDelete(i)}
              >
                supprimer
              </button>
            </div>
          ))}
        </div>
        <Link to="/">
          <button className="send-recipe-btn" type="button" onClick={showAll}>
            ENVOYER
          </button>
        </Link>
      </form>
    </div>
  );
}

export default ModifyRecipe;
