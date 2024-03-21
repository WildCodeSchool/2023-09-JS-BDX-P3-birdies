import PropTypes from "prop-types";
import star from "../../styles/icons/Star.svg";

function RecipeNutriVoteContainer({ recipe, averageNote, totalVotes }) {
  return (
    <div className="rate-nutri-container">
      <p>{recipe.energyPerPerson} kcal/portion</p>
      <div className="rate-container">
        <div className="stars">
          <img src={star} alt="voting stars" />
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
  averageNote: PropTypes.string.isRequired,
  totalVotes: PropTypes.number.isRequired,
};
export default RecipeNutriVoteContainer;
