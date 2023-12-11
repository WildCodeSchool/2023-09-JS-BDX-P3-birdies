import "./styles/index.scss";
import Navigation from "./components/app/Navigation";
import Filter from "./components/app/Filter";
import Slides from "./components/app/Slides";

function App() {
  return (
    <>
      <Navigation />
      <Filter />
      <Slides />
    </>
  );
}

export default App;
