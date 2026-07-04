import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Commentfile.css";

const Comment = ({
  comment,
  addReply,
  deleteComment,
  toggleVisibility,
  visibleComments,
  currentUser,
  likeComment,
  dislikeComment,
  editComment,
  blogId,
  userData,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleReply = (e) => {
    e.preventDefault();
    addReply(comment._id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleDelete = () => {
    deleteComment(comment._id, blogId);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editComment(comment._id, editText);
    setIsEditing(false);
  };

  const handleLike = () => {
    likeComment(comment._id);
  };

  const handleDislike = () => {
    dislikeComment(comment._id);
  };

  const isVisible = visibleComments.includes(comment._id);
  const isOwner = currentUser === comment.name;
  const userHasLiked = comment.likedBy.includes(currentUser);
  const userHasDisliked = comment.dislikedBy.includes(currentUser);

  return (
    <div
      className={`Commentcomponent ${comment.parentId ? "NestedComment" : ""}`}
    >
      <div className="Userphoto">
        <img src={comment.photo} alt="" />
      </div>
      <div className="UserComments">
        <div className="Usercomment">
          <h3>{comment.name}</h3>
          {isEditing ? (
            <form onSubmit={handleEdit}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div>
                <button>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <span>{comment.text}</span>
          )}
        </div>
        <div className="Userreplylike">
          <span
            onClick={handleLike}
            style={{ color: userHasLiked ? "blue" : "grey" }}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
          </span>
          <span
            onClick={handleDislike}
            style={{ color: userHasDisliked ? "blue" : "grey" }}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> {comment.dislikes}
          </span>
          {!isOwner && (
            <span onClick={() => setShowReplyForm(!showReplyForm)}>Reply</span>
          )}
          {isOwner && (
            <>
              <span onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </>
          )}
          {comment.replies.length > 0 && (
            <span onClick={() => toggleVisibility(comment._id)}>
              {isVisible ? "Hide Replies" : "Show Replies"}
            </span>
          )}
        </div>
        {showReplyForm && (
          <div className="commentreplyfield">
            <textarea
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <div>
              <span onClick={() => setShowReplyForm(false)}>Cancel</span>
              <button onClick={handleReply}>Submit</button>
            </div>
          </div>
        )}
        {isVisible &&
          comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              addReply={addReply}
              deleteComment={deleteComment}
              toggleVisibility={toggleVisibility}
              visibleComments={visibleComments}
              currentUser={currentUser}
              likeComment={likeComment}
              dislikeComment={dislikeComment}
              editComment={editComment}
              blogId={blogId}
            />
          ))}
      </div>
    </div>
  );
};

const CommentFile = ({
  comments,
  addReply,
  deleteComment,
  currentUser,
  likeComment,
  dislikeComment,
  editComment,
  blogId,
  userData,
}) => {
  const [visibleComments, setVisibleComments] = useState([]);

  const toggleVisibility = (id) => {
    setVisibleComments((prevVisible) =>
      prevVisible.includes(id)
        ? prevVisible.filter((commentId) => commentId !== id)
        : [...prevVisible, id]
    );
  };

  return (
    <div className="Commentfile">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          addReply={addReply}
          deleteComment={deleteComment}
          toggleVisibility={toggleVisibility}
          visibleComments={visibleComments}
          currentUser={currentUser}
          likeComment={likeComment}
          dislikeComment={dislikeComment}
          editComment={editComment}
          blogId={blogId}
          userData={userData}
        />
      ))}
    </div>
  );
};

export default CommentFile;
