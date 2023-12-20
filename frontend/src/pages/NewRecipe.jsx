import { useState } from "react";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/newRecipePage/NewRecipe.scss";

function NewRecipe() {
  const [ingreds, setIngreds] = useState([
    {
      name: "patate",
      quantity: 100,
    },
  ]);
  const [image, setImage] = useState({ file: null });
  const [ingredientSearch, setIngredientSearch] = useState("");
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
            <input
              type="text"
              onChange={searchIngredient}
              value={ingredientSearch}
            />
            <button type="button" onClick={createIngredientLine}>
              Ajouter
            </button>
          </div>
          <div className="ingredients-list">
            {ingreds.map((ing, i) => (
              <div className="ingredient-line">
                <div className="ingredient-line-name">- {ing.name}</div>
                <div className="quantity_unite-area">
                  <input type="number" className="ingredient-line-quantity" />
                  <select name="unite" id="0" className="ingredient-line-unite">
                    <option value="gr">gr</option>
                    <option value="cl">cl</option>
                    <option value="piece">piece</option>
                  </select>
                </div>
                <button type="button" onClick={() => handleDeleteIngredient(i)}>
                  x
                </button>
              </div>
            ))}
          </div>
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
