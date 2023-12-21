import { useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { register } from "swiper/element/bundle";
import slideone from "../../styles/img/slide1.jpg";
import slidetwo from "../../styles/img/slide2.jpg";
import slidethree from "../../styles/img/slide3.jpg";
import logo from "../../styles/icons/logo.png";
// import RecipeHeader from "../components/Recipe/RecipeHeader";
import "./_slideOne.scss";

register();

function SlideOne() {
  const swiperElRef = useRef(null);

  return (
    <div>
      <img className="logo-slide" src={logo} alt="" />
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
      >
        <swiper-slide className="slide-container-slideOne">
          <img src={slideone} alt="" />
          <p id="slide-text">
            Sauvegardez vos recettes préférées et accédez-y rapidement !
          </p>
        </swiper-slide>
        <swiper-slide>
          <img src={slidetwo} alt="" />
          <p id="slide-text">
            Découvrez de superbes recettes pour régaler votre famille et vos
            amis !
          </p>
        </swiper-slide>
        <swiper-slide>
          <img src={slidethree} alt="" />
          <p id="slide-text">
            Personnalisez votre profil pour une expérience unique.
          </p>
          <Link to="/">
            <button id="btn-access" type="button">
              ACCEDER AU SITE
            </button>
          </Link>
          <Link to="/login">
            <button id="btn-register" type="button">
              S'incrire
            </button>
          </Link>
        </swiper-slide>
      </swiper-container>
    </div>
  );
}

export default SlideOne;
