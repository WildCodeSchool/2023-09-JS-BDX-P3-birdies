import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "reactjs-popup/dist/index.css";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import Popup from "../components/alerts/Popup";
import { Useinfo } from "../context/InfoContext";
// import { Useinfo } from "../context/InfoContext";

function Login() {
  const { setUser, setInfoLogin } = Useinfo();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (credentials) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3310/api/login`,
        credentials
      );
      localStorage.setItem("token", data.token);
      const config = { headers: { Authorization: `Bearer ${data.token}` } };
      const result = await axios.get(
        `http://localhost:3310/api/users/me`,
        config
      );
      setInfoLogin((prev) => !prev);
      // eslint-disable-next-line no-alert
      alert(`Content de vous revoir ${result.data.pseudo}`);
      setUser(result.data);
      if (result.data.role === "admin") {
        return navigate("/admin");
      }
      return navigate("/");
    } catch (err) {
      console.error(err);
      setFormValue({
        email: "",
        password: "",
      });
    }
    return null;
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
