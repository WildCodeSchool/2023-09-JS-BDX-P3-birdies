import { Link, useParams } from "react-router-dom";
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
  const [everyInfo, setEveryInfo] = useState();
  const [nickname, setNickname] = useState(); // eslint-disable-line
  const [firstname, setFirstname] = useState(); // eslint-disable-line
  const [lastname, setLastname] = useState(); // eslint-disable-line
  const [modifiedEmail, setModifiedEmail] = useState(); // eslint-disable-line
  const [modifiedPassword, setModifiedPassword] = useState(); // eslint-disable-line
  const [modifyRole, setModifyRole] = useState(); // eslint-disable-line
  const { id } = useParams();

  const fetchData = async (userId) => {
    const response = await axios.get(
      `http://localhost:3310/api/users/${userId}`
    );
    setEveryInfo(response.data);
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div>
      {everyInfo ? (
        <>
          <div className="info-parameters">
            <Link className="back-arrow" to="/">
              <img src={replyArrow} alt="Retour" />
            </Link>
            <MDBFileUpload
              getInputFiles={(file) => setUserPicture(file.find((e) => e.name))}
            />
            <img
              src={settingsWheel}
              alt="Paramètres"
              className="setting-wheel"
            />
          </div>
          <div className="user-settings-container">
            <input
              type="text"
              placeholder="Pseudo"
              value={everyInfo.pseudo}
              onChange={(e) => setEveryInfo({ pseudo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={everyInfo.firstname}
              onChange={(e) => setEveryInfo({ firstname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nom"
              value={everyInfo.lastname}
              onChange={(e) => setEveryInfo({ lastname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={everyInfo.email}
              onChange={(e) => setEveryInfo({ email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setEveryInfo({ password: e.target.value })} // eslint-disable-line
            />
            <button type="submit" className="accept-modifications">
              Modifier
            </button>
            <button
              type="submit"
              className="accept-role-modification"
              onClick={() => (everyInfo.role === "admin" ? "user" : "admin")}
            >
              Modifier Rôle
            </button>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
