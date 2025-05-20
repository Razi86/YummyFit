import OpenAI from "openai";
import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/errorHandler.js";
import MealPlan from "../schemas/mealPlanSchema.js";
import User from "../schemas/userSchema.js";

export const generateMealPlan = asyncHandler(async (req, res) => {
  const { message } = req.body; 
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
  Create a daily meal plan for a user with the following details:
  - Age: ${user.age || "unknown"}
  - Gender: ${user.gender || "unknown"}
  - Weight: ${user.weight || "unknown"} kg
  - Height: ${user.height || "unknown"} cm
  - Activity Level: ${user.activity_level || "unknown"}
  - Target Calories: ${user.daily_calories || "unknown"} kcal
  - Food Preferences: ${user.food_preferences?.join(", ") || "none"}
  - Allergies: ${user.allergies?.join(", ") || "none"}
  - Cuisine Preferences: ${user.cuisine_preferences?.join(", ") || "none"}
  - Diseases: ${user.disease?.join(", ") || "none"}

  Provide a breakfast, lunch, dinner, and two snacks with approximate calorie counts for each meal.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  });

  const mealPlanContent = completion.choices[0].message.content;

  const newMealPlan = new MealPlan({
    userId: userId,
    plan: mealPlanContent,
  });

  await newMealPlan.save();
  res.json({ mealPlan: newMealPlan });
});

export const getLatestMealPlan = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const latestPlan = await MealPlan.findOne({ userId }).sort({ createdAt: -1 });
  if (!latestPlan) {
    throw new CustomError("No meal plan found", 404);
  }
  res.json({ mealPlan: latestPlan });
});

