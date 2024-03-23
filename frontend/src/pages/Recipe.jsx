/* eslint-disable react/jsx-no-bind */
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MDBAlert } from "mdb-react-ui-kit";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import TimeDifficulty from "../components/Recipe/RecipeTimeDificulty";
import RecipeNutriVoteContainer from "../components/Recipe/RecipeNutriContainer";
import RecipeNotation from "../components/Recipe/RecipeNotation";
import RecipeComments from "../components/Recipe/RecipeComments";
import RecipeStepper from "../components/Recipe/RecipeStepper";
import ArrowButton from "../components/Recipe/ArrowButton";
import RecipeImage from "../components/Recipe/RecipeImage";
import RecipeCommentHeader from "../components/Recipe/RecipeCommentHeader";
import TextInput from "../components/Text-input";
import ActionButton from "../components/action-button";
import "../styles/Pages/Recipe.scss";
import { Useinfo } from "../context/InfoContext";

function Recipe() {
  const {
    Average,
    basicSuccess,
    setBasicSuccess,
    addCommentVisible,
    setAddCommentVisible,
    showComments,
    setShowComments,
    setCurrentRecipeId,
    getRecipePicture,
  } = Useinfo();

  const { id } = useParams();

  const { recipe, comments, steps, ingredients } = useLoaderData();
  useEffect(() => {
    setCurrentRecipeId(id);
    getRecipePicture(recipe?.picture);
  }, []);

  const notation = comments.map((comment) => (comment.note ? comment.note : 0));
  const averageNote = comments.length === 0 ? 0 : Average(notation);
  const totalVotes = notation.length;
  const recipeIngredients = ingredients;
  const [guestsNumber, setGuestsNumber] = useState(recipe.peopleNumber);

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
      <div className="recipe-title-area">
        <h1 className="recipe-title">{recipe.name}</h1>
      </div>
      <RecipeImage id={id} recipeName={recipe.name} />
      <div className="recipe-body-container">
        <RecipeNutriVoteContainer
          recipe={recipe}
          averageNote={averageNote}
          totalVotes={totalVotes}
        />
        <TimeDifficulty recipe={recipe} />
        <RecipeStepper
          changeGuestsNumber={changeGuestsNumber}
          guestsNumber={guestsNumber}
          recipeIngredients={recipeIngredients}
          recipe={recipe}
          steps={steps}
        />
        <div className="leave-comments-container">
          <RecipeCommentHeader />
          <div
            className={
              addCommentVisible
                ? "leave-comment-notes-area"
                : "leave-comment-notes-area inactive"
            }
          >
            <RecipeNotation />
            <div className="comment-area">
              <p>Un petit commentaire à partager ?</p>
              <TextInput />
              <ActionButton id={recipe.id} />
            </div>
          </div>
          <ArrowButton toggleArea={toggleArea} />
          <RecipeComments comments={comments} toggleArea={toggleArea} />
        </div>
      </div>
    </>
  );
}

export default Recipe;
