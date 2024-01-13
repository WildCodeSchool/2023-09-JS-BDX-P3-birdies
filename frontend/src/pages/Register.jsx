import { Link } from "react-router-dom";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import { Useinfo } from "../context/InfoContext";

function Register() {
  const {
    createUser,
    checkPassword,
    setCheckPassword,
    formValue,
    setFormValue,
    validEmail,
    validPassword,
    validPseudo,
  } = Useinfo();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formValue.password !== checkPassword) {
      setFormValue({ ...formValue, password: "" });
      setCheckPassword("");
      alert("Les mots de passe ne sont pas identiques"); // eslint-disable-line no-alert
    } else {
      createUser(formValue);
    }
  };
  return (
    <div className="container">
      <img className="cookies" src={cookies} alt="" />
      <div className="img-container img-container-registration">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="login-container">
        <div className="inputs">
          <div className="header">
            <div className="text">Créer mon compte</div>
          </div>
          <div className="input">
            <input
              name="pseudo"
              className="input-pseudo"
              type="text"
              placeholder="pseudo"
              value={formValue.pseudo}
              onChange={onChange}
            />
          </div>
          <div className="error-message-container">
            <p
              className={
                formValue.pseudo === undefined ||
                !formValue.pseudo.match(validPseudo)
                  ? "error-format-pseudo"
                  : "error-format-pseudo checked"
              }
            >
              Min 8 caractères, 1 Maj, 1 Min, 1 Chiffre
            </p>
          </div>
          <div className="input">
            <input
              name="email"
              className="input-email"
              type="email"
              placeholder="Email"
              value={formValue.email}
              onChange={onChange}
            />
          </div>
          <div className="error-message-container">
            <p
              className={
                formValue.email === undefined ||
                !formValue.email.match(validEmail)
                  ? "error-format-pseudo"
                  : "error-format-pseudo checked"
              }
            >
              Format d' e-mail invalide
            </p>
          </div>
          <div className="input">
            <input
              name="password"
              className="input-password"
              type="password"
              placeholder="Mot de passe"
              value={formValue.password}
              onChange={onChange}
            />
          </div>
          <div className="error-message-container">
            <p
              className={
                formValue.password === undefined ||
                !formValue.password.match(validPassword)
                  ? "error-format-pseudo"
                  : "error-format-pseudo checked"
              }
            >
              doit contenir 1 caractere spé
            </p>
          </div>
          <div className="input">
            <input
              className="input-password"
              type="password"
              placeholder="Vérifier mot de passe"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </div>
          <div className="error-message-container">
            <p
              className={
                checkPassword !== formValue.password
                  ? "error-check-password"
                  : "error-check-password checked"
              }
            >
              Vérification incorrecte
            </p>
          </div>
        </div>
        <div className="submit">
          <button className="submit-form" type="submit" onClick={handleSubmit}>
            S'enregistrer
          </button>
        </div>

        <div className="not-connected not-connected-registration">
          <div className="not-member">
            <Link to="/login" className="link">
              <span>Oups, j'ai déjà un compte!</span>
            </Link>
          </div>
          <p className="CGV">Conditions générales d'utilisation</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
