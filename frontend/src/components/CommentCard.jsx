import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import undefinedUser from "../styles/icons/pfppr3-removebg-preview 2.png";

function CommentCard({ comment }) {
  const userId = parseInt(comment.user_id, 10);
  const [commentUser, setCommentUser] = useState("");

  const getCommenter = async (element) => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${element}/uploads`
    );
    setCommentUser(result.data);
  };

  useEffect(() => {
    getCommenter(userId);
  }, []);

  return (
    <div className="comment">
      <div className="comment-header">
        <img
          className="user-picture"
          src={
            commentUser.avatar
              ? `${import.meta.env.VITE_BACKEND_URL}/${commentUser.avatar}`
              : undefinedUser
          }
          alt="profil de l'utilisateur"
        />
        <div className="comment-title">
          <p className="commenter-name">{commentUser.pseudo}</p>
          <div className="date-heure-area">{comment.transformedDate}</div>
        </div>
      </div>
      <div className="comment-text">
        <p className="the-comment">{comment.comment}</p>
      </div>
    </div>
  );
}
CommentCard.propTypes = {
  comment: PropTypes.objectOf.isRequired,
};
export default CommentCard;
