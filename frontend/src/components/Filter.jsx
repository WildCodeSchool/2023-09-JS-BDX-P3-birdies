import { useState } from "react";
import imgflower from "../styles/img/flower.png";
import blocFiltre from "../styles/icons/Bloc lien filtres.png";

function Filter() {
  const [foodFilter, setFoodFilter] = useState([]);
  const [displayFilter, setDisplayFilter] = useState(false);

  function filterListModify(e) {
    const targetedFilter = e.target.innerText;
    if (foodFilter.includes(targetedFilter)) {
      setFoodFilter(foodFilter.filter((spec) => spec !== targetedFilter));
    } else {
      setFoodFilter([...foodFilter, targetedFilter]);
    }
  }

  return (
    <>
      <div className="container-filter">
        <div className="scroll-bar">
          <button type="button" onClick={filterListModify}>
            Très facile
          </button>
          <button type="button" onClick={filterListModify}>
            Facile
          </button>
          <button type="button" onClick={filterListModify}>
            Moyen
          </button>
          <button type="button" onClick={filterListModify}>
            Difficile
          </button>
          <button type="button" onClick={filterListModify}>
            -30 minutes
          </button>
          <button type="button" onClick={filterListModify}>
            -1 heure
          </button>
        </div>
      </div>
      <div className="container-filter">
        <div className="scroll-bar">
          <button type="button" onClick={filterListModify}>
            Gourmand
          </button>
          <button type="button" onClick={filterListModify}>
            Santé
          </button>
          <button type="button" onClick={filterListModify}>
            Festif
          </button>
          <button type="button" onClick={filterListModify}>
            Sportif
          </button>
          <button type="button" onClick={filterListModify}>
            De saison
          </button>
          <button type="button" onClick={filterListModify}>
            BBQ
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
          <img className="flowerFiltre" src={imgflower} alt="" />
          <div className="container-filter-main">
            <div className="particularity-container">
              <h1>Particularités</h1>
              <button type="button" onClick={filterListModify}>
                Végétarien
              </button>
              <button type="button" onClick={filterListModify}>
                Sans lactose
              </button>
              <button type="button" onClick={filterListModify}>
                Végan
              </button>
              <button type="button" onClick={filterListModify}>
                Sans gluten
              </button>
            </div>
            <div className="meal-container">
              <h1>Repas</h1>
              <button type="button" onClick={filterListModify}>
                Entrée
              </button>
              <button type="button" onClick={filterListModify}>
                Snack
              </button>
              <button type="button" onClick={filterListModify}>
                Plat
              </button>
              <button type="button" onClick={filterListModify}>
                Dessert
              </button>
              <button type="button" onClick={filterListModify}>
                Boissons
              </button>
            </div>
            <div className="style-container">
              <h1>Style</h1>
              <button type="button" onClick={filterListModify}>
                Français
              </button>
              <button type="button" onClick={filterListModify}>
                Asiatique
              </button>
              <button type="button" onClick={filterListModify}>
                Méditerranéen
              </button>
              <button type="button" onClick={filterListModify}>
                Oriental
              </button>
              <button type="button" onClick={filterListModify}>
                Caribéen
              </button>
              <button type="button" onClick={filterListModify}>
                Hispanique
              </button>
              <button type="button" onClick={filterListModify}>
                USA
              </button>
              <button type="button" onClick={filterListModify}>
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
