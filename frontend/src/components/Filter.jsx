import { useState } from "react";

import blocFiltre from "../styles/icons/Bloc lien filtres.png";
import FilterPage from "./FilterPage";

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
  console.info(foodFilter);
  // const veryEasy =  [
  //   {
  //     name: "salade",
  //     img: "https://tse1.mm.bing.net/th?id=OIP.-4IT7-YxVYgn9blc4EUGBwHaFj&pid=Api&P=0&h=180",
  //     note: 6.7,
  //   },
  //   {
  //     name: "salade césar",
  //     img: "https://tse3.mm.bing.net/th?id=OIP.JcnzN8g7HNkwlXsBuWgwfAHaE7&pid=Api&P=0&h=180",
  //     "note": 8,
  //   },
  //   {
  //     "name": "salade niçoise",
  //     "img": "https://tse2.mm.bing.net/th?id=OIP.l_3XrxYx9gilx7QwGSUecQHaHa&pid=Api&P=0&h=180",
  //     "note": 5.8,
  //   },
  // ];

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
        <img className="" src={blocFiltre} alt="Icon Filtre" />
      </button>
      {displayFilter && <FilterPage />}
    </>
  );
}

export default Filter;
