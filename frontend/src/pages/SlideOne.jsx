import slideone from "../styles/img/slideOne.png";
import logo from "../styles/icons/logo 3.png";

function SlideOne() {
  return (
    <div className="container-img">
      <img className="img-slide" src={slideone} alt="Lasagne" />
      <div className="logo-container-slide">
        <img className="logo-slide" src={logo} alt="Logo" />
      </div>
      <div className="text-container-slide">
        <p>Sauvegardez vos recettes préférées et accédez-y rapidement !</p>
      </div>
    </div>
  );
}

export default SlideOne;
