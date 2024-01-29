// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Useinfo } from "../../context/InfoContext";
import star from "../../styles/icons/Star.png";

function SlideBestOne() {
  const { lastRecipes, favoriteRecipes, manageFavoriteRecipes } = Useinfo();

  // const [apiBoites, setApiBoites] = useState([]);
  // const [likeBoites, setLikeBoites] = useState(new Map());

  // async function toogleFavorite(name) {
  //   likeBoites.set(name, likeBoites.has(name) ? !likeBoites.get(name) : true); // fonction favorite

  //   setLikeBoites(likeBoites);
  // setApiBoites(apiBoites);
  // }

  return (
    <div className="slide-one-container">
      {(lastRecipes ?? []).map((recipe) => (
        <div className="slide-best-one-conatiner" key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>
            <div className="card-container">
              <div className="content-container">
                <h1>{recipe.name}</h1>
                <div className="note-container">
                  <img className="star-picture" src={star} alt="star-img" />
                  {/* <div className="average">{Average(recipe.notes)}/5</div> */}
                </div>
                {/* <div className="votes-container">
                <p id="votes-content">Date{recipe.publicationDate}</p>
              </div> */}
              </div>

              {/* <img src={} alt={recipe.name} /> */}
            </div>
          </Link>
          <div className="container-icon-recipe">
            <button
              className="btn-like-box"
              type="button"
              value={recipe.id}
              onClick={manageFavoriteRecipes}
            >
              {favoriteRecipes.includes(parseInt(recipe.id, 10)) ? "❤️" : "🤍"}
            </button>
            <span>{recipe.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlideBestOne;
