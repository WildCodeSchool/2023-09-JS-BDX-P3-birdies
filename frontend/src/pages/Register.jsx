import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import { Useinfo } from "../context/InfoContext";

function Register() {
  const { users, setUsers } = Useinfo();
  const [pseudo, setPseudo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();

  const handleSubmit = () => {
    if (password !== checkPassword) {
      alert("Les mots de passe ne sont pas identiques"); // eslint-disable-line no-alert
    } else {
      const newUser = {
        id: uuidv4(),
        pseudo,
        email,
        password,
      };
      setUsers([...users, newUser]);
      alert(`Bienvenu sur notre site, ${pseudo}!`); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="container">
      <img className="cookies" src={cookies} alt="" />
      <div className="img-container img-container-registration">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="login-container">
        <div className="inputs">
          <div className="header">
            <div className="text">Créer mon compte</div>
          </div>
          <div className="input">
            <input
              className="input-pseudo"
              type="text"
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              className="input-email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              className="input-password"
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              className="input-password"
              type="password"
              placeholder="Vérifier mot de passe"
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit">
          <Link to="/login" className="link">
            <button
              className="submit-form"
              type="submit"
              onClick={handleSubmit}
            >
              S'enregistrer
            </button>
          </Link>
        </div>

        <div className="not-connected not-connected-registration">
          <div className="not-member">
            <Link to="/login" className="link">
              <span>Oups, j'ai déjà un compte!</span>
            </Link>
          </div>
          <p className="CGV">Conditions générales d'utilisation</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
