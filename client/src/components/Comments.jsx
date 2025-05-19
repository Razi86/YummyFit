import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../context/commentContext.jsx";
import { AuthContext } from "../context/authContext.jsx";
import AddCommentForm from "./AddCommentForm.jsx";
import UpdateCommentForm from "./UpdateComments.jsx";

function Comments() {
  const { comments, fetchComments, error, setError } =
    useContext(CommentContext);
  const { user, sessionLoading } = useContext(AuthContext);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      await fetchComments();
      setCommentsLoading(false);
    };

    if (user) {
      loadComments();
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  if (sessionLoading || commentsLoading) {
    return <div>Yükleniyor...</div>;
  }

  const isUserComment = (commentUserId) => {
    if (!user || !commentUserId) return false;
    const commentId =
      typeof commentUserId === "object" ? commentUserId._id : commentUserId;
    const userId = user._id || user.id;
    return commentId?.toString() === userId?.toString();
  };

  return (
    <div className="w-[70%] flex flex-col justify-center items-center gap-2">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      {error && (
        <p className="w-full text-center text-white bg-red-400 font-medium text-[1rem] tracking-[1px] py-3 mb-4 rounded-[5px]">
          {error}
        </p>
      )}
      {comments.map((comment) =>
        editingCommentId === comment._id ? (
          <UpdateCommentForm
            key={comment._id}
            comment={comment}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div
            key={comment._id}
            className="w-full bg-white p-5 px-8 rounded-lg shadow-md mb-1"
          >
            <figure className="flex items-center gap-2 mb-2">
              <img
                src={comment.userId?.image}
                alt={comment.userId?.username || "User"}
                className="w-[3rem] h-[3rem] rounded-full object-cover"
              />
            </figure>
            <p>{new Date(comment.updatedAt).toLocaleString()}</p>
            <p>
              <strong>{comment.userId?.username}:</strong> {comment.text}
            </p>
            <div className="flex justify-end gap-2 mt-2">
              {isUserComment(comment.userId) && (
                <button
                  onClick={() => handleEdit(comment._id)}
                  className="px-6 py-1.5 bg-[#FFC649] text-white rounded-md hover:bg-[#e5b53d] cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )
      )}
      <AddCommentForm />
    </div>
  );
}

export default Comments;
