import "./styles/index.scss";
import Navigation from "./components/Navigation";
import Filter from "./components/Filter";
import Slides from "./components/Slides";
import { Useinfo } from "./context/InfoContext";
import SearchedRecipes from "./components/MainPage/SearchedRecipes";

function App() {
  const { inputSearchValue } = Useinfo();
  return (
    <>
      <Navigation />
      <Filter />
      {inputSearchValue === "" ? <Slides /> : <SearchedRecipes />}
    </>
  );
}

export default App;
