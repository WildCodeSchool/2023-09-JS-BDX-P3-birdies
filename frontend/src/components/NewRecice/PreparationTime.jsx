import PropTypes from "prop-types";

function PreparationTime({ duration, handleChangeTime }) {
  return (
    <div className="prepTime-Container">
      <h6 className="prepTime-title">Temps de préparation :</h6>
      <div className="time-container">
        <input
          type="text"
          name="prepTimeValue"
          className="time-input"
          value={duration}
          onChange={handleChangeTime}
        />
        <p>minutes</p>
      </div>
    </div>
  );
}

PreparationTime.propTypes = {
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleChangeTime: PropTypes.func.isRequired,
};
export default PreparationTime;
