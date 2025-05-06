import { Router } from "express";
import {
  createRating,
  deleteRating,
  getUserRating,
} from "../controllers/ratingControllers.js";

const router = Router();

router.get("/:userId/:recipeId", getUserRating);
router.post("/", createRating);
router.delete("/:userId/:recipeId", deleteRating);

export default router;