import SlideBestOne from "./slide-Container/SlideBestOne";
import SlideBestTwo from "./slide-Container/SlideBestTwo";
import SlideBestThree from "./slide-Container/SlideBestThree";

function Slides() {
  return (
    <>
      <div className="slide-container">
        <p>Les mieux notées</p>
        <div>
          <div className="container-img">
            <SlideBestOne />
          </div>
        </div>
      </div>
      <div className="slide-container">
        <p>Les mieux notées</p>
        <div>
          <div className="container-img">
            <SlideBestTwo />
          </div>
        </div>
      </div>
      <div className="slide-container">
        <p>Les mieux notées</p>
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
