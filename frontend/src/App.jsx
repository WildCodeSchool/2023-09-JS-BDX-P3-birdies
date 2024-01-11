import "./styles/index.scss";
import { MDBAlert } from "mdb-react-ui-kit";
import Navigation from "./components/Navigation";
import Filter from "./components/Filter";
import Slides from "./components/Slides";
import { Useinfo } from "./context/InfoContext";
import SearchedRecipes from "./components/MainPage/SearchedRecipes";

function App() {
  const {
    inputSearchValue,
    basicSuccess,
    setBasicSuccess,
    infoSuccess,
    setInfoSuccess,
  } = Useinfo();

  return (
    <>
      <Navigation />
      <MDBAlert
        color="success"
        autohide
        position="top-right"
        delay={2000}
        appendToBody
        open={basicSuccess}
        onClose={() => setBasicSuccess(false)}
      >
        Votre recette à bien été ajoutée !
      </MDBAlert>

      <MDBAlert
        color="success"
        autohide
        position="top-right"
        delay={2000}
        appendToBody
        open={infoSuccess}
        onClose={() => setInfoSuccess(false)}
      >
        Votre recette à bien été modifiée !
      </MDBAlert>

      <Filter />
      {inputSearchValue === "" ? <Slides /> : <SearchedRecipes />}
    </>
  );
}

export default App;
