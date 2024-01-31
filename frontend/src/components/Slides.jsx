import SlideBestOne from "./slide-Container/SlideBestOne";
import SlideBestThree from "./slide-Container/SlideBestThree";

function Slides() {
  return (
    <>
      <div className="slide-container">
        <p>Les petites nouvelles</p>
        <div>
          <div className="container-img">
            <SlideBestOne />
          </div>
        </div>
      </div>
      <div className="slide-container">
        <p>Les coups de coeur</p>
        <div>
          <div className="container-img">
            <SlideBestThree />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slides;
