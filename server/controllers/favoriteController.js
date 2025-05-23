import Favorite from "../schemas/favoriteSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/errorHandler.js";

export const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const favorites = await Favorite.find({ userId }).populate("recipeId");

  // if (!favorites || favorites.length === 0) {
  //   throw new CustomError("No favorites found", 404);
  // }

  res.status(200).json(favorites);
});

export const addFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;

  const existingFavorite = await Favorite.findOne({ userId, recipeId });
  if (existingFavorite) {
    throw new CustomError("Recipe already in favorites", 400);
  }

  const favorite = new Favorite({ userId, recipeId });
  await favorite.save();

  res.status(201).json({ message: "Recipe added to favorites", favorite });
});

export const removeFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  const favorite = await Favorite.findOne({ userId, recipeId });
  if (!favorite) {
    throw new CustomError("Favorite not found", 404);
  }

  await Favorite.deleteOne({ userId, recipeId });

  res.status(200).json({ message: "Recipe removed from favorites" });
});