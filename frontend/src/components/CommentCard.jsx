import PropTypes from "prop-types";
import undefinedUser from "../styles/icons/pfppr3-removebg-preview 2.png";

function CommentCard({ comment }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <img className="user-picture" src={undefinedUser} alt="user" />
        <div className="comment-title">
          <p className="commenter-name">{comment.userName}</p>
          <div className="date-heure-area">{comment.messageDate}</div>
        </div>
      </div>
      <div className="comment-text">
        <p className="the-comment">{comment.message}</p>
      </div>
    </div>
  );
}
CommentCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comment: PropTypes.object.isRequired,
};
export default CommentCard;
