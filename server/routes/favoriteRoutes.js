import { Router } from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favoriteController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", auth, getFavorites); 
router.post("/", auth, addFavorite); 
router.delete("/:recipeId", auth, removeFavorite);

export default router;