import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Useinfo } from "../../context/InfoContext";

function UserRecipesList() {
  const { userByRecipe } = Useinfo();

  return (
    <div>
      {userByRecipe?.map((recipe) => (
        <div className="user-recipe-container" key={recipe.name}>
          <MDBCard className="w-100 p-3">
            <MDBCardImage src={recipe?.picture} position="top" alt="..." />
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

export default UserRecipesList;
