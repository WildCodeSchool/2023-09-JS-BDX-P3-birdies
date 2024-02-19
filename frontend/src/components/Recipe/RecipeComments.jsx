import PropTypes from "prop-types";
import chevron from "../../styles/icons/chevron-down 2.png";
import CommentCard from "../CommentCard";
import { Useinfo } from "../../context/InfoContext";

function RecipeComments({ comments, toggleArea }) {
  const { showComments } = Useinfo();

  return (
    <div className="all-comments-area">
      <div className="all-comments-title">
        <h2>Commentaires</h2>
      </div>
      <div
        className={showComments ? "comments-bloc" : "comments-bloc inactive"}
      >
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </div>
      <div className="open-close-btn">
        <button className="chevron-btn" type="button" onClick={toggleArea}>
          <img className="chevron" src={chevron} alt="chevron" />
        </button>
      </div>
    </div>
  );
}

RecipeComments.propTypes = {
  comments: PropTypes.arrayOf.isRequired,
  toggleArea: PropTypes.func.isRequired,
};

export default RecipeComments;
