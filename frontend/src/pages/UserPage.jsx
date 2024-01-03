import { Link } from "react-router-dom";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import Filter from "../components/Filter";
// import Slides from "../components/Slides";
import FavoriteRecipesList from "../components/userPage/FavoriteRecipesList";

function UserPage() {
  const handleUserRecipes = () => {
    console.info("Affiche les recettes postées par l'utilisateur");
  };
  const handleUserFavs = () => {
    console.info("Affiche les recettes favorites de l'utilisateur");
  };
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
        <div className="evals-recipes">
          <p>
            Evaluations <br />0
          </p>
          <p>
            Recettes <br />0
          </p>
        </div>
        <div className="recipes-favs">
          <button
            type="button"
            className="mes-recettes"
            onClick={handleUserRecipes}
          >
            Mes recettes
          </button>
          <button
            type="button"
            className="coups-de-coeur"
            onClick={handleUserFavs}
          >
            Mes coup de coeur
          </button>
        </div>
      </div>
      <div className="filters-slide">
        <Filter />
      </div>
      <div className="userPage-recipes">
        {/* <Slides /> */}
        <FavoriteRecipesList />
      </div>
    </>
  );
}

export default UserPage;
