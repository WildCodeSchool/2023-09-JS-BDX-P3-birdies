import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import FavoriteRecipesList from "../components/userPage/FavoriteRecipesList";
import OptionsMenu from "../components/userPage/OptionsMenu";

function AdminPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);
  const [kindOfRecipes, setKinfOfRecipes] = useState("favs"); // "favs"
  const navigate = useNavigate();
  const rotate = rotateWheel ? "rotate(180deg)" : "rotate(0deg)";
  const [dbUsers, setDbUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/users")
      .then((res) => setDbUsers(res?.data));
  }, []);

  const showApiUsers = () => {
    <div className="display-users">
      {dbUsers.map((element) => (
        <div key={element.id}>{element?.firstname}</div>
      ))}
    </div>;
    console.info(dbUsers.map((element) => element?.firstname));
  };

  const handleUserRecipes = () => {
    setKinfOfRecipes("mines");
    console.info("Affiche les recettes postées par l'utilisateur");
  };
  const handleUserFavs = () => {
    setKinfOfRecipes("favs");
    console.info("Affiche les recettes favorites de l'utilisateur");
  };
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

        <div className="recipes-favs">
          <button
            type="button"
            className="users-list"
            onClick={(handleUserFavs, showApiUsers)}
          >
            Liste d'utilisateurs:
          </button>
          <button
            type="button"
            className="every-recipes-list"
            onClick={handleUserRecipes}
          >
            Recettes
          </button>
        </div>
      </div>
      <div className="userPage-recipes">
        <FavoriteRecipesList kindOfRecipes={kindOfRecipes} />
      </div>
    </>
  );
}

export default AdminPage;
