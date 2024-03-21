/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";

import axios from "axios";
import {
  MDBAutocomplete,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { MDBFileUpload } from "mdb-react-file-upload";
import { useNavigate } from "react-router-dom";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";
import IngredientsList from "../components/NewRecice/Ingredients-list";
import DifficultiesList from "../components/NewRecice/DificultiesList";
import PreparationTime from "../components/NewRecice/PreparationTime";
import { Useinfo } from "../context/InfoContext";

function NewRecipe() {
  const {
    chosenFilters,
    displayDate,
    setNewRecipesChanged,
    setBasicSuccess,
    user,
    handleSubmitSteps,
    handleSubmitIngredients,
    handleSubmitPicture,
    handleSubmitRecipeIngredients,
  } = Useinfo();
  const [ingreds, setIngreds] = useState([]);
  const [recipeName, setRecipeName] = useState(null);
  const [image, setImage] = useState(); // ---> IMAGE A RECUPERER
  const [duration, setDuration] = useState("0"); // ---> TEMPS A RECUPERER
  const [difficultyEvaluation, setDifficultyEvaluation] =
    useState("Très facile"); // ---> DIFFICULTE A RECUPERER
  const [ingredientSearch, setIngredientSearch] = useState(""); // !!! ce que l'on tape dans la recherche NE PAS UTILISER POUR RECUPERER LA VALEUR
  const [ingredientSelected, setIngredientSelected] = useState(null); // chaine de caracteres
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]); // ---> INGREDIENTS A RECUPERER
  const [quantityValues, setQuantityValues] = useState([]);
  const [uniteValues, setUniteValues] = useState([]); // --- > UNITES A RECUPERER
  const [essai, setEssai] = useState([]); // ce que nous renvoie l'API
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [inputs, setInputs] = useState([[]]); // ---> ETAPES A RECUPERER
  const [isLoading, setIsLoading] = useState(false);
  const stepsInfos = [];
  const filtersInfo = [];
  const ingredientsInfos = [];
  const navigate = useNavigate();

  const newApiCall = async (ingredient) => {
    setIsLoading(true);
    const response = await axios.get(
      `https://france.openfoodfacts.net/api/v2/search?categories_tags_fr=${ingredient}&fields=product_name_fr,nutriments`
    );
    const productsList = response.data.products.filter(
      (products) => products.nutriments.energy_unit === "kJ"
    );
    setIngredientsFound(productsList);
    setIsLoading(false);
  };
  const handleRecipeSubmit = async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
        credentials
      );
      return response.data.id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // création du nom de la recette
  const handleNameChange = (e) => {
    setRecipeName(e.target.value);
  };
  // definit le temps de préparation de la recete
  const handleChangeTime = (e) => {
    const timeInNumeric = e.target.value.replace(/[^0-9]/g, "");
    const time = timeInNumeric === "" ? 0 : parseFloat(timeInNumeric);
    setDuration(time);
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
    const quantity = e.target.value.replace(/[^0-9]/g, "");
    quantityData[i] = quantity === "" ? 0 : parseFloat(quantity);
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

  const showAll = async (event) => {
    event.preventDefault();
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
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < inputs.length; i++) {
      const stepLine = {
        description: inputs[i],
        position: i + 1,
      };
      stepsInfos.push(stepLine);
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chosenFilters.length; i++) {
      const filtersLine = {
        name: chosenFilters[i],
      };
      filtersInfo.push(filtersLine);
    }
    const recipe = {
      userId: user.id,
      name: recipeName,
      publicationDate: displayDate(),
      peopleNumber: guestsNumber,
      energyPerPerson: getEnergeticValuePerPerson(recipeIngredients),
      difficulty: difficultyEvaluation,
      prepTime: duration,
      cathegories: filtersInfo,
      ingredients: ingredientsInfos,
    };
    setBasicSuccess((prev) => !prev);
    try {
      const response = await handleRecipeSubmit(recipe);
      const answer = await handleSubmitSteps(
        response,
        stepsInfos[0].description[0] === undefined
          ? [{ description: "rien", position: 1 }]
          : stepsInfos
      );
      const formData = new FormData();
      formData.append("picture", image);

      const imgResponse = await handleSubmitPicture(
        answer.data.recipeId,
        formData
      );
      for (const ingredient of recipe.ingredients) {
        // eslint-disable-next-line no-await-in-loop
        const ingredientsAnswer = await handleSubmitIngredients(
          ingredient.name
        );
        // console.info(ingredient);
        console.info(imgResponse);
        // console.info(ingredientsInfos);
        // eslint-disable-next-line no-await-in-loop
        const recipeIngredient = await handleSubmitRecipeIngredients(
          answer.data.recipeId,
          ingredientsAnswer.data.id,
          ingredient
        );
        console.info(recipeIngredient);
      }
      setNewRecipesChanged(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      setNewRecipesChanged(true);
      navigate("/");
      throw err;
    }
  };

  return (
    <div className="page container pb-4">
      <RecipeHeader />
      <form
        className="new-recipe-form col-sm-12 col-md-8 col-lg-6"
        onSubmit={showAll}
      >
        <div className="new-recipe-form-input w-100 p-3">
          <MDBInput
            type="text"
            className="new-recipe-title "
            label="Votre titre de recette"
            value={recipeName}
            onChange={handleNameChange}
          />
        </div>
        <MDBFileUpload
          className="upload-container"
          getInputFiles={(file) => setImage(file[0])}
        />
        <div className="persons-minutes">
          <label className="label-container">
            <h4 className="title-persons-number">Nombre de personnes :</h4>
            {/*  */}
            <div className="people-number-selection">
              <MDBBtn
                outline
                rounded
                floating
                tag="a"
                color="dark"
                onClick={() =>
                  setGuestsNumber(
                    guestsNumber >= 1 ? guestsNumber - 1 : guestsNumber
                  )
                }
                size="sm"
              >
                <MDBIcon fas icon="minus" />
              </MDBBtn>
              <p className="people-number">{guestsNumber}</p>
              <MDBBtn
                outline
                rounded
                floating
                tag="a"
                color="dark"
                onClick={() => setGuestsNumber(guestsNumber + 1)}
                size="sm"
              >
                <MDBIcon fas icon="plus" />
              </MDBBtn>
            </div>
          </label>
          <PreparationTime
            handleChangeTime={handleChangeTime}
            duration={duration}
          />
        </div>
        <DifficultiesList
          handleChangeDifficulty={handleChangeDifficulty}
          difficultyEvaluation={difficultyEvaluation}
        />
        <div className="new-ingredients-container container-fluid">
          <h2 className="recipe-step-title">Ingrédients</h2>
          <div className="search-area">
            <MDBAutocomplete
              noResults=""
              isLoading={isLoading}
              data={ingredientsFound} // valeur retour de l'appel d'API utiliséé pour le display value
              label="Ingrédient"
              value={ingredientSearch} // affiche le texte écrit dans onSearch
              onSearch={searchIngredient} // lance l'appel d'api a chaque changement
              displayValue={(ingredient) => `${ingredient.product_name_fr}`} // affiche les différents ingrédient possibles
              onSelect={handleSelect} // stock le nom de l'ingredient dans <ingredientSelected>
            />
            <MDBBtn
              className="mt-2"
              outline
              rounded
              color="warning"
              type="button"
              onClick={createIngredientLine}
              size="sm"
            >
              Ajouter
            </MDBBtn>
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
        <div className="new-steps-container container-fluid">
          <h2
            className="recipe-step-title step-margin"
            style={{ marginTop: 10 }}
          >
            Étapes:
          </h2>
          <MDBBtn
            className="mt-2"
            outline
            rounded
            color="warning"
            type="button"
            onClick={handleAdd}
            size="sm"
          >
            Ajouter
          </MDBBtn>
          {inputs.map((input, i) => (
            <div className="recipe-step">
              <h5 className="recipe-step" style={{ marginBottom: 10 }}>
                Etape {i + 1}
              </h5>
              <div className="d-flex justify-content-between">
                <div className="col-10">
                  <MDBTextArea
                    name=""
                    label="Message"
                    id="textAreaExample"
                    cols="38"
                    rows={2}
                    value={input}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
                <div className="col-1 d-flex justify-content-end">
                  <MDBBtn
                    className="my-auto"
                    color="danger"
                    outline
                    floating
                    size="sm"
                    onClick={() => handleDelete(i)}
                  >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MDBBtn color="dark" type="submit" className="col-8 mx-auto mt-4">
          ENVOYER
        </MDBBtn>
      </form>
    </div>
  );
}

export default NewRecipe;
