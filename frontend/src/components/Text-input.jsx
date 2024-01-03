import { Useinfo } from "../context/InfoContext";

function TextInput() {
  const { handleChangeComment, recipeComment } = Useinfo();
  return (
    <textarea
      className="comment-input"
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="Votre commentaire"
      value={recipeComment}
      onChange={handleChangeComment}
    />
  );
}

export default TextInput;
