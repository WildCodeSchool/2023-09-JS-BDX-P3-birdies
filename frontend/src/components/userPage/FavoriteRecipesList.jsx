import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Useinfo } from "../../context/InfoContext";

function FavoriteRecipesList() {
  const { favoriteRecipesComplete } = Useinfo();

  return (
    <div>
      {favoriteRecipesComplete?.map((recipe) => (
        <div className="recipe-container-show">
          <MDBCard key={recipe.id} className="w-100 p-3">
            <MDBCardImage
              src={recipe?.picture}
              position="top"
              alt="picture-recipe"
            />
            <MDBCardBody>
              <MDBCardTitle>{recipe?.name}</MDBCardTitle>
              <MDBCardText>{recipe?.publicationDate}</MDBCardText>
              {/* <MDBBtn color="warning" href="#">
                x
              </MDBBtn> */}
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipesList;
