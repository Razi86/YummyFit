import { Schema, model } from "mongoose";
import User from "./userSchema.js";
import Recipe from "./recipeSchema.js";

const commentSchema = new Schema(
  {
    recipeId: {
      type: String,
      ref: "Recipe",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
