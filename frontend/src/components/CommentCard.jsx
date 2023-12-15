import undefinedUser from "../styles/icons/pfppr3-removebg-preview 2.png";

function CommentCard() {
  return (
    <div className="comment">
      <div className="comment-header">
        <img className="user-picture" src={undefinedUser} alt="user" />
        <div className="comment-title">
          <p className="commenter-name">Firstname Lastname</p>
          <div className="date-heure-area">date heure</div>
        </div>
      </div>
      <div className="comment-text">
        <p className="the-comment">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum
          dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
