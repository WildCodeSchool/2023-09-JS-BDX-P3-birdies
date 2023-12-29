import PropTypes from "prop-types";
import { Useinfo } from "../context/InfoContext";

function ValidateButton({ id }) {
  const { sendComment } = Useinfo();
  return (
    <button
      data-value={id}
      className="validate-button"
      type="button"
      onClick={sendComment}
    >
      VALIDER
    </button>
  );
}

ValidateButton.propTypes = {
  id: PropTypes.number.isRequired,
};
export default ValidateButton;
