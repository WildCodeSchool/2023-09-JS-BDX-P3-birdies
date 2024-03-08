import PropTypes from "prop-types";
import chevron from "../../styles/icons/chevron-down 2.png";

function ArrowButton({ toggleArea }) {
  return (
    <div className="open-close-btn">
      <button
        className="chevron-btn"
        data-value="1"
        type="button"
        onClick={toggleArea}
      >
        <img className="chevron" src={chevron} alt="chevron" data-value="1" />
      </button>
    </div>
  );
}
ArrowButton.propTypes = {
  toggleArea: PropTypes.func.isRequired,
};
export default ArrowButton;
