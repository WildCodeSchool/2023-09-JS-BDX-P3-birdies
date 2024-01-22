import PropTypes from "prop-types";
import { Useinfo } from "../context/InfoContext";

function ValidateButton({ id }) {
  const { sendEvaluation } = Useinfo();
  return (
    <button
      data-value={id}
      className="validate-button"
      type="button"
      onClick={sendEvaluation}
    >
      VALIDER
    </button>
  );
}

ValidateButton.propTypes = {
  id: PropTypes.number.isRequired,
};
export default ValidateButton;
