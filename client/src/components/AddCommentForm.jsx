import React, { useState, useContext } from "react";
import { CommentContext } from "../context/commentContext";

function AddCommentForm() {
  const { addComment, recipeId } = useContext(CommentContext);
  const [text, setText] = useState("");

  const handleAddComment = async () => {
    if (!text.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const newComment = { text, recipeId: recipeId };
    await addComment(newComment);
    setText("");
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md mt-4 w-full mx-auto mb-10">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[8rem] p-2 border border-[#326C56] rounded-md text-sm text-[#326C56]"
        placeholder="Write your comment here..."
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={handleAddComment}
          className="px-3 py-1 bg-[#326C56] text-white rounded-md hover:bg-gray-100 transition-all duration-300 cursor-pointer"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default AddCommentForm;
