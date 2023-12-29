import PropTypes from "prop-types";

function IngredientsList({
  ingreds,
  handleDeleteIngredient,
  handleChangeQuantity,
  handleChangeUnite,
}) {
  return (
    <div className="ingredients-list">
      {ingreds.map((ing, i) => (
        <div key={ing.name} className="ingredient-line">
          <div className="ingredient-line-name">- {ing.name}</div>
          <div className="quantity_unite-area">
            <input
              type="text"
              className="ingredient-line-quantity"
              onChange={(e) => handleChangeQuantity(e, i)}
            />
            <select
              name="unite"
              id="0"
              className="ingredient-line-unite"
              onChange={(e) => handleChangeUnite(e, i)}
            >
              <option value="-">-</option>
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
  handleChangeQuantity: PropTypes.func.isRequired,
  handleChangeUnite: PropTypes.func.isRequired,
};

export default IngredientsList;
