import evaluations from "../../constants/evaluations.constant";
import { Useinfo } from "../../context/InfoContext";

function RecipeNotation() {
  const { HandleRecipeNote, recipeNote } = Useinfo();

  return (
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
  );
}

export default RecipeNotation;
