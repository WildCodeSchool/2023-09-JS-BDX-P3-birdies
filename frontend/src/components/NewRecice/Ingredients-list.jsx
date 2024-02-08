import PropTypes from "prop-types";

function IngredientsList({
  ingreds,
  handleDeleteIngredient,
  handleChangeQuantity,
  handleChangeUnite,
  quantityValues,
  uniteValues,
}) {
  return (
    <div className="ingredients-list">
      {ingreds.map((ing, i) => (
        <div key={ing.name ?? ing.ingredientName} className="ingredient-line">
          <div className="ingredient-line-name">
            - {ing.name ?? ing.ingredientName}
          </div>
          <div className="quantity_unite-area">
            <div className="quantity_unite-contaire">
              <input
                type="text"
                className="ingredient-line-quantity"
                value={quantityValues[i]}
                onChange={(e) => handleChangeQuantity(e, i)}
              />
            </div>
            <select
              name="unite"
              id="0"
              className="ingredient-line-unite"
              value={uniteValues[i]}
              onChange={(e) => handleChangeUnite(e, i)}
            >
              <option value="-">-</option>
              <option value="gr">gr</option>
              <option value="cl">cl</option>
              <option value="piece">piece</option>
            </select>
          </div>
          <div className="btn-clear-ingred">
            <button
              className="remove-button-ingred"
              type="button"
              onClick={() => handleDeleteIngredient(i)}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
IngredientsList.propTypes = {
  ingreds: PropTypes.func.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  handleChangeQuantity: PropTypes.func.isRequired,
  handleChangeUnite: PropTypes.func.isRequired,
  quantityValues: PropTypes.func.isRequired,
  uniteValues: PropTypes.func.isRequired,
};

export default IngredientsList;
