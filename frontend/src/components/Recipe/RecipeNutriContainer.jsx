import PropTypes from "prop-types";
import star from "../../styles/icons/Star.png";

function RecipeNutriVoteContainer({ recipe, averageNote, totalVotes }) {
  return (
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
  );
}

RecipeNutriVoteContainer.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  averageNote: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
};
export default RecipeNutriVoteContainer;
