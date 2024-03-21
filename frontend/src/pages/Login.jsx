import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
import "reactjs-popup/dist/index.css";
import { MDBInput } from "mdb-react-ui-kit";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.svg";
import Popup from "../components/alerts/Popup";
import { Useinfo } from "../context/InfoContext";
// import { Useinfo } from "../context/InfoContext";

function Login() {
  const { formValue, setFormValue, handleLoginSubmit, passwordError } =
    Useinfo();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className="container">
        <img className="cookies" src={cookies} alt="" />
        <div className="img-container">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="login-container">
          <div className="inputs">
            <div className="wrong-identification">
              <p
                className={
                  passwordError
                    ? "error-identification"
                    : "error-identification checked"
                }
              >
                Identifiants incorrects
              </p>
            </div>
            <div className="header">
              <div className="text">Connexion</div>
            </div>

            <div className="input">
              <MDBInput
                label="Email"
                id="typeEmail"
                type="email"
                value={formValue.email}
                autoComplete="username"
                onChange={onChange}
                name="email"
              />
            </div>
            <div className="input">
              <MDBInput
                label="Mot de passe"
                id="typePassword"
                type="password"
                value={formValue.password}
                name="password"
                autoComplete="current-password"
                onChange={onChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    handleLoginSubmit({
                      email: formValue.email,
                      password: formValue.password,
                    });
                }}
              />
              {/* <input
                value={formValue.password}
                name="password"
                autoComplete="current-password"
                className="input-password"
                type="password"
                placeholder="Mot de passe"
              /> */}
            </div>
          </div>
          <div className="submit">
            <button
              className="submit-form"
              type="button"
              onClick={() =>
                handleLoginSubmit({
                  email: formValue.email,
                  password: formValue.password,
                })
              }
            >
              Se connecter
            </button>
            <Popup />
          </div>

          <div className="not-connected">
            <div className="lost-password">
              Mot de passe oublié?
              <Link to="/lostPassword">
                <span className="click-here"> Cliquez ici </span>
              </Link>
            </div>
            <div className="not-member">
              Toujours pas membre?
              <Link to="/register" className="link">
                <span className="click-here"> S'enregistrer </span>
              </Link>
            </div>
            {/* <p className="CGV">Conditions générales d'utilisation</p> */}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
