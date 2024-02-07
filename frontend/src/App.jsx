import "./styles/index.scss";
import { MDBAlert } from "mdb-react-ui-kit";
import Navigation from "./components/Navigation";
import Filter from "./components/Filter";
import Slides from "./components/Slides";
import { Useinfo } from "./context/InfoContext";
import SearchedRecipes from "./components/MainPage/SearchedRecipes";

function App() {
  const {
    user,
    inputSearchValue,
    basicSuccess,
    setBasicSuccess,
    infoSuccess,
    setInfoSuccess,
    infoLogin,
    setInfoLogin,
    foodDifficulty,
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
      <MDBAlert
        color="success"
        autohide
        position="top-right"
        delay={2000}
        appendToBody
        open={infoLogin}
        onClose={() => setInfoLogin(false)}
      >
        {`Bienvenue ${user.pseudo} !`}
      </MDBAlert>
      <Filter />
      {inputSearchValue !== "" || foodDifficulty ? (
        <SearchedRecipes />
      ) : (
        <Slides />
      )}{" "}
    </>
  );
}

export default App;
