import { Link } from "react-router-dom";
import { Useinfo } from "../context/InfoContext";

function BoxLogin() {
  const { user } = Useinfo();

  return (
    <div className="box-login" id="login-box">
      <Link to={user.role === "visitor" ?? "/userpage"}>
        {(user.role === "user" || user.role === "admin") && (
          <li id="box-login">Mon Compte</li>
        )}
      </Link>
      <Link to="/login">
        {user.role === "visitor" ? (
          <li id="box-login">Me connecter</li>
        ) : (
          <li id="box-login">Déconnexion</li>
        )}
      </Link>
    </div>
  );
}

export default BoxLogin;
