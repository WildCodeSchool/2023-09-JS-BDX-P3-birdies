import PropTypes from "prop-types";
import difficulties from "../../constants/difficulties.constant";

function DifficultiesList({ handleChangeDifficulty, difficultyEvaluation }) {
  return (
    <div className="difficulties container-fluid">
      <h2 className="recipe-step-title">Difficulté :</h2>
      <div className="difficulties-container">
        {difficulties.map((difficulty) => (
          <button
            type="button"
            key={difficulty.name}
            value={difficulty.name}
            className={
              difficulty.name === difficultyEvaluation
                ? "difficulty-button clicked"
                : "difficulty-button"
            }
            onClick={handleChangeDifficulty}
          >
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>
  );
}
DifficultiesList.propTypes = {
  handleChangeDifficulty: PropTypes.func.isRequired,
  difficultyEvaluation: PropTypes.func.isRequired,
};
export default DifficultiesList;
