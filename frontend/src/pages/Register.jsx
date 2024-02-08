import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
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
    errorOrigin,
    setErrorOrigin,
    noMatchPassword,
    setNoMatchPassword,
    formatError,
    setFormatError,
  } = Useinfo();

  const onChange = (e) => {
    console.error(e.target.name);
    setErrorOrigin("");
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formValue.password !== checkPassword ||
      !formValue.password.match(validPassword)
    ) {
      setFormValue({ ...formValue, password: "" });
      setCheckPassword("");
      setNoMatchPassword(true);
    } else if (!formValue.pseudo.match(validPseudo)) {
      setFormValue({ ...formValue, pseudo: "" });
      setFormatError("pseudo");
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
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="header">
              <div className="error-Msg-existing">
                {errorOrigin !== "" && <p>{`${errorOrigin} déjà existant`}</p>}
                {formatError !== "" && (
                  <p>{`${formatError} format incorrect`}</p>
                )}
                {noMatchPassword && <p>Mot de passe incorrect</p>}
              </div>
              <div className="text register-title">Créer mon compte</div>
            </div>
            <div className="input">
              <MDBInput
                value={formValue.pseudo}
                onChange={onChange}
                name="pseudo"
                label="Pseudo"
                type="text"
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
              <MDBInput
                label="Email "
                id="typeEmail"
                type="email"
                autoComplete="username"
                value={formValue.email}
                onChange={onChange}
                name="email"
              />
              {/* <input
                autoComplete="username"
                name="email"
                className="input-email"
                type="email"
                placeholder="Email"
                value={formValue.email}
                onChange={onChange}
              /> */}
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
              <MDBInput
                label="Password "
                id="typePassword"
                type="password"
                name="password"
                autoComplete="new-password"
                value={formValue.password}
                onChange={onChange}
              />
              {/* <input
                className="input-password"
                type="password"
                placeholder="Mot de passe"
              /> */}
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
              <MDBInput
                label="Vérifier mot de passe "
                id="typePassword"
                type="password"
                name="password"
                autoComplete="new-password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              {/* <input
                className="input-password"
                autoComplete="new-password"
                type="password"
                placeholder="Vérifier mot de passe"
              /> */}
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
            <MDBBtn outline rounded color="warning" type="submit">
              S'enregistrer
            </MDBBtn>
          </div>
        </form>

        <div className="not-connected not-connected-registration">
          <div className="not-member">
            <Link to="/login" className="link">
              <span>Oups, j'ai déjà un compte!</span>
            </Link>
          </div>
          {/* <p className="CGV">Conditions générales d'utilisation</p> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
