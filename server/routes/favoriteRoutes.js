import { Router } from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favoriteController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", auth, getFavorites); // Get all favorites for the authenticated user
router.post("/", auth, addFavorite); // Add a recipe to favorites
router.delete("/:recipeId", auth, removeFavorite); // Remove a recipe from favorites

export default router;