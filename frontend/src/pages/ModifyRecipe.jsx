import { useEffect, useState } from "react";
import axios from "axios";
import { MDBAutocomplete } from "mdb-react-ui-kit";
import { MDBFileUpload } from "mdb-react-file-upload";
import { Link, useLoaderData, useParams } from "react-router-dom";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";
import IngredientsList from "../components/NewRecice/Ingredients-list";
import { Useinfo } from "../context/InfoContext";
import DifficultiesList from "../components/NewRecice/DificultiesList";
import PreparationTime from "../components/NewRecice/PreparationTime";

function ModifyRecipe() {
  const {
    setInfoSuccess,
    handleUpdateRecipe,
    handleSubmitSteps,
    handleDeleteSteps,
    handleDeleteRecipeIngredients,
    handleSubmitIngredients,
    handleSubmitRecipeIngredients,
  } = Useinfo();
  const { id } = useParams();
  const { recipeToModify, steps, ingredients } = useLoaderData();
  // Récupérer tous les ingrédients de la recette
  const actualIngredients = ingredients.map(
    (ingredient) => ingredient.ingredientName
  );
  // récupérer toutes les quantités des ingrédients actuels
  const actualQuantities = ingredients.map((ingredient) => ingredient.quantity);
  // Récupère toutes les unités des ingrédients actuels
  const actualUnites = ingredients.map((ingredient) => ingredient.unite);
  // récupère les descriptions des étapes actuelles
  const actualSteps = steps.map((step) => step.description);
  const modDifficulty =
    recipeToModify.difficulty[0].toUpperCase() +
    recipeToModify.difficulty.slice(1);
  const [ingreds, setIngreds] = useState(ingredients);
  const [recipeName, setRecipeName] = useState(recipeToModify.name);
  const [image, setImage] = useState(
    `${import.meta.env.VITE_BACKEND_URL}/${recipeToModify.url}`
  ); // ---> IMAGE A RECUPERER
  console.info(image);
  const [duration, setDuration] = useState(recipeToModify.prepTime); // ---> TEMPS A RECUPERER
  const [difficultyEvaluation, setDifficultyEvaluation] =
    useState(modDifficulty);
  const [ingredientSearch, setIngredientSearch] = useState(""); // !!! ce que l'on tape dans la recherche NE PAS UTILISER POUR RECUPERER LA VALEUR
  const [ingredientSelected, setIngredientSelected] = useState(null); // chaine de caracteres
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState(actualIngredients); // ---> INGREDIENTS A RECUPERER
  const [quantityValues, setQuantityValues] = useState(actualQuantities);
  const [uniteValues, setUniteValues] = useState(actualUnites);
  const [essai, setEssai] = useState([]); // ce que nous renvoie l'API
  const [guestsNumber, setGuestsNumber] = useState(recipeToModify.peopleNumber);
  const [inputs, setInputs] = useState(actualSteps); // ---> ETAPES A RECUPERER
  const stepsInfos = [];

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
    const timeInNumeric = e.target.value.replace(/[^0-9]/g, "");
    const time = timeInNumeric === "" ? 0 : parseFloat(timeInNumeric);
    setDuration(time);
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
    setRecipeIngredients([...ingreds, newIngredient]);
    setIngreds([...ingreds, { name: ingredientSearch }]);
    setIngredientSearch("");
  };
  // modifie l'array de quantité des aliments
  const handleChangeQuantity = (e, i) => {
    const quantityData = [...quantityValues];
    const regex = /[0-9]+$/;
    const quantity = e.target.value;
    if (quantity.match(regex) || quantity === "") {
      quantityData[i] = quantity === "" ? 0 : parseFloat(quantity);
      setQuantityValues(quantityData);
    }
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
    const deleteQuantity = [...quantityValues];
    const deleteRecipeIngredients = [...recipeIngredients];
    const deleteUnite = [...uniteValues];

    deleteIngreds.splice(i, 1);
    deleteQuantity.splice(i, 1);
    deleteRecipeIngredients.splice(i, 1);
    deleteUnite.splice(i, 1);

    setIngreds(deleteIngreds);
    setRecipeIngredients(deleteRecipeIngredients);
    setQuantityValues(deleteQuantity);
    setUniteValues(deleteUnite);
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

  const showAll = async () => {
    const ingredientsInfos = [];

    // créer les objets ingrédients : nom, quantité, mesure
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < recipeIngredients.length; i++) {
      const ingredientLine = {
        name: recipeIngredients[i],
        // energy: recipeIngredients[i].energy,
        quantity: quantityValues[i],
        mesure: uniteValues[i],
      };
      ingredientsInfos.push(ingredientLine);
    }

    const recipe = {
      // id,
      userId: id,
      name: recipeName,
      // PublicationDate: chosenRecipe.date,
      // picture: image[0] === undefined ? chosenRecipe.picture : image[0],
      peopleNumber: guestsNumber,
      energyPerPerson:
        recipeToModify.energyPerPerson === undefined
          ? 42
          : recipeToModify.energyPerPerson,
      difficulty: difficultyEvaluation,
      prepTime: duration === undefined ? 42 : duration,
      ingredients: ingredientsInfos,
      steps: inputs,
    };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < inputs.length; i++) {
      const stepLine = {
        description: inputs[i],
        position: i + 1,
      };
      stepsInfos.push(stepLine);
    }
    setInfoSuccess((prev) => !prev);
    await handleUpdateRecipe(recipe, id);
    await handleDeleteSteps(id);
    await handleSubmitSteps(id, stepsInfos);
    await handleDeleteRecipeIngredients(id);
    // TODO: fix this lines
    for (const ingredient of recipe.ingredients) {
      // création d'une condition pour éviter un ingrédient undefined si juste modifié et pas ajouté
      const ingredientChecked =
        ingredient.name.name === undefined
          ? ingredient.name
          : ingredient.name.name;
      const ingredientsAnswer =
        // eslint-disable-next-line no-await-in-loop
        await handleSubmitIngredients(ingredientChecked);
      // console.info(ingredient);
      // console.info(ingredientsInfos);
      // eslint-disable-next-line no-await-in-loop
      const recipeIngredient = await handleSubmitRecipeIngredients(
        id,
        ingredientsAnswer.data.id,
        ingredient
      );
      console.info(recipeIngredient);
    }
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
          defaultFile={`${import.meta.env.VITE_BACKEND_URL}/${
            recipeToModify.url
          }`}
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
