import { Link } from "react-router-dom";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";

function Register() {
  return (
    <div className="container">
      <img className="cookies" src={cookies} alt="" />
      <div className="img-container">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="login-container">
        <div className="inputs">
          <div className="header">
            <div className="text">Créer mon compte</div>
          </div>
          <div className="input">
            <input type="text" placeholder="Pseudo" />
          </div>
          <div className="input">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <input type="password" placeholder="Mot de passe" />
          </div>
          <div className="input">
            <input type="password" placeholder="Vérifier mot de passe" />
          </div>
        </div>
        <div className="submit">
          <Link to="/login" className="link">
            <button type="submit">S'enregistrer</button>
          </Link>
        </div>

        <div className="not-connected">
          <div className="not-member">
            Oups, j'ai déjà un compte!
            <Link to="/login" className="link">
              <span> Se connecter </span>
            </Link>
          </div>
          <p>Conditions générales d'utilisation</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
