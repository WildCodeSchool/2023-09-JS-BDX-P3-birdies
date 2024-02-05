// import { Useinfo } from "../../context/InfoContext";

// function FilterBar() {
// const { cathegories, chosenFilters, setChosenFilters } = Useinfo();

// const handleChangeFilter = (e) => {
//   console.info(typeof e.target.value, e.target.value);
//   if (chosenFilters.includes(e.target.value)) {
//     setChosenFilters(
//       chosenFilters.filter((filter) => filter !== e.target.value)
//     );
//   } else {
//     setChosenFilters([...chosenFilters, e.target.value]);
//   }
// };

// return;
// <div className="tags">
//   <h5>Tags :</h5>
//   <div className="tags-container">
//     {cathegories.map((filter) => (
//       <button
//         type="button"
//         key={filter.name}
//         value={filter.id}
//         className={
//           chosenFilters.includes(filter.id)
//             ? "filter-button clicked"
//             : "filter-button"
//         }
//         onClick={handleChangeFilter}
//       >
//         {filter.name}
//       </button>
//     ))}
//   </div>
// </div>
// }

// export default FilterBar;
