import Rating from "../schemas/ratingSchema.js";
import Recipe from "../schemas/recipeSchema.js";
import User from "../schemas/userSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/errorHandler.js";

export const getUserRating = asyncHandler(async (req, res) => {
  const { userId, recipeId } = req.params;
  const rating = await Rating.findOne({ userId, recipeId });
  if (!rating) {
    return res.status(404).json({ message: "Rating not found" });
  }
  return res.status(200).json(rating);
});

export const createRating = asyncHandler(async (req, res) => {
  const { userId, recipeId, rating } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new CustomError("Recipe not found", 404);
  }
  const existingRating = await Rating.findOne({ userId, recipeId });
  if (existingRating) {
    existingRating.rating = rating;
    await existingRating.save();
    return res.status(200).json({ message: "Rating updated successfully" });
  } else {
    const newRating = new Rating({ userId, recipeId, rating });
    await newRating.save();
    return res.status(201).json({ message: "Rating created successfully" });
  }
});

export const deleteRating = asyncHandler(async (req, res) => {
  const { userId, recipeId } = req.params;
  const rating = await Rating.findOneAndDelete({ userId, recipeId });
  if (!rating) {
    return res.status(404).json({ message: "Rating not found" });
  }
  return res.status(200).json({ message: "Rating deleted successfully" });
});
