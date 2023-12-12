import { Link } from "react-router-dom";
import logo from "../styles/icons/logo 3.png";
import slidethree from "../styles/img/slideThree.png";

function SlideThree() {
  return (
    <div className="container-img">
      <img className="img-slide" src={slidethree} alt="Lasagne" />
      <div className="logo-container-slide">
        <img className="logo-slide" src={logo} alt="Logo" />
      </div>
      <div className="text-container-slide">
        <p>
          Swipez à gauche pour aimer et enregistrer en favoris les recettes ou à
          droite si vous avez des recommandations !
        </p>
      </div>
      <Link to="/login">
        <button className="btn" type="button">
          Accéder au site
        </button>
      </Link>
    </div>
  );
}

export default SlideThree;
