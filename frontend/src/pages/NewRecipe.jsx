import { useEffect, useState } from "react";
import axios from "axios";
// import { DebounceInput } from "react-debounce-input";
import { MDBAutocomplete } from "mdb-react-ui-kit";
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
  const [ingredientSearch, setIngredientSearch] = useState(""); // !!! ce que l'on tape dans la recherche NE PAS UTILISER POUR RECUPERER LA VALEUR
  const [ingredientSelected, setIngredientSelected] = useState(null); // chaine de caracteres
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const [essai, setEssai] = useState([]); // ce que nous renvoie l'API
  const [guestsNumber, setGuestsNumber] = useState(0);
  const [inputs, setInputs] = useState([[]]);

  const apiCall = async (ingredient) => {
    const response = await axios.get(
      `https://france.openfoodfacts.net/api/v2/search?categories_tags_fr=${ingredient}&fields=product_name_fr,nutriscore_data`
    );

    const productsList = response.data.products;
    console.info(productsList); // renvoie un tableau
    setIngredientsFound(productsList);
  };

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

  const testIngredient = () => {
    // console.info(ingredientsFound);
  };
  // utilise le texte de recherche pour rechercher un ingrédient
  // crée la ligne de l'ingrédient et stock celui-ci
  // const ingredientForm = async () => {
  //   const response = await axios.get(
  //     `https://france.openfoodfacts.net/api/v2/search?categories_tags_fr=${ingredientSelected}&fields=product_name_fr,nutriscore_data,energy`
  //   );
  //   const productsList = response.data.products;
  //   console.info(productsList);
  // };

  const createIngredientLine = () => {
    console.info(ingredientSelected);
    console.info(typeof essai);
    const filteredTry = essai.filter(
      (element) => element.product_name_fr === ingredientSelected
    );
    console.info(filteredTry[0].nutriscore_data.energy);
    // const onlyOne = ingredientSelected.find(
    //   (element) => element.product_name_fr === essai
    // );
    // console.info(onlyOne);
    // ingredientForm();
    testIngredient();
    setIngreds([...ingreds, { name: ingredientSearch }]);
    // setRecipeIngredients([...recipeIngredients, productsList]);
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
    const deleteIngredient = [...ingreds];
    deleteIngredient.splice(i, 1);
    setIngreds(deleteIngredient);
  };

  const searchIngredient = (value) => {
    setIngredientSearch(value);
  };

  const handleSelect = (value) => {
    setIngredientSelected(value);
    // console.info(ingredientsFound);
    setEssai(ingredientsFound);
  };

  useEffect(() => {
    apiCall(ingredientSearch);
  }, [ingredientSearch]);

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
        </label>
        <div className="new-ingredients-container">
          <h2>Ingrédients</h2>
          <div className="search-area">
            <MDBAutocomplete
              data={ingredientsFound} // valeur retour de l'appel d'API utiliséé pour le display value
              label="Ingrédient"
              value={ingredientSearch} // affiche le texte écrit dans onSearch
              onSearch={searchIngredient} // lance l'appel d'api a chaque changement
              displayValue={(ingredient) => `${ingredient.product_name_fr}`} // affiche les différents ingrédient possibles
              onSelect={handleSelect} // stock le nom de l'ingredient dans <ingredientSelected>
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

        {/* <button className="send-recipe-btn" type="submit">
          ENVOYER
        </button> */}
      </form>
    </div>
  );
}

export default NewRecipe;
