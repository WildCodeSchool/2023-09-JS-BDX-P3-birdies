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
  const [everyInfo, setEveryInfo] = useState({});
  const [nickname, setNickname] = useState(); // eslint-disable-line
  const [firstname, setFirstname] = useState(); // eslint-disable-line
  const [lastname, setLastname] = useState(); // eslint-disable-line
  const [modifiedEmail, setModifiedEmail] = useState(); // eslint-disable-line
  const [modifiedPassword, setModifiedPassword] = useState(); // eslint-disable-line
  const [modifyRole, setModifyRole] = useState(); // eslint-disable-line
  const { id } = useParams();

  const fetchData = async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
    );
    setEveryInfo(response.data);
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const sendChanges = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        everyInfo
      );
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  function onValuechange(e) {
    setEveryInfo({ ...everyInfo, [e.target.name]: e.target.value });
  }

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
              name="pseudo"
              placeholder="Pseudo"
              value={everyInfo.pseudo}
              onChange={onValuechange}
              // onChange={(e) => setEveryInfo({ pseudo: e.target.value })}
            />
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={everyInfo.firstname}
              onChange={onValuechange}

              // onChange={(e) => setEveryInfo({ firstname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nom"
              name="lastname"
              value={everyInfo.lastname}
              onChange={onValuechange}

              // onChange={(e) => setEveryInfo({ lastname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={everyInfo.email}
              onChange={onValuechange}

              // onChange={(e) => setEveryInfo({ email: e.target.value })}
            />
            <input
              type="password"
              name="password"
              value={everyInfo.password}
              placeholder="Mot de passe"
              onChange={onValuechange}

              // onChange={(e) => setEveryInfo({ password: e.target.value })} // eslint-disable-line
            />
            <button
              type="submit"
              className="accept-modifications"
              onClick={sendChanges}
            >
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
