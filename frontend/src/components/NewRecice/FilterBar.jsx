import PropTypes from "prop-types";

function FilterBar({ chosenFilters, setChosenFilters }) {
  const handleChangeFilter = (e) => {
    if (chosenFilters.includes(e.target.value)) {
      setChosenFilters(
        chosenFilters.filter((filter) => filter !== e.target.value)
      );
    } else {
      setChosenFilters([...chosenFilters, e.target.value]);
    }
  };
  const filtersSelection = [
    { name: "-30minutes" },
    { name: "-1heure" },
    { name: "Gourmand" },
    { name: "Santé" },
    { name: "Festif" },
    { name: "Sportif" },
    { name: "De saison" },
    { name: "BBQ" },
  ];
  return (
    <div className="tags">
      <h5>Tags :</h5>
      <div className="tags-container">
        {filtersSelection.map((filter) => (
          <button
            type="button"
            key={filter.name}
            value={filter.name}
            className={
              chosenFilters.includes(filter.name)
                ? "filter-button clicked"
                : "filter-button"
            }
            onClick={handleChangeFilter}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}
FilterBar.propTypes = {
  chosenFilters: PropTypes.arrayOf.isRequired,
  setChosenFilters: PropTypes.func.isRequired,
};

export default FilterBar;
