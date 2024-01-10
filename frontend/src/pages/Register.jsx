import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "../styles/icons/cookies.jpg";
import logo from "../styles/icons/logo.png";
import { Useinfo } from "../context/InfoContext";

function Register() {
  const { setUser, setInfoLogin } = Useinfo();
  const [checkPassword, setCheckPassword] = useState();
  const [formValue, setFormValue] = useState({
    firstname: "banana",
    lastname: "tikatika",
    pseudo: "",
    email: "",
    password: "",
    role: "user",
  });
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const createUser = async (credentials) => {
    try {
      const { newData } = await axios.post(
        `http://localhost:3310/api/users`,
        credentials
      );
      console.info(`this is : ${newData}`);
      // console.info(`this is the data : ${newData.data}`);
      const newCredentials = {
        email: credentials.email,
        password: credentials.password,
      };
      const { data } = await axios.post(
        `http://localhost:3310/api/login`,
        newCredentials
      );
      localStorage.setItem("token", data.token);
      const config = { headers: { Authorization: `Bearer ${data.token}` } };
      const result = await axios.get(
        `http://localhost:3310/api/users/me`,
        config
      );
      // eslint-disable-next-line no-alert
      setInfoLogin((prev) => !prev);
      setUser(result.data);
      console.info(result.data.role);
      if (result.data.role !== "admin") {
        return navigate("/");
      }
      return navigate("/admin");
    } catch (err) {
      console.error(err);
      setFormValue({
        firstname: "banana",
        lastname: "tikatika",
        pseudo: "",
        email: "",
        password: "",
        role: "user",
      });
    }
    return null;
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
          <div className="input">
            <input
              className="input-password"
              type="password"
              placeholder="Vérifier mot de passe"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
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
