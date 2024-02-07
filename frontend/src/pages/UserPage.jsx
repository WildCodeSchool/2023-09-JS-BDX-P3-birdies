import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import FavoriteRecipesList from "../components/userPage/FavoriteRecipesList";
import OptionsMenu from "../components/userPage/OptionsMenu";
import UserRecipesList from "../components/userPage/UserRecipesList";
import { Useinfo } from "../context/InfoContext";

function UserPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileVisible, setFileVisible] = useState(false); // eslint-disable-line
  const [favoriteRecipesVisible, setFavoriteRecipesVisible] = useState(false);
  const [userRecipesVisible, setUserRecipesVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [onOff, setOnOff] = useState(false);

  const navigate = useNavigate();
  const rotate = rotateWheel ? "rotate(180deg)" : "rotate(0deg)";
  const { user } = Useinfo();

  const handleToggleFavoriteRecipes = () => {
    setFavoriteRecipesVisible(true);
    setUserRecipesVisible(false);
  };

  const handleToggleUserRecipes = () => {
    setFavoriteRecipesVisible(false);
    setUserRecipesVisible(true);
  };

  function handleChangeOptionsMenu() {
    setMenuVisible(!menuVisible);
    setRotateWheel(!rotateWheel);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setCurrentUser(fileUrl);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("picture", selectedFile);
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}/uploads`,
      formData
    );
    setOnOff(false);
    setCurrentUser(result.data[0].avatar);
  };

  const getCurrentUser = async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/uploads`
    );

    setCurrentUser(result.data.avatar);
  };

  useEffect(() => {
    getCurrentUser(user.id);
  }, []);

  return (
    <>
      <div className="userPage-header">
        <div className="info-parameters">
          <button
            type="button"
            className="back-arrow"
            onClick={() => navigate("/")}
          >
            <img src={replyArrow} alt="Retour" />
          </button>
          <div className="container-pfp">
            {onOff && (
              <input
                type="file"
                name="file"
                className="file-visible"
                onChange={handleFileChange}
              />
            )}
            {selectedFile ? (
              <img
                className="user-pfp"
                src={URL.createObjectURL(selectedFile)}
                alt="test"
              />
            ) : (
              <img
                className="user-pfp"
                src={`${import.meta.env.VITE_BACKEND_URL}/${currentUser}  `}
                alt="Preview"
              />
            )}

            {onOff && (
              <button
                type="button"
                className="confirm-button"
                onClick={handleSave}
              >
                Confirmer
              </button>
            )}
          </div>
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
          <OptionsMenu
            setOnOff={setOnOff}
            onOff={onOff}
            menuVisible={menuVisible}
          />
        </div>
        {/* <div className="evals-recipes">
          <p>
            Evaluations <br />0
          </p>
          <p>
            Recettes <br />0
          </p>
        </div> */}
        <div className="recipes-favs">
          <button
            type="button"
            className="coups-de-coeur"
            onClick={handleToggleFavoriteRecipes}
          >
            Mes coup de coeur
          </button>
          <button
            type="button"
            className="mes-recettes"
            onClick={handleToggleUserRecipes}
          >
            Mes recettes
          </button>
        </div>
      </div>
      <div className="userPage-recipes">
        {favoriteRecipesVisible && <FavoriteRecipesList />}
        {userRecipesVisible && <UserRecipesList />}
      </div>
    </>
  );
}

export default UserPage;
