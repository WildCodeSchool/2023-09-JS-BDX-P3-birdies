import { Link, useNavigate } from "react-router-dom";
import { Useinfo } from "../context/InfoContext";
import "reactjs-popup/dist/index.css";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import Popup from "../components/alerts/Popup";

function Login() {
  const { users, email, setEmail, password, setPassword, setPopup } = Useinfo();
=======
import Popup from "../components/alerts/ConnectionPopup";

function Login() {
  const { users, email, setEmail, password, setPassword, setPopupContent } =
    Useinfo();
  const navigate = useNavigate();

  function handleLoginSubmit() {
    const findUser = users.find(
      (e) => password === e.password && email === e.email
    );
    if (findUser) {
      setPopup("Connecté!");
      setPopupContent("Connecté!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setPopup("Identifiant ou mot de passe incorrect");
      setTimeout(() => window.location.reload(false), 1000);
      setPopupContent("Echec");
    }
  }

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
              onBlur={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              className="input-password"
              type="password"
              placeholder="Mot de passe"
              onBlur={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit">
          <button
            className="submit-form"
            type="button"
            onClick={handleLoginSubmit}
          >
            Se connecter
          </button>
          <Popup />
        </div>
        <Popup />
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
