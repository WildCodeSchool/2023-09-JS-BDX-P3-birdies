import PropTypes from "prop-types";

function IngredientsList({ ingreds, handleDeleteIngredient }) {
  return (
    <div className="ingredients-list">
      {ingreds.map((ing, i) => (
        <div key={ing.name} className="ingredient-line">
          <div className="ingredient-line-name">- {ing.name}</div>
          <div className="quantity_unite-area">
            <input type="number" className="ingredient-line-quantity" />
            <select name="unite" id="0" className="ingredient-line-unite">
              <option value="gr">gr</option>
              <option value="cl">cl</option>
              <option value="piece">piece</option>
            </select>
          </div>
          <button
            className="remove-button"
            type="button"
            onClick={() => handleDeleteIngredient(i)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
IngredientsList.propTypes = {
  ingreds: PropTypes.arrayOf.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
};

export default IngredientsList;
