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
        <div className="header">
          <div className="text">Connexion</div>
        </div>
        <div className="inputs">
          <div className="input">
            <input type="text" placeholder="pseudo" />
          </div>
          <div className="input">
            <input type="email" placeholder="email" />
          </div>
          <div className="input">
            <input type="password" placeholder="mot de passe" />
          </div>
        </div>
        <button type="submit" className="submit">
          Se connecter
        </button>
        <div className="not-connected">
          <div className="lost-password">
            Mot de passe oublié? <br />
            <span>Cliquez ici</span>
          </div>
          <div className="not-member">
            Toujours pas membre? <br />
            <span>S'enregistrer</span>
          </div>
        </div>
        <p>Conditions générales d'utilisation</p>
      </div>
    </div>
  );
}

export default Login;
