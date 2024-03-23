/* eslint-disable react/jsx-no-bind */
import { useNavigate, useParams } from "react-router-dom";
import { MDBBtn, MDBAlert, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";

import "../styles/components/UserSettings/userSettings.scss";
import replyArrow from "../styles/icons/Reply Arrow.png";

export default function UserSettings() {
  const [everyInfo, setEveryInfo] = useState({
    pseudo: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "", // ou toute autre valeur par défaut pertinente pour le mot de passe
    role: "",
  });
  const navigate = useNavigate();
  const [test, setTest] = useState();

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

  const goBack = () => {
    navigate(-1);
  };

  const sendChanges = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        everyInfo
      );
      navigate(-1);
      // setTest(true);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  function onValuechange(e) {
    setEveryInfo({ ...everyInfo, [e.target.name]: e.target.value });
  }

  const sendChangesRole = async () => {
    try {
      const newRole = everyInfo.role === "admin" ? "user" : "admin";

      // Envoyer la requête PATCH avec le nouveau rôle
      await axios.patch(`http://localhost:3310/api/users/${id}`, {
        role: newRole,
      });
      // Afficher le nouveau rôle après la mise à jour
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div>
      {everyInfo ? (
        <>
          <div className="info-parameters">
            <button type="button" onClick={goBack} className="return-btn">
              <img src={replyArrow} alt="Retour" />
            </button>
          </div>
          <div className="user-settings-container">
            <MDBInput
              label="Pseudo"
              id="typeText"
              type="text"
              name="pseudo"
              value={everyInfo.pseudo}
              onChange={onValuechange}
            />
            {/* <input
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              value={everyInfo.pseudo}
              onChange={onValuechange}
              onChange={(e) => setEveryInfo({ pseudo: e.target.value })}
            /> */}
            <MDBInput
              label="Prénom"
              id="typeText"
              type="text"
              name="firstname"
              value={everyInfo.firstname ? everyInfo.firstname : ""}
              onChange={onValuechange}
            />
            {/* <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={everyInfo.firstname}
              onChange={onValuechange} */}
            {/* onChange={(e) => setEveryInfo({ firstname: e.target.value })} */}
            {/* /> */}
            <MDBInput
              label="Nom"
              id="typeText"
              type="text"
              name="lastname"
              value={everyInfo.lastname ? everyInfo.lastname : ""}
              onChange={onValuechange}
            />
            {/* <input
              type="text"
              placeholder="Nom"
              name="lastname"
              value={everyInfo.lastname ? everyInfo.lastname : ""}
              onChange={onValuechange}

              // onChange={(e) => setEveryInfo({ lastname: e.target.value })}
            /> */}
            <MDBInput
              label="Email"
              id="typeEmail"
              type="email"
              name="email"
              value={everyInfo.email}
              onChange={onValuechange}
            />

            <MDBBtn
              color="warning"
              type="submit"
              className="accept-modifications"
              onClick={sendChanges}
              style={{ backgroundColor: "#d56c06", fontSize: "medium" }}
            >
              Modifier
            </MDBBtn>

            <MDBAlert
              color="success"
              autohide
              position="top-right"
              delay={2000}
              appendToBody
              open={test}
              onClose={() => setTest(false)}
            >
              Modifications acceptées
            </MDBAlert>
            {everyInfo?.role === "admin" && (
              <button
                type="submit"
                className="accept-role-modification"
                onClick={sendChangesRole}
              >
                Modifier Rôle
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
