import logo from "../styles/icons/logo 3.png";
import slidetwo from "../styles/img/slideTwo.png";

function SlideTwo() {
  return (
    <div className="container-img">
      <img className="img-slide" src={slidetwo} alt="Lasagne" />
      <div className="logo-container-slide">
        <img className="text-slide" src={logo} alt="Logo" />
      </div>
      <div className="text-container-slide">
        <p>
          Découvrez de superbes recettes pour régaler votre famille et vos amis
          !
        </p>
      </div>
    </div>
  );
}

export default SlideTwo;
