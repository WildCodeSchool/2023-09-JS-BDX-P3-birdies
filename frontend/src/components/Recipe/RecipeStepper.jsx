import { MDBStepper, MDBStepperStep } from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import { useRef } from "react";
import pdf from "../../styles/icons/Downloads Folder.png";

function RecipeStepper({
  changeGuestsNumber,
  guestsNumber,
  recipeIngredients,
  recipe,
  steps,
}) {
  const swiperElRef = useRef(null);
  return (
    <MDBStepper type="horizontal">
      <MDBStepperStep headText="Ingrédients" itemId={1}>
        <div className="all-ingredients-container">
          <div className="ingredients-title-pdf-container">
            <div className="ingredients-title">Ingrédients</div>
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
  );
}

RecipeStepper.propTypes = {
  changeGuestsNumber: PropTypes.func.isRequired,
  guestsNumber: PropTypes.number.isRequired,
  recipeIngredients: PropTypes.arrayOf.isRequired,
  recipe: PropTypes.objectOf.isRequired,
  steps: PropTypes.arrayOf.isRequired,
};
export default RecipeStepper;
