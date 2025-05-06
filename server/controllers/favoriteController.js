import { CustomError } from "../utils/errorHandler.js";
import Favorite from "../schemas/favoriteSchema.js";
import Recipe from "../schemas/recipeSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all favorites for the authenticated user
export const getFavorites = asyncHandler(async (req, res) => {
    const userId = req.user.id;
  
    // Get all favorites for the user
    const favorites = await Favorite.find({ userId }).populate("recipeId");
  
    if (!favorites) {
      throw new CustomError("No favorites found", 404);
    }
  
    res.status(200).json(favorites);
  });

// Add a recipe to favorites
export const addFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;

  // Check if the recipe exists
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new CustomError("Recipe not found", 404);
  }

  // Check if the favorite already exists
  const existingFavorite = await Favorite.findOne({ userId, recipeId });
  if (existingFavorite) {
    throw new CustomError("Recipe already in favorites", 400);
  }

  // Create a new favorite
  const favorite = new Favorite({ userId, recipeId });
  await favorite.save();

  res.status(201).json({ message: "Recipe added to favorites" });
});

// Remove a recipe from favorites
export const removeFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  // Check if the favorite exists
  const favorite = await Favorite.findOne({ userId, recipeId });
  if (!favorite) {
    throw new CustomError("Favorite not found", 404);
  }

  // Remove the favorite
  await Favorite.deleteOne({ userId, recipeId });

  res.status(200).json({ message: "Recipe removed from favorites" });
});