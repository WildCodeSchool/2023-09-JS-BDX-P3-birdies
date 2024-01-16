import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MDBFileUpload } from "mdb-react-file-upload";
import { Useinfo } from "../context/InfoContext";
import "../styles/components/UserSettings/userSettings.scss";
import replyArrow from "../styles/icons/Reply Arrow.png";
import settingsWheel from "../styles/icons/settingsWheel.png";

export default function UserSettings() {
  const { setUserPicture } = Useinfo();
  // lines disabled for eslint because values are not changing anything yet
  const [nickname, setNickname] = useState(); // eslint-disable-line
  const [firstname, setFirstname] = useState(); // eslint-disable-line
  const [lastname, setLastname] = useState(); // eslint-disable-line
  const [modifiedEmail, setModifiedEmail] = useState(); // eslint-disable-line
  const [modifiedPassword, setModifiedPassword] = useState(); // eslint-disable-line
  const [modifyRole, setModifyRole] = useState({ role: "" }); // eslint-disable-line

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/users/`)
      .then((res) => setModifyRole(res?.data)); // data is an array of objects that have roles
  }, []);

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
        <MDBFileUpload
          getInputFiles={(file) => setUserPicture(file.find((e) => e.name))}
        />
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
          type="text"
          placeholder="Rôle"
          onChange={(e) => setModifiedPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={() => setUser(user ? "admin" : "visitor")} // eslint-disable-line
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
