import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import { Useinfo } from "../context/InfoContext";

function Login() {
  const { users } = Useinfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    const user = users.find(
      (person) => person.email === email && person.password === password
    );
    if (user) {
      alert("Connecté!"); // eslint-disable-line no-alert
      navigate("/");
    } else {
      alert("Mot de passe ou email incorrect"); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="container">
      <img className="cookies" src={cookies} alt="" />
      <div className="img-container">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="login-container">
        <div className="inputs">
          <div className="header">
            <div className="text">Connexion</div>
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
        </div>
        <div className="submit">
          <button className="submit-form" type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
        </div>

        <div className="not-connected">
          <div className="lost-password">
            Mot de passe oublié?
            <span className="click-here"> Cliquez ici </span>
          </div>
          <div className="not-member">
            Toujours pas membre?
            <Link to="/register" className="link">
              <span className="click-here"> S'enregistrer </span>
            </Link>
          </div>
          <p className="CGV">Conditions générales d'utilisation</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
