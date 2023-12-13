import { Link } from "react-router-dom";

function BoxLogin() {
  return (
    <div className="">
      <Link to="/login">
        <li>Mon Compte</li>
      </Link>
      <Link to="/">
        <li>Déconnexion</li>
      </Link>
    </div>
  );
}

export default BoxLogin;
