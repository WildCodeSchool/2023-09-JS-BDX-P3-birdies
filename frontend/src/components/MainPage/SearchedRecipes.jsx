import TinderCard from "react-tinder-card";
import React, { useMemo, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Useinfo } from "../../context/InfoContext";
// import star from "../../styles/icons/Star.png";

function SearchedRecipes() {
  const { getData } = Useinfo();
  const [currentIndex, setCurrentIndex] = useState(getData.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for out of frame closure
  const currentIndexRef = useRef(currentIndex);
  console.info(lastDirection);

  const navigate = useNavigate();

  const childRefs = useMemo(
    () =>
      Array(getData.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < getData.length - 1;

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
    if (canSwipe && currentIndex < getData.length) {
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
        {/* <button
          type="button"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          J'aime !
        </button> */}
        <button
          type="button"
          style={{ backgroundColor: !canSwipe && "#c3c4d3", marginRight: 20 }}
          onClick={() => goBack()}
        >
          Précédent
        </button>
        <button
          type="button"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Suivant
        </button>
      </div>

      <div className="card-container">
        {getData.map((recipe, index) => (
          <TinderCard
            className="swipe"
            ref={childRefs[index]}
            key={recipe.id}
            onSwipe={(dir) => swiped(dir, recipe.name, index)}
            onCardLeftScreen={() => outOfFrame(recipe.name, index)}
          >
            <div className="card">
              <button
                type="button"
                className="pressable"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                Voir
              </button>
              <h3>{recipe.name}</h3>
              <div className="rate-container">
                <div className="stars">
                  {/* <img src={star} alt="star-img" /> */}
                  {/* <div>{Average(recipe.notes)}/5</div> */}
                </div>
                {/* <div className="votes">
                  <p>{recipe.notes.length} votes</p>
                </div> */}
              </div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${recipe.url}`}
                alt="recipe-img"
              />
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default SearchedRecipes;
