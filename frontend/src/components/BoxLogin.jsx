import { Link } from "react-router-dom";
import { Useinfo } from "../context/InfoContext";

function BoxLogin() {
  const { user, logout } = Useinfo();

  return (
    <div className="box-login" id="login-box">
      <Link to="/userpage">
        {(user.role === "user" || user.role === "admin") && (
          <button type="button" id="box-login">
            Mon Compte
          </button>
        )}
      </Link>
      <Link to={user.role === "visitor" ? "/login" : "/slideone"}>
        {user.role === "visitor" ? (
          <button type="button" id="box-login">
            Me connecter
          </button>
        ) : (
          <button type="button" id="box-login" onClick={logout}>
            Déconnexion
          </button>
        )}
      </Link>
    </div>
  );
}

export default BoxLogin;
