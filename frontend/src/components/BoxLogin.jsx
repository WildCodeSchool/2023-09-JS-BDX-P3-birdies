import { Link } from "react-router-dom";

function BoxLogin() {
  return (
    <div className="box-login">
      <Link to="/userpage">
        <li>Mon Compte</li>
      </Link>
      <Link to="/login">
        <li>Déconnexion</li>
      </Link>
    </div>
  );
}

export default BoxLogin;
