import { useParams } from "react-router-dom";

function Recipe() {
  const { id } = useParams();
  return (
    <div>
      <p>Recette numéro {id}</p>
    </div>
  );
}

export default Recipe;
