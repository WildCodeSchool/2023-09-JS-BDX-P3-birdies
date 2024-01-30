import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/userPage/userPage.scss";
import Filter from "../components/Filter";
import FavoriteRecipesList from "../components/userPage/FavoriteRecipesList";
import OptionsMenu from "../components/userPage/OptionsMenu";
import UserRecipesList from "../components/userPage/UserRecipesList";
import { Useinfo } from "../context/InfoContext";

function UserPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const rotate = rotateWheel ? "rotate(180deg)" : "rotate(0deg)";
  const { user } = Useinfo();

  function handleChangeOptionsMenu() {
    setMenuVisible(!menuVisible);
    setRotateWheel(!rotateWheel);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = () => {
    const avatar = selectedFile;
    const formData = new FormData();
    formData.append("picture", avatar);
    try {
      axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}/uploads`,
        formData
      );
    } catch (err) {
      console.error(err);
    }
  };

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
          <input type="file" name="file" onChange={handleFileChange} />
          <img src={previewUrl} alt="Preview" />
          <button type="button" onClick={handleSave}>
            s
          </button>
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
