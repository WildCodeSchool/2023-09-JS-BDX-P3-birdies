import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Useinfo } from "../../context/InfoContext";
import logo from "../../styles/icons/logo.svg";
import pen from "../../styles/icons/edit-pen-icon.svg";

function UserRecipesList() {
  const { userByRecipe } = Useinfo();
  return (
    <div>
      {userByRecipe?.map((recipe) => (
        <div className="user-recipe-container" key={recipe.id}>
          <Link
            style={{ width: "20px" }}
            to={`/modifyrecipes/${recipe.id}/`}
            className="link-to"
          >
            <img
              style={{ width: "20px" }}
              src={pen}
              alt="lien vers modification"
            />
          </Link>
          <Link to={`/recipes/${recipe.id}`}>
            <MDBCard id="card" className="w-100 p-3">
              <MDBCardImage
                src={
                  recipe.url === null
                    ? logo
                    : `${import.meta.env.VITE_BACKEND_URL}/${recipe.url}`
                }
                position="top"
                alt="..."
              />
              <MDBCardBody>
                <MDBCardTitle>{recipe?.name}</MDBCardTitle>
                <MDBCardText>{recipe?.publicationDate}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserRecipesList;
