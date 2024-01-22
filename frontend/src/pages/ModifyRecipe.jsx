import { useEffect, useState } from "react";
import axios from "axios";
import { MDBAutocomplete } from "mdb-react-ui-kit";
import { MDBFileUpload } from "mdb-react-file-upload";
import { Link, useParams } from "react-router-dom";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";
import IngredientsList from "../components/NewRecice/Ingredients-list";
import { Useinfo } from "../context/InfoContext";
import DifficultiesList from "../components/NewRecice/DificultiesList";
import PreparationTime from "../components/NewRecice/PreparationTime";

function ModifyRecipe() {
  const { recipes, setInfoSuccess } = Useinfo();
  const { id } = useParams();
  // const [chosenRecipe, setChosenRecipe] = useState({});
  // Récupération de la recete à modifier
  const chosenRecipe = recipes.find((recipe) => recipe.id.toString() === id);
  console.info(chosenRecipe);

  // FONCTION POUR RECUPERER LES RECETTES DU BACK
  // const getRecipe = async () => {
  //   const result = await axios.get(`http://localhost:3310/api/recipes/${id}`);
  //   setChosenRecipe(result.data);
  // };
  // useEffect(() => {
  //   getRecipe();
  // }, []);

  // console.info(chosenRecipe);
  // Récupération des étapes originales de la recette
  const originalStepsList = [];
  for (const step of chosenRecipe.steps) {
    originalStepsList.push(step.description.toString());
  }
  // Récupération des quantités et mesures originales
  const originalQuantities = [];
  const originalUnites = [];
  for (const ingredient of chosenRecipe.ingredients) {
    originalQuantities.push(ingredient.quantity);
    originalUnites.push(ingredient.mesure);
  }

  const [ingreds, setIngreds] = useState(chosenRecipe.ingredients);
  const [recipeName, setRecipeName] = useState(chosenRecipe.name);
  const [image, setImage] = useState(undefined); // ---> IMAGE A RECUPERER
  const [duration, setDuration] = useState(chosenRecipe.prepTime); // ---> TEMPS A RECUPERER
  const [difficultyEvaluation, setDifficultyEvaluation] = useState(
    chosenRecipe.difficulty
  );
  const [ingredientSearch, setIngredientSearch] = useState(""); // !!! ce que l'on tape dans la recherche NE PAS UTILISER POUR RECUPERER LA VALEUR
  const [ingredientSelected, setIngredientSelected] = useState(null); // chaine de caracteres
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState(
    chosenRecipe.ingredients
  ); // ---> INGREDIENTS A RECUPERER
  const [quantityValues, setQuantityValues] = useState(originalQuantities);
  const [uniteValues, setUniteValues] = useState(originalUnites);
  const [essai, setEssai] = useState([]); // ce que nous renvoie l'API
  const [guestsNumber, setGuestsNumber] = useState(chosenRecipe.peopleNumber);
  const [inputs, setInputs] = useState(originalStepsList); // ---> ETAPES A RECUPERER

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

  // definit le temps de préparation de la recete
  const handleChangeTime = (e) => {
    console.info(duration);
    setDuration(e.target.value);
  };

  // Définie la difficulté de la recette
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
        filteredTry[0] === undefined
          ? 0
          : filteredTry[0].nutriscore_data.energy,
    };
    console.info(newIngredient);
    setRecipeIngredients([...ingreds, newIngredient]);
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

  const handleSelect = (value) => {
    setIngredientSelected(value);
    setEssai(ingredientsFound);
  };

  useEffect(() => {
    apiCall(ingredientSearch);
  }, [ingredientSearch]);

  const showAll = () => {
    const ingredientsInfos = [];

    // créer les objets ingrédients : nom, quantité, mesure
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < recipeIngredients.length; i++) {
      const ingredientLine = {
        name: recipeIngredients[i].name,
        // energy: recipeIngredients[i].energy,
        quantity: quantityValues[i],
        mesure: uniteValues[i],
      };
      ingredientsInfos.push(ingredientLine);
    }

    const recipe = {
      id,
      userId: "???",
      name: recipeName,
      PublicationDate: chosenRecipe.date,
      picture: image[0] === undefined ? chosenRecipe.picture : image[0],
      peopleNumber: guestsNumber,
      energyPerPerson:
        chosenRecipe.energyPerPerson === undefined
          ? 42
          : chosenRecipe.energyPerPerson,
      difficulty: difficultyEvaluation,
      prepTime: duration === undefined ? 42 : duration,
      ingredients: ingredientsInfos,
      steps: inputs,
    };
    setInfoSuccess((prev) => !prev);
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
        <MDBFileUpload
          getInputFiles={(file) => setImage(file)}
          defaultFile={chosenRecipe.picture}
        />
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

export default ModifyRecipe;
