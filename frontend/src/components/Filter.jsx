import { useEffect } from "react";
import imgflower from "../styles/img/flower.png";
import blocFiltre from "../styles/icons/Bloc lien filtres.png";
import { Useinfo } from "../context/InfoContext";

function Filter() {
  const {
    difficultyListModify,
    filterListModify,
    displayFilter,
    setDisplayFilter,
    getData,
  } = Useinfo();
  const displayDifficult = (difficulty) => {
    getData.filter((filter) => filter.difficulty === difficulty);
    setDisplayFilter(displayFilter);
  };
  useEffect(() => {
    displayDifficult();
  }, []);
  return (
    <>
      <div className="container-filter">
        <div className="scroll-bar">
          <button
            className="button-filter"
            type="button"
            onClick={difficultyListModify}
          >
            Très facile
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={difficultyListModify}
          >
            Facile
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={difficultyListModify}
          >
            Moyen
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={difficultyListModify}
          >
            Difficile
          </button>
        </div>
      </div>
      <div className="container-filter">
        <div className="scroll-bar">
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            Gourmand
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            Santé
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            Festif
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            Sportif
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            De saison
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            BBQ
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            -30 minutes
          </button>
          <button
            className="button-filter"
            type="button"
            onClick={filterListModify}
          >
            -1 heure
          </button>
        </div>
      </div>
      <button
        className="boxFilter"
        type="button"
        onClick={() => setDisplayFilter(!displayFilter)}
      >
        <img src={blocFiltre} alt="Icon Filtre" />
      </button>
      {displayFilter && (
        <div className="container-filter-page">
          <img className="flowerFiltre" src={imgflower} alt="Flower" />
          <div className="container-filter-main" id="filter-main">
            <div className="particularity-container " id="particularity">
              <h1>Particularités</h1>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Végétarien
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Sans lactose
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Végan
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Sans gluten
              </button>
            </div>
            <div className="meal-container">
              <h1>Repas</h1>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Entrée
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Snack
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Plat
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Dessert
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Boissons
              </button>
            </div>
            <div className="style-container" id="style">
              <h1>Style</h1>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Français
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Asiatique
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Méditerranéen
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Oriental
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Caribéen
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Hispanique
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                USA
              </button>
              <button
                className="button-filter-page"
                type="button"
                onClick={filterListModify}
              >
                Québecois
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
