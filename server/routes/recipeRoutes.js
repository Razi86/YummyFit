import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getRecipes);
router.post("/",auth, createRecipe);
router.get("/:id",auth, getRecipeById);
router.put("/:id",auth, updateRecipe);
router.delete("/:id",auth, deleteRecipe);

export default router;
