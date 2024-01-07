/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import axios from "axios";
import { MDBAutocomplete } from "mdb-react-ui-kit";
import { MDBFileUpload } from "mdb-react-file-upload";
import { Link } from "react-router-dom";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";
import IngredientsList from "../components/NewRecice/Ingredients-list";
import DifficultiesList from "../components/NewRecice/DificultiesList";
import PreparationTime from "../components/NewRecice/PreparationTime";
import { Useinfo } from "../context/InfoContext";

function NewRecipe() {
  const { displayDate, setBasicSuccess } = Useinfo();

  const [ingreds, setIngreds] = useState([]);
  const [recipeName, setRecipeName] = useState(null);
  const [image, setImage] = useState({}); // ---> IMAGE A RECUPERER
  const [duration, setDuration] = useState(""); // ---> TEMPS A RECUPERER
  const [difficultyEvaluation, setDifficultyEvaluation] = useState([]); // ---> DIFFICULTE A RECUPERER
  const [ingredientSearch, setIngredientSearch] = useState(""); // !!! ce que l'on tape dans la recherche NE PAS UTILISER POUR RECUPERER LA VALEUR
  const [ingredientSelected, setIngredientSelected] = useState(null); // chaine de caracteres
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]); // ---> INGREDIENTS A RECUPERER
  const [quantityValues, setQuantityValues] = useState([]);
  const [uniteValues, setUniteValues] = useState([]); // --- > UNITES A RECUPERER
  const [essai, setEssai] = useState([]); // ce que nous renvoie l'API
  const [guestsNumber, setGuestsNumber] = useState(0);
  const [inputs, setInputs] = useState([[]]); // ---> ETAPES A RECUPERER

  const newApiCall = async (ingredient) => {
    const response = await axios.get(
      `https://france.openfoodfacts.net/api/v2/search?categories_tags_fr=${ingredient}&fields=product_name_fr,nutriments`
    );
    const productsList = response.data.products.filter(
      (products) => products.nutriments.energy_unit === "kJ"
    );
    console.info(productsList);
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
  // definit le temps de préparation de la recete
  const handleChangeTime = (e) => {
    console.info(e.target.value);
    setDuration(e.target.value);
  };
  // Définit la difficulté de la recette
  const handleChangeDifficulty = (e) => {
    const difficultySelected = e.target.value;
    if (difficultyEvaluation === difficultySelected) {
      setDifficultyEvaluation("");
    } else {
      setDifficultyEvaluation(difficultySelected);
    }
  };

  // rajoute la ligne de l'ingredient choisi
  const createIngredientLine = () => {
    const filteredTry = essai.filter(
      (element) => element.product_name_fr === ingredientSelected
    );

    const newIngredient = {
      name:
        filteredTry[0] === undefined
          ? ingredientSearch
          : filteredTry[0].product_name_fr,
      nutritionValue:
        filteredTry[0] === undefined ? 0 : filteredTry[0].nutriments.energy,
    };
    setRecipeIngredients([...recipeIngredients, newIngredient]);
    setIngreds([...ingreds, { name: ingredientSearch }]);
    setIngredientSearch("");
  };
  // modifie l'array de quantité des aliments
  const handleChangeQuantity = (e, i) => {
    const quantityData = [...quantityValues];
    quantityData[i] = parseFloat(e.target.value);
    setQuantityValues(quantityData);
  };
  // modifie l'array d'unité de mesure ds aliments
  const handleChangeUnite = (e, i) => {
    const uniteData = [...uniteValues];
    uniteData[i] = e.target.value;
    setUniteValues(uniteData);
  };

  // ajoute une ligne d'étape de la recette
  const handleAdd = () => {
    const text = [...inputs, []];
    setInputs(text);
    const quant = [...quantityValues, []];
    setQuantityValues(quant);
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
  // stock le nom de l'ingrédient choisi
  const handleSelect = (value) => {
    setIngredientSelected(value);
    setEssai(ingredientsFound);
  };

  useEffect(() => {
    newApiCall(ingredientSearch);
  }, [ingredientSearch]);

  // calcule la valeur energétique à partir d'un tableau d'ingrédients
  function getEnergeticValuePerPerson(array) {
    const recipeEnergy = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const adaptedQuantity =
        quantityValues[i] === undefined ? 0 : quantityValues[i];
      const energyForQuantity =
        (array[i].nutritionValue / 100) * adaptedQuantity;
      recipeEnergy.push(energyForQuantity);
    }
    const totalEnergy = recipeEnergy.reduce((acc, element) => acc + element, 0);

    const energyPerPerson = totalEnergy / guestsNumber;
    return energyPerPerson;
  }

  const showAll = () => {
    console.info(recipeIngredients);
    const ingredientsInfos = [];
    // créer les objets ingrédients : nom, quantité, mesure
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < recipeIngredients.length; i++) {
      const ingredientLine = {
        name: recipeIngredients[i].name,
        energy_100gr: recipeIngredients[i].nutritionValue,
        quantity: quantityValues[i],
        mesure: uniteValues[i],
      };
      ingredientsInfos.push(ingredientLine);
    }

    const recipe = {
      userId: "???",
      name: recipeName,
      publicationDate: displayDate(),
      picture: image[0],
      peopleNumber: guestsNumber,
      energyPerPerson: getEnergeticValuePerPerson(recipeIngredients),
      difficulty: difficultyEvaluation,
      prepTime: duration,
      ingredients: ingredientsInfos,
      steps: inputs,
    };
    setBasicSuccess((prev) => !prev);
    console.info(recipe);
  };
  console.info(recipeIngredients);
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
        <PreparationTime
          handleChangeTime={handleChangeTime}
          duration={duration}
        />
        <DifficultiesList
          handleChangeDifficulty={handleChangeDifficulty}
          difficultyEvaluation={difficultyEvaluation}
        />
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
            handleChangeQuantity={handleChangeQuantity}
            handleChangeUnite={handleChangeUnite}
            quantityValues={quantityValues}
            uniteValues={uniteValues}
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

export default NewRecipe;
