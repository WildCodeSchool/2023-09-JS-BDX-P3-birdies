import { useState } from "react";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import OptionsMenu from "../components/userPage/OptionsMenu";
import AllUsers from "../components/admin/AllUsers";
import AllRecipes from "../components/admin/AllRecipes";
import { Useinfo } from "../context/InfoContext";

function AdminPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);
  const rotate = rotateWheel ? "rotate(180deg)" : "rotate(0deg)";
  const { showAllRecipes, setShowAllRecipes, showUserList, setShowUserList } =
    Useinfo();

  function handleChangeOptionsMenu() {
    setMenuVisible(!menuVisible);
    setRotateWheel(!rotateWheel);
  }

  const handleShowLists = () => {
    setShowUserList(!showUserList);
    setShowAllRecipes(!showAllRecipes);
  };
  return (
    <>
      <div className="userPage-header">
        <div className="info-parameters">
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

        <div className="recipes-favs recipes-favs-admin">
          <button
            type="button"
            className="every-recipes-list"
            onClick={handleShowLists}
          >
            Recettes
          </button>
          <button
            type="button"
            className="users-list"
            onClick={handleShowLists}
          >
            Utilisateurs
          </button>
        </div>
      </div>
      <div className="userPage-recipes">
        <AllRecipes recipeListVisible={showAllRecipes} />
        <AllUsers listVisible={showUserList} />
      </div>
    </>
  );
}

export default AdminPage;
