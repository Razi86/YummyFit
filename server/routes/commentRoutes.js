import express from "express";
import {
  getCommentsByRecipe,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import {
  auth,
  // preventMultipleComments,
  // preventRecipeOwnerComment,
  // commentOwner,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all comments for a specific recipe
router.get("/recipe/:recipeId", getCommentsByRecipe);

// Create a comment for a specific recipe
router.post(
  "/recipe/:recipeId",
  auth,
  // preventRecipeOwnerComment,
  // preventMultipleComments,
  createComment
);

// Get a single comment by ID
router.get("/:id", auth, getCommentById);

// Update a comment
router.put("/:id", auth, updateComment);

// Delete a comment
router.delete("/:id", auth, deleteComment);

export default router;
