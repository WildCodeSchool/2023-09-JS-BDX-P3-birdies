import TinderCard from "react-tinder-card";
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Useinfo } from "../../context/InfoContext";
import star from "../../styles/icons/Star.png";

function SearchedRecipes() {
  const { getDataName } = Useinfo();
  const [currentIndex, setCurrentIndex] = useState(getDataName.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for out of frame closure
  const currentIndexRef = useRef(currentIndex);
  console.info(lastDirection);
  const childRefs = useMemo(
    () =>
      Array(getDataName.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < getDataName.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.info(`${name} (${idx}) left the screen !`, currentIndexRef.current);
    // handle the case in wich go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < getDataName.length) {
      await childRefs[currentIndex].current.swipe(dir); // swipe the card !
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  return (
    <div className="swipe-container">
      <div className="buttons">
        <button
          type="button"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          J'aime !
        </button>
        <button
          type="button"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Oops !
        </button>
        <button
          type="button"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Bof...
        </button>
      </div>

      <div className="card-container">
        {getDataName.map((recipe, index) => (
          <TinderCard
            className="swipe"
            ref={childRefs[index]}
            key={recipe.name}
            onSwipe={(dir) => swiped(dir, recipe.name, index)}
            onCardLeftScreen={() => outOfFrame(recipe.name, index)}
          >
            <div
              className="card"
              // style={{
              //   backgroundImage: `url(${recipe.picture})`,
              //   height: "500px",
              //   width: "60vw",
              //   borderRadius: "20px",
              //   position: "relative",
              // }}
            >
              <Link className="pressable" to={`/recipes/${recipe.id}`}>
                Voir
              </Link>
              <h3>{recipe.name}</h3>
              <div className="rate-container">
                <div className="stars">
                  <img src={star} alt="star-img" />
                  {/* <div>{Average(recipe.notes)}/5</div> */}
                </div>
                {/* <div className="votes">
                  <p>{recipe.notes.length} votes</p>
                </div> */}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default SearchedRecipes;
