import React, { useState, useContext } from "react";
import { CommentContext } from "../context/commentContext";

function UpdateComment({ comment, onCancel }) {
  const { updateComment } = useContext(CommentContext);
  const [text, setText] = useState(comment.text);

  const handleUpdateComment = async () => {
    if (!text.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    await updateComment(comment._id, { text });
    onCancel();
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md w-full mx-auto mb-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded-md text-sm"
        placeholder="Update your comment..."
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 text-black rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateComment}
          className="px-3 py-1 bg-[#326C56] text-white rounded-md hover:bg-[#2a5546]"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdateComment;
