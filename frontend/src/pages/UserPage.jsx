import { useNavigate } from "react-router-dom";
import { useState } from "react";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import Filter from "../components/Filter";
import FavoriteRecipesList from "../components/userPage/FavoriteRecipesList";
import OptionsMenu from "../components/userPage/OptionsMenu";
import UserRecipesList from "../components/userPage/UserRecipesList";

function UserPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);

  const navigate = useNavigate();
  const rotate = rotateWheel ? "rotate(180deg)" : "rotate(0deg)";

  function handleChangeOptionsMenu() {
    setMenuVisible(!menuVisible);
    setRotateWheel(!rotateWheel);
  }
  return (
    <>
      <div className="userPage-header">
        <div className="info-parameters">
          <button
            type="button"
            className="back-arrow"
            onClick={() => navigate(-1)}
          >
            <img src={replyArrow} alt="Retour" />
          </button>

          <img
            className="pfp"
            src="https://64.media.tumblr.com/9c1d74026bb52921106ca79e61737183/5f8a57cbf4d0c6d5-2d/s540x810/ec4df470e2ee56091e6419ec24c90dbe7479b64e.jpg"
            alt="Moi"
          />
          <button
            type="button"
            className="option-menu-btn"
            onClick={handleChangeOptionsMenu}
          >
            <img
              src={settingsWheel}
              alt="Paramètres"
              className="setting-wheel"
              style={{ transform: rotate, transition: "all 0.2s linear" }}
            />
          </button>
          <OptionsMenu menuVisible={menuVisible} />
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
            className="coups-de-coeur"
            // onClick={showUserFavorites}
          >
            Mes coup de coeur
          </button>
          <button type="button" className="mes-recettes">
            Mes recettes
          </button>
        </div>
      </div>
      <div className="filters-slide">
        <Filter />
      </div>
      <div className="userPage-recipes">
        <FavoriteRecipesList />
        <UserRecipesList />
      </div>
    </>
  );
}

export default UserPage;
