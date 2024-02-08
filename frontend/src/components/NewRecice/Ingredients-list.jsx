import { MDBBtn, MDBIcon, MDBInput, MDBSelect } from "mdb-react-ui-kit";
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
        <div
          key={ing.name ?? ing.ingredientName}
          className="d-flex justify-content-between mb-2"
        >
          <div className="col-5">- {ing.name ?? ing.ingredientName}</div>
          <div className="col-2">
            <MDBInput
              label="Qt"
              id="form1"
              type="text"
              value={quantityValues[i]}
              onChange={(e) => handleChangeQuantity(e, i)}
            />
          </div>
          <div className="col-2">
            <MDBSelect
              value={uniteValues[i]}
              name="unite"
              id="0"
              data={[
                { text: "-", value: "-" },
                { text: "gr", value: "gr" },
                { text: "cl", value: "cl" },
                { text: "piece", value: "piece" },
              ]}
              onValueChange={(e) => handleChangeUnite({ target: e }, i)}
            />
          </div>
          <div className="col-1 d-flex justify-content-center align-items-center">
            <MDBBtn
              className="my-auto"
              outline
              rounded
              floating
              color="danger"
              type="button"
              onClick={() => handleDeleteIngredient(i)}
              size="sm"
            >
              <MDBIcon fas icon="minus" />
            </MDBBtn>
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
