import PropTypes from "prop-types";
import difficulties from "../../constants/difficulties.constant";

function DifficultiesList({ handleChangeDifficulty, difficultyEvaluation }) {
  return (
    <div className="difficulties">
      <h5>Difficulté :</h5>
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
  difficultyEvaluation: PropTypes.oneOfType([PropTypes.func, PropTypes.array])
    .isRequired,
};
export default DifficultiesList;
