import { useState, useEffect, useRef } from "react";

import blocFiltre from "../styles/icons/Bloc lien filtres.png";
import FilterPage from "./FilterPage";

function Filter() {
  const [foodFilter, setFoodFilter] = useState([]);
  const [displayFilter, setDisplayFilter] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setDisplayFilter(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

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
        ref={menuRef}
      >
        <img src={blocFiltre} alt="Icon Filtre" />
      </button>
      {displayFilter && <FilterPage />}
    </>
  );
}

export default Filter;
