import PropTypes from "prop-types";
import { Useinfo } from "../../context/InfoContext";

function DifficultiesList({ handleChangeDifficulty, difficultyEvaluation }) {
  const { difficulties } = Useinfo();

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
  difficultyEvaluation: PropTypes.arrayOf.isRequired,
};
export default DifficultiesList;
