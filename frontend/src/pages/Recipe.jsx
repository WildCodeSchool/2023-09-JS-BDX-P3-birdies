import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { MDBStepper, MDBStepperStep } from "mdb-react-ui-kit";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import TextInput from "../components/Text-input";
import ActionButton from "../components/action-button";
import "../styles/Recipe.scss";
import chevron from "../styles/icons/chevron-down 2.png";
import chefHat from "../styles/icons/Chef Hat.png";
import star from "../styles/icons/Star.png";
import pdf from "../styles/icons/Downloads Folder.png";
import deliveryTime from "../styles/icons/Delivery Time.png";
import blocNutri from "../styles/icons/Bloc nutriscore.png";
import logo from "../styles/icons/logo.png";
import { Useinfo } from "../context/InfoContext";
import CommentCard from "../components/CommentCard";

function Recipe() {
  const { recipes, evaluations, recipeNote, HandleRecipeNote, Average } =
    Useinfo();

  const { id } = useParams();
  const chosenRecipe = recipes.find((recipe) => recipe.id.toString() === id);
  const averageNote = Average(chosenRecipe.notes);
  const totalVotes = chosenRecipe.notes.length;
  const recipeQuantities = chosenRecipe.ingredients;

  const [guestsNumber, setGuestsNumber] = useState(chosenRecipe.peopleNumber);
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const swiperElRef = useRef(null);

  function changeGuestsNumber(e) {
    if (e.target.innerHTML === "+") {
      setGuestsNumber(guestsNumber + 1);
    } else if (e.target.innerHTML === "-" && guestsNumber > 1) {
      setGuestsNumber(guestsNumber - 1);
    }
  }

  function toggleArea() {
    setAddCommentVisible(!addCommentVisible);
    setShowComments(false);
  }

  function toggleArea2() {
    setShowComments(!showComments);
    setAddCommentVisible(false);
  }

  return (
    <>
      <RecipeHeader />
      <div className="recipe-title">
        <p>{chosenRecipe.name}</p>
      </div>
      <div className="recipe-img-container">
        <img src={chosenRecipe.picture} alt="recipe-img" />
      </div>

      <div className="recipe-body-container">
        <div className="rate-nutri-container">
          <img src={blocNutri} alt="bloc-nutri" />
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
            <div className="difficulty">{chosenRecipe.difficulty}</div>
          </div>
          <div className="difficulty-container">
            <img src={deliveryTime} alt="chronometer" />
            <div className="prep-time">{chosenRecipe.prepTime}</div>
          </div>
        </div>
        <MDBStepper type="horizontal">
          <MDBStepperStep headText="Ingrédients" itemId={1}>
            <div className="all-ingredients-container">
              <div className="ingredients-title-pdf-container">
                <div className="ingredients-title">Ingrédients</div>
                <div className="printer-img-container">
                  <img className="printer" src={pdf} alt="printer" />
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
                <div key={quantity.name} className="ingredient-container">
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
          </MDBStepperStep>
          <MDBStepperStep headText="Etapes" itemId={2}>
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
                {chosenRecipe.steps.map((step, index) => (
                  <swiper-slide autoHeight="true">
                    <div key={step.index} className="step-container">
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
              <ActionButton />
            </div>
          </div>
          <div className="open-close-btn">
            <button className="chevron-btn" type="button" onClick={toggleArea}>
              <img className="chevron" src={chevron} alt="chevron" />
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
              {chosenRecipe.comments.map((comment) => (
                <CommentCard comment={comment} />
              ))}
            </div>
            <div className="open-close-btn">
              <button
                className="chevron-btn"
                type="button"
                onClick={toggleArea2}
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
