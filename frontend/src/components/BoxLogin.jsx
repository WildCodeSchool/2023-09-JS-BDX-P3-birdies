import { Link } from "react-router-dom";

function BoxLogin() {
  return (
    <div className="box-login" id="login-box">
      <Link to="/userpage">
        <li id="box-login">Mon Compte</li>
      </Link>
      <Link to="/login">
        <li id="box-login">Déconnexion</li>
      </Link>
    </div>
  );
}

export default BoxLogin;
