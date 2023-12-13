import { useParams } from "react-router-dom";
import { useState } from "react";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import "../styles/Recipe.scss";

function Recipe() {
  const recipes = [
    {
      id: 1,
      name: "Paella",
      picture: "",
      prepTime: "1h30",
      notes: [3, 5, 2, 5, 4],
      difficulty: "facile",
      peopleNumber: 4,
      ingredients: [
        {
          name: "riz",
          quantity: 300,
          mesure: "gr",
        },
        {
          name: "poulet",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "chorizo",
          quantity: 100,
          mesure: "gr",
        },
        {
          name: "crevettes",
          quantity: 100,
          mesure: "gr",
        },
        {
          name: "moules",
          quantity: 80,
          mesure: "gr",
        },
        {
          name: "bouilon de volaille",
          quantity: 300,
          mesure: "gr",
        },
        {
          name: "safran",
          quantity: 0.1,
          mesure: "gr",
        },
      ],
      steps: [
        {
          description: "eplucher les légumes",
        },
        {
          description: "cuire la viande",
        },
        {
          description: "ajouter les fruits de mer",
        },
        {
          description: "tout mélanger et c'est pret",
        },
      ],
    },
    {
      id: 2,
      name: "Lasagnes",
      picture: "",
      prepTime: "2h00",
      notes: [5, 5, 1, 3, 2, 4, 5],
      difficulty: "Moyen",
      peopleNumber: 6,
      ingredients: [
        {
          name: "Pâte à lasagnes",
          quantity: 500,
          mesure: "gr",
        },
        {
          name: "Tomates",
          quantity: 1000,
          mesure: "gr",
        },
        {
          name: "viande hachée",
          quantity: 1500,
          mesure: "gr",
        },
        {
          name: "Oignons",
          quantity: 3,
          mesure: "pce",
        },
        {
          name: "lait",
          quantity: 1000,
          mesure: "ml",
        },
        {
          name: "Beurre",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "Farine",
          quantity: 200,
          mesure: "gr",
        },
        {
          name: "Thym",
          quantity: 3,
          mesure: "branche",
        },
        {
          name: "ail",
          quantity: 3,
          mesure: "gousse",
        },
      ],
      steps: [
        {
          description: "cuire la viande, les oignons ensemble et l'ail",
        },
        {
          description:
            "Saler, poivrer et ajouter les tomates concassées. Faire mijoter 45mn",
        },
        {
          description:
            "Préparer la béchamel : Chauffer le beurre et la farine, ajouter le lait chaud tout en remuant",
        },
        {
          description: "Sauce / Pate / Bechamel ===> repeat plein de fois",
        },
        {
          description:
            "rajouter le fromage on top qui n'est pas dans les ingrédients sa mère.",
        },
      ],
    },
  ];
  const evaluations = [
    {
      image: "*",
      word: "Bof",
    },
    {
      image: "**",
      word: "Passable",
    },
    {
      image: "***",
      word: "miam !",
    },
    {
      image: "****",
      word: "Delicious !",
    },
    {
      image: "*****",
      word: "Amaaazing !",
    },
  ];
  function average(array) {
    const iniVal = 0;
    const NoteSum = array.reduce((acc, value) => value + acc, iniVal);
    const avNote = NoteSum / array.length;
    const roundedNote = avNote.toFixed(1);
    return roundedNote;
  }

  const { id } = useParams();
  const chosenRecipe = recipes[id];
  const averageNote = average(chosenRecipe.notes);
  const totalVotes = chosenRecipe.notes.length;
  const recipeQuantities = chosenRecipe.ingredients;

  const [guestsNumber, setGuestsNumber] = useState(chosenRecipe.peopleNumber);
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function changeGuestsNumber(e) {
    if (e.target.innerHTML === "+") {
      setGuestsNumber(guestsNumber + 1);
      // increasQuantity(e);
    } else if (e.target.innerHTML === "-" && guestsNumber > 1) {
      setGuestsNumber(guestsNumber - 1);
    }
  }

  function toggleArea() {
    setAddCommentVisible(!addCommentVisible);
  }

  function toggleArea2() {
    setShowComments(!showComments);
  }

  return (
    <>
      <RecipeHeader />
      <div className="recipe-title">
        <p>{chosenRecipe.name}</p>
      </div>
      <div className="recipe-img-container">
        <img src="" alt="recipe-img" />
      </div>

      <div className="recipe-body-container">
        <div className="rate-nutri-container">
          <div className="nutriscore">Nutriscore</div>
          <div className="rate-container">
            <div className="stars">
              <img src="" alt="star-img" />
              <div>{averageNote}/5</div>
            </div>
            <div className="votes">
              <p>{totalVotes} votes</p>
            </div>
          </div>
        </div>
        <div className="time-difficulty-container">
          <div className="prep-time-container">
            <img src="" alt="chefs-hat" />
            <div className="difficulty">{chosenRecipe.difficulty}</div>
          </div>
          <div className="difficulty-container">
            <img src="" alt="chronometer" />
            <div className="prep-time">{chosenRecipe.prepTime}</div>
          </div>
        </div>
        <div className="all-ingredients-container">
          <div className="ingredients-title-pdf-container">
            <div className="ingredients-title">Ingrédients</div>
            <div className="printer-img-container">
              <img src="" alt="printer" />
            </div>
          </div>
          <div className="people-number-selection">
            <button type="button" onClick={changeGuestsNumber}>
              -
            </button>
            <p className="people-number">{guestsNumber}</p>
            <button type="button" onClick={changeGuestsNumber}>
              +
            </button>
          </div>

          {recipeQuantities.map((quantity) => (
            <div className="ingredient-container">
              <div className="ingredient-name">{quantity.name}</div>
              <div className="ingred-qtty-mesure-container">
                <div className="ingredient-qtty">
                  {Math.round(
                    (quantity.quantity / chosenRecipe.peopleNumber) *
                      guestsNumber
                  )}
                </div>
                <div className="ingredient-mesure">{quantity.mesure}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="all-steps-container">
          <div className="steps-title-pdf-container">
            <div className="steps-title">Etapes</div>
            <div className="printer-img-container">
              <img src="" alt="printer" />
            </div>
          </div>
          {chosenRecipe.steps.map((step, index) => (
            <div className="step-container">
              <div className="step-title">Etape {index + 1}</div>
              <div className="step-text">
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="leave-comments-container">
          <div className="leave-comments-header">
            <div className="leave-comments-picture-area">
              <img src="" alt="logo" />
            </div>
            <div className="leave-comments-title-area">
              <h2 className="leave-comments-title">Partagez votre avis !</h2>
            </div>
          </div>
          <div
            className={
              addCommentVisible
                ? "leave-comment-notes-area"
                : "leave-comment-notes-area inactive"
            }
          >
            {evaluations.map((evaluation) => (
              <div className="notes-area">
                <div className="stars-area">
                  <p>{evaluation.image}</p>
                </div>
                <div>
                  <p>{evaluation.word}</p>
                </div>
              </div>
            ))}
            <div className="comment-area">
              <p>Un petit commentaire à partager ?</p>
              <input type="text" name="" id="" />
              <button type="button">Publier mon avis</button>
            </div>
          </div>
          <div className="open-close-btn">
            <button type="button" onClick={toggleArea}>
              X
            </button>
          </div>
          <div className="all-comments-area">
            <div className="all-comments-title">
              <h2>Commentaires</h2>
            </div>
            <div
              className={
                showComments ? "comments-bloc" : "comments-bloc inactive"
              }
            >
              <div className="comment">
                <div className="comment-header">
                  <img src="" alt="user" />
                  <p>Firstname Lastname</p>
                  <div className="date-heure-area">date heure</div>
                </div>
              </div>
              <div className="comment">
                <div className="comment-header">
                  <img src="" alt="user" />
                  <p>Firstname Lastname</p>
                  <div className="date-heure-area">date heure</div>
                </div>
              </div>
            </div>
            <div className="open-close-btn">
              <button type="button" onClick={toggleArea2}>
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
