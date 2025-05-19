import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";

export const CommentContext = createContext();

function CommentContextProvider({ children, recipeId }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  console.log("comments", comments);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${ORIGIN_URL}/comments/recipe/${recipeId}`, {
        withCredentials: true,
      });
      setComments(res.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch comments. Please try again.");
    }
  };

  const addComment = async (newComment) => {
    console.log("newComment", newComment);
    try {
      const res = await axios.post(
        `${ORIGIN_URL}/comments/recipe/${recipeId}`,
        newComment,
        {
          withCredentials: true,
        }
      );
      setComments((prevComments) => [res.data, ...prevComments]);
      console.log("res.data", res.data);
      setError(null);
    } catch (error) {
      setError("You have already commented on this recipe!");
    }
  };

  const updateComment = async (commentId, updates) => {
    try {
      const res = await axios.put(
        `${ORIGIN_URL}/comments/${commentId}`,
        updates,
        {
          withCredentials: true,
        }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? res.data : comment
        )
      );
      setError(null);
    } catch (error) {
      setError("Failed to update comment. Please try again.");
    }
  };

  return (
    <div>
      <CommentContext.Provider
        value={{
          fetchComments,
          addComment,
          recipeId,
          comments,
          setComments,
          error,
          setError,
          navigate,
          updateComment,
        }}
      >
        {children}
      </CommentContext.Provider>
    </div>
  );
}

export default CommentContextProvider;
