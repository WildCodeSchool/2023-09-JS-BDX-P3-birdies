import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import Filter from "../components/Filter";
import FavoriteRecipesList from "../components/userPage/FavoriteRecipesList";
import OptionsMenu from "../components/userPage/OptionsMenu";
import { Useinfo } from "../context/InfoContext";
// import { Useinfo } from "../context/InfoContext";

function UserPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);
  const [kindOfRecipes, setKinfOfRecipes] = useState("favs"); // eslint-disable-line
  const [userByRecipe, setUserByRecipe] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const { user } = Useinfo();
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();
  const rotate = rotateWheel ? "rotate(180deg)" : "rotate(0deg)";

  const showUserFavorites = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3310/api/users/${user.id}/userRecipes`
      );
      setUserFavorites(data);
      setToggle(!toggle);
    } catch (err) {
      console.error(err);
    }
  };

  const showUserRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3310/api/users/${user.email}/userRecipes`
      );
      setUserByRecipe(data);
      setToggle(!toggle);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleUserFavs = () => {
  //   setKinfOfRecipes("favs");
  //   console.info("Affiche les recettes favorites de l'utilisateur");
  // };
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
            onClick={showUserFavorites}
          >
            Mes coup de coeur
          </button>
          <button
            type="button"
            className="mes-recettes"
            onClick={showUserRecipes}
          >
            Mes recettes
          </button>
        </div>
      </div>
      <div className="filters-slide">
        <Filter />
      </div>
      <div className="userPage-recipes">
        {toggle && <FavoriteRecipesList kindOfRecipes={kindOfRecipes} />}
        <div className="user-recipes">
          {userByRecipe.map((e) => (
            <>
              <div>{e.name}</div>
              <div>{e.picture}</div>
              <div>{e.publicationDate}</div>
            </>
          ))}
        </div>
        <div className="user-favorites-list">
          {userFavorites.map((e) => e.name)}
        </div>
      </div>
    </>
  );
}

export default UserPage;
