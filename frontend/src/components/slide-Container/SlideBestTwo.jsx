import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Useinfo } from "../../context/InfoContext";
import star from "../../styles/icons/Star.png";

function SlideBestTwo() {
  const { getData } = Useinfo();
  const [apiBoites, setApiBoites] = useState([]);
  const [likeBoites, setLikeBoites] = useState(new Map());

  async function toogleFavorite(name) {
    likeBoites.set(name, likeBoites.has(name) ? !likeBoites.get(name) : true); // fonction favorite

    setLikeBoites(likeBoites);
    setApiBoites(apiBoites);
  }

  const [reload, setReload] = useState(false);

  useEffect(() => {}, [reload]);
  function onLike(name) {
    toogleFavorite(name);
    setReload(!reload);
  }
  return (
    <div className="slide-one-container">
      {getData
        .sort((a, b) => b.id - a.id)
        .slice(0, 5)
        .map((recipe) => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
            <div className="card-container">
              <div className="content-container">
                <h1>{recipe.name}</h1>
                <div className="note-container">
                  <img className="star-picture" src={star} alt="star-img" />
                  {/* <div className="average">{Average(recipe.notes)}/5</div> */}
                </div>
                {/* <div className="votes-container">
              <p id="votes-content">{recipe.notes.length} votes</p>
            </div> */}
              </div>
              {/* <img src={recipe.picture} alt={recipe.name} /> */}
              <div className="container-icon-recipe">
                <button
                  className="btn-like-box"
                  type="button"
                  onClick={() => onLike(recipe.name)}
                >
                  {likeBoites.get(recipe.name) ? "❤️" : "🤍"}
                </button>
                <span>{recipe.icon}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default SlideBestTwo;
