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
    foodFilter,
    getData,
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
      {/* eslint-disable-next-line no-nested-ternary */}
      {inputSearchValue !== "" || foodDifficulty || foodFilter ? (
        getData.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: "3rem" }}>
            Oops, il n'y a pas de recette
          </div>
        ) : (
          <SearchedRecipes />
        )
      ) : (
        <Slides />
      )}
    </>
  );
}

export default App;
