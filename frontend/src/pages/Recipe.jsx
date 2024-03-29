import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MDBStepper, MDBStepperStep, MDBAlert } from "mdb-react-ui-kit";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import TextInput from "../components/Text-input";
import ActionButton from "../components/action-button";
import "../styles/Recipe.scss";
import chevron from "../styles/icons/chevron-down 2.png";
import chefHat from "../styles/icons/Chef Hat.png";
import star from "../styles/icons/Star.png";
import pdf from "../styles/icons/Downloads Folder.png";
import deliveryTime from "../styles/icons/Delivery Time.png";
import logo from "../styles/icons/logo.png";
import { Useinfo } from "../context/InfoContext";
import CommentCard from "../components/CommentCard";
import evaluations from "../constants/evaluations.constant";

function Recipe() {
  const {
    recipeNote,
    HandleRecipeNote,
    Average,
    favoriteRecipes,
    basicSuccess,
    setBasicSuccess,
    addCommentVisible,
    manageFavoriteRecipes,
    setAddCommentVisible,
    showComments,
    setShowComments,
    convertMinutesToTime,
    setCurrentRecipeId,
    getRecipePicture,
    recipePicture,
  } = Useinfo();

  const { id } = useParams();

  const { recipe, comments, steps, ingredients } = useLoaderData();
  // console.info(recipe);
  useEffect(() => {
    setCurrentRecipeId(id);
    getRecipePicture(recipe?.picture);
  }, []);

  const notation = comments.map((comment) => (comment.note ? comment.note : 0));
  const averageNote = comments.length === 0 ? 0 : Average(notation);
  const totalVotes = notation.length;
  const recipeIngredients = ingredients;
  const [guestsNumber, setGuestsNumber] = useState(recipe.peopleNumber);
  const swiperElRef = useRef(null);

  // Modie le nombre de personnes pour la recette
  function changeGuestsNumber(e) {
    if (e.target.innerHTML === "+") {
      setGuestsNumber(guestsNumber + 1);
    } else if (e.target.innerHTML === "-" && guestsNumber > 1) {
      setGuestsNumber(guestsNumber - 1);
    }
  }
  // ouvre l'espace ajout de commentaire ou voir les commentaires
  function toggleArea(e) {
    const btnValue = e.target.getAttribute("data-value");
    if (btnValue === "1") {
      setAddCommentVisible(!addCommentVisible);
      setShowComments(false);
    } else {
      setShowComments(!showComments);
      setAddCommentVisible(false);
    }
  }
  return (
    <>
      <RecipeHeader />
      <MDBAlert
        color="success"
        autohide
        position="top-right"
        delay={2000}
        appendToBody
        open={basicSuccess}
        onClose={() => setBasicSuccess(false)}
      >
        Merci pour votre participation !
      </MDBAlert>
      <div className="recipe-title">
        <p>{recipe.name}</p>
      </div>
      <div className="recipe-img-container">
        <button
          className="like-btn"
          type="button"
          value={id}
          onClick={manageFavoriteRecipes}
        >
          {favoriteRecipes.includes(parseInt(id, 10)) ? "❤️" : "🤍"}
        </button>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${recipePicture.url}`}
          alt="recipe-img"
        />
      </div>

      <div className="recipe-body-container">
        <div className="rate-nutri-container">
          <p>{recipe.energyPerPerson} kcal/portion</p>
          <div className="rate-container">
            <div className="stars">
              <img src={star} alt="star-img" />
              <div>{averageNote}/5</div>
            </div>
            <div className="votes">
              <p>{totalVotes} votes</p>
            </div>
          </div>
        </div>
        <div className="time-difficulty-container">
          <div className="prep-time-container">
            <img src={chefHat} alt="chefs-hat" />
            <div className="difficulty">{recipe.difficulty}</div>
          </div>
          <div className="difficulty-container">
            <img src={deliveryTime} alt="chronometer" />
            <div className="prep-time">
              {convertMinutesToTime(recipe.prepTime)}
            </div>
          </div>
        </div>
        <MDBStepper type="horizontal">
          <MDBStepperStep headText="Ingrédients" itemId={1}>
            <div className="all-ingredients-container">
              <div className="ingredients-title-pdf-container">
                <div className="ingredients-title">Ingrédients</div>
                {/* <div className="printer-img-container">
                  <img className="printer" src={pdf} alt="printer" />
                </div> */}
              </div>
              <div className="people-number-selection">
                <button type="button" onClick={changeGuestsNumber}>
                  -
                </button>
                <p className="people-number">{guestsNumber} personnes</p>

                <button type="button" onClick={changeGuestsNumber}>
                  +
                </button>
              </div>
              {recipeIngredients?.map((recipeIngredient) => (
                <div
                  key={recipeIngredient.ingredientName}
                  className="ingredient-container"
                >
                  <div className="ingredient-name">
                    {recipeIngredient.ingredientName}
                  </div>
                  <div className="ingred-qtty-mesure-container">
                    <div className="ingredient-qtty">
                      {Math.round(
                        (recipeIngredient.quantity / recipe.peopleNumber) *
                          guestsNumber
                      )}
                    </div>
                    <div className="ingredient-mesure">
                      {recipeIngredient.unite}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MDBStepperStep>
          <MDBStepperStep
            className="container-steps-ingred"
            headText="Etapes"
            itemId={2}
          >
            <div className="all-steps-container">
              <div className="steps-title-pdf-container">
                <div className="steps-title">Etapes</div>
                <div className="printer-img-container">
                  <img className="printer" src={pdf} alt="printer" />
                </div>
              </div>
              <swiper-container
                ref={swiperElRef}
                slides-per-view="1"
                navigation="true"
                pagination="true"
              >
                {steps.map((step, index) => (
                  <swiper-slide autoHeight="true" key={step.description}>
                    <div className="step-container">
                      <div className="step-title">{index + 1}.</div>
                      <div className="step-text">
                        <p>{step.description}</p>
                      </div>
                    </div>
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </MDBStepperStep>
        </MDBStepper>
        <div className="leave-comments-container">
          <div className="leave-comments-header">
            <div className="leave-comments-picture-area">
              <img src={logo} alt="logo" />
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
            <div className="all-notes-area">
              {evaluations.map((evaluation) => (
                <button
                  key={evaluation.value}
                  type="button"
                  value={evaluation.value}
                  className={
                    evaluation.value === parseInt(recipeNote, 10)
                      ? "notes-area clicked"
                      : "notes-area"
                  }
                  onClick={HandleRecipeNote}
                >
                  <div className="stars-area" data-value={evaluation.value}>
                    <p data-value={evaluation.value}>{evaluation.image}</p>
                  </div>
                  <div data-value={evaluation.value}>
                    <p data-value={evaluation.value}>{evaluation.word}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="comment-area">
              <p>Un petit commentaire à partager ?</p>
              <TextInput />
              <ActionButton id={recipe.id} />
            </div>
          </div>
          <div className="open-close-btn">
            <button
              className="chevron-btn"
              data-value="1"
              type="button"
              onClick={toggleArea}
            >
              <img
                className="chevron"
                src={chevron}
                alt="chevron"
                data-value="1"
              />
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
              {comments.map((comment) => (
                <CommentCard comment={comment} key={comment.id} />
              ))}
            </div>
            <div className="open-close-btn">
              <button
                className="chevron-btn"
                type="button"
                onClick={toggleArea}
              >
                <img className="chevron" src={chevron} alt="chevron" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
