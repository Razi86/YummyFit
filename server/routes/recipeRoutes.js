import express from "express";
import multer from "multer";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import { auth, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getRecipes);
router.post("/", auth, admin, upload.single("image"), createRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;