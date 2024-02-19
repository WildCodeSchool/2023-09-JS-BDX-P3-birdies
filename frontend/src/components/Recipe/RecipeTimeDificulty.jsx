import PropTypes from "prop-types";
import chefHat from "../../styles/icons/Chef Hat.png";
import deliveryTime from "../../styles/icons/Delivery Time.png";
import { Useinfo } from "../../context/InfoContext";

function TimeDifficulty({ recipe }) {
  const { convertMinutesToTime } = Useinfo();

  return (
    <div className="time-difficulty-container">
      <div className="prep-time-container">
        <img src={chefHat} alt="chefs-hat" />
        <div className="difficulty">{recipe.difficulty}</div>
      </div>
      <div className="difficulty-container">
        <img src={deliveryTime} alt="chronometer" />
        <div className="prep-time">{convertMinutesToTime(recipe.prepTime)}</div>
      </div>
    </div>
  );
}
TimeDifficulty.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
};

export default TimeDifficulty;
