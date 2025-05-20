import express from "express";
import { generateMealPlan, getLatestMealPlan } from "../controllers/mealPlanController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", auth, generateMealPlan);
router.get("/latest", auth, getLatestMealPlan);

export default router;