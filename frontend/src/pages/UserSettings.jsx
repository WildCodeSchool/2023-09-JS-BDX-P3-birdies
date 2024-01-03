import { Link } from "react-router-dom";
import { useState } from "react";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";
import "../styles/components/UserSettings/userSettings.scss";

export default function UserSettings() {
  // lines disabled for eslint because values are not changing anything yet
  const [nickname, setNickname] = useState(); // eslint-disable-line
  const [firstname, setFirstname] = useState(); // eslint-disable-line
  const [lastname, setLastname] = useState(); // eslint-disable-line
  const [modifiedEmail, setModifiedEmail] = useState(); // eslint-disable-line
  const [modifiedPassword, setModifiedPassword] = useState(); // eslint-disable-line

  const handleModification = () => {
    alert("Modifications enregistrées"); // eslint-disable-line no-alert
    setTimeout(() => window.location.reload(false), 1000);
  };

  return (
    <>
      <div className="info-parameters">
        <Link className="back-arrow" to="/">
          <img src={replyArrow} alt="Retour" />
        </Link>
        <button type="submit" className="modify-pfp">
          <img
            className="pfp"
            src="https://64.media.tumblr.com/9c1d74026bb52921106ca79e61737183/5f8a57cbf4d0c6d5-2d/s540x810/ec4df470e2ee56091e6419ec24c90dbe7479b64e.jpg"
            alt="Moi"
          />
        </button>
        <img src={settingsWheel} alt="Paramètres" className="setting-wheel" />
      </div>
      <div className="user-settings-container">
        <input
          type="text"
          placeholder="Pseudo"
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setModifiedEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setModifiedPassword(e.target.value)}
        />
        <button
          type="submit"
          className="accept-modifications"
          onClick={handleModification}
        >
          Modifier
        </button>
      </div>
    </>
  );
}
