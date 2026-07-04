import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
import CommentFile from "./Commentfile";

function Commentpage({ onFocus, blogId, userData, setUserData }) {
  const [comments, setComments] = useState([]);
  const [addcomment, setAddcomment] = useState("");
  const currentUser = localStorage.getItem("Username");
  const commentInputRef = useRef(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `https://codru-server.vercel.app/comments/${blogId}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsondata = await res.json();
      setComments(jsondata);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  useEffect(() => {
    if (onFocus && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [onFocus]);

  useEffect(() => {
    const updateUserPhoto = async () => {
      try {
        const res = await fetch(
          "https://codru-server.vercel.app/updateUserPhoto",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: localStorage.getItem("Username"),
              newPhoto: userData.Photo,
            }),
          }
        );

        if (res.ok) {
          console.log("updated");
        } else {
          console.log("Failed to update user photo in blogs and comments");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    updateUserPhoto();
  }, [userData.Photo, userData, setUserData]);

  const Addcomment = async () => {
    try {
      const res = await fetch("https://codru-server.vercel.app/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: blogId,
          Username: currentUser,
          Photo: userData.Photo,
          text: addcomment,
        }),
      });

      if (res.ok) {
        setAddcomment("");
        fetchComments();
      } else {
        console.log("Failed to add the comment");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const Clearcomment = () => {
    setAddcomment("");
  };

  const addReply = async (commentId, replyText) => {
    try {
      const res = await fetch("https://codru-server.vercel.app/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: blogId,
          Username: currentUser,
          Photo: userData.Photo,
          text: replyText,
          parentId: commentId,
        }),
      });

      if (res.ok) {
        fetchComments();
      } else {
        console.log("Failed to add the reply");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const deleteComment = async (commentId, blogId) => {
    try {
      const res = await fetch(
        `https://codru-server.vercel.app/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogId }), // Sending blogId in the body
        }
      );

      if (res.ok) {
        fetchComments();
      } else {
        console.log("Failed to delete the comment");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const likeComment = async (commentId) => {
    try {
      const res = await fetch("https://codru-server.vercel.app/comments/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, commentId, username: currentUser }),
      });

      if (res.ok) {
        fetchComments();
      } else {
        console.log("Failed to like the comment");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const dislikeComment = async (commentId) => {
    try {
      const res = await fetch(
        "https://codru-server.vercel.app/comments/dislike",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId, commentId, username: currentUser }),
        }
      );

      if (res.ok) {
        fetchComments();
      } else {
        console.log("Failed to dislike the comment");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const editComment = async (commentId, newText) => {
    try {
      const res = await fetch("https://codru-server.vercel.app/comments/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, commentId, newText }),
      });

      if (res.ok) {
        fetchComments();
      } else {
        console.log("Failed to edit the comment");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="commentpagemaindiv">
      <div className="commentpagemaindivdiv1">
        <div>
          <img src={userData.Photo} alt="" />
          <input
            type="text"
            value={addcomment}
            onChange={(e) => setAddcomment(e.target.value)}
            placeholder="Add a comment"
          />
        </div>

        {addcomment.length > 0 && (
          <div className="addcommentbtndiv">
            <button onClick={Clearcomment}>Clear</button>
            <button onClick={Addcomment}>Submit</button>
          </div>
        )}
      </div>
      <CommentFile
        comments={comments}
        addReply={addReply}
        deleteComment={deleteComment}
        currentUser={currentUser}
        likeComment={likeComment}
        dislikeComment={dislikeComment}
        editComment={editComment}
        blogId={blogId}
        userData={userData}
      />
    </div>
  );
}

export default Commentpage;
