import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  // MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Useinfo } from "../../context/InfoContext";

function FavoriteRecipesList() {
  const { favoriteRecipesComplete } = Useinfo();
  function compareDates(a, b) {
    return b.recipe_id - a.recipe_id;
  }

  favoriteRecipesComplete.sort(compareDates);
  console.info(favoriteRecipesComplete);

  return (
    <div>
      {favoriteRecipesComplete?.map((recipe) => (
        <div className="recipe-container-show">
          <Link to={`/recipes/${recipe.recipe_id}`}>
            <MDBCard key={recipe.id} className="w-100 p-3">
              <MDBCardImage
                src={`${import.meta.env.VITE_BACKEND_URL}/${recipe?.url}`}
                position="top"
                alt="picture-recipe"
              />
              <MDBCardBody>
                <MDBCardTitle>{recipe?.name}</MDBCardTitle>
                {/* <MDBCardText>{recipe?.publicationDate}</MDBCardText> */}
                {/* <MDBBtn color="warning" href="#">
                x
              </MDBBtn> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipesList;
