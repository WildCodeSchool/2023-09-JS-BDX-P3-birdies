import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
import "reactjs-popup/dist/index.css";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import Popup from "../components/alerts/Popup";
import { Useinfo } from "../context/InfoContext";
// import { Useinfo } from "../context/InfoContext";

function Login() {
  const { formValue, setFormValue, handleLoginSubmit } = Useinfo();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

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
            <input
              value={formValue.email}
              name="email"
              className="input-email"
              type="email"
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="input">
            <input
              value={formValue.password}
              name="password"
              className="input-password"
              type="password"
              placeholder="Mot de passe"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="submit">
          <button
            className="submit-form"
            type="button"
            onClick={() => handleLoginSubmit(formValue)}
          >
            Se connecter
          </button>
          <Popup />
        </div>
        <div className="not-connected">
          <div className="lost-password">
            Mot de passe oublié?
            <span className="click-here"> Cliquez ici </span>
          </div>
          <div className="not-member">
            Toujours pas membre?
            <Link to="/register" className="link">
              <span className="click-here"> S'enregistrer </span>
            </Link>
          </div>
          <p className="CGV">Conditions générales d'utilisation</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
