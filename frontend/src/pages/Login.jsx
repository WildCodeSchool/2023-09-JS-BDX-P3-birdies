import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";

function Login() {
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
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <input type="password" placeholder="Mot de passe" />
          </div>
        </div>
        <div className="submit">
          <button type="submit">Se connecter</button>
        </div>

        <div className="not-connected">
          <div className="lost-password">
            Mot de passe oublié?
            <span> Cliquez ici </span>
          </div>
          <div className="not-member">
            Toujours pas membre?
            <span> S'enregistrer </span>
          </div>
          <p>Conditions générales d'utilisation</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
