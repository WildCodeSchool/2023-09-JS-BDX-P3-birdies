import { Link } from "react-router-dom";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";

function UserPage() {
  return (
    <>
      <div className="userPage-header">
        <div className="info-parameters">
          <Link className="back-arrow" to="/">
            <img src={replyArrow} alt="Retour" />
          </Link>
          <img
            className="pfp"
            src="https://64.media.tumblr.com/9c1d74026bb52921106ca79e61737183/5f8a57cbf4d0c6d5-2d/s540x810/ec4df470e2ee56091e6419ec24c90dbe7479b64e.jpg"
            alt="Moi"
          />
          <img src={settingsWheel} alt="Paramètres" className="setting-wheel" />
        </div>
        <div className="evals-recipes">evaluations/recettes</div>
        <div className="recipes-favs">recettes-favorites</div>
      </div>
      <div className="filters-slide">slides-filtres</div>
      <div className="others-filter">filtres"autres"</div>
      <div className="userPage-recipes">userPages-recipes</div>
    </>
  );
}

export default UserPage;
