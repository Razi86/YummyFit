import { CustomError } from "../utils/errorHandler.js";
import Food from "../schemas/foodSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find();

  if (!foods) throw new CustomError("foods not found", 404);

  res.status(200).json({ foods, user: req.user });
});

export const getFoodById = asyncHandler(async (req, res) => {
  const foodId = req.params.id;

  const food = await Food.findById(foodId);

  if (!food) throw new CustomError("food not found", 404);

  res.status(200).json(food);
});

export const createFood = asyncHandler(async (req, res) => {
  const { name, serving_size, calories, protein, carbs, fat } = req.body;

  const food = new Food({
    name,
    serving_size,
    calories,
    protein,
    carbs,
    fat,
  });

    await food.save();

  res.status(201).json(food);
});

export const updateFood = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  const update = req.body;

  const updatedFood = await Food.findByIdAndUpdate(
    foodId,
    update,
    { new: true }
  );

    if (!updatedFood) throw new CustomError("food not found", 404);

    res.status(200).json(updatedFood);
});

export const deleteFood = asyncHandler(async (req, res) => {
  const foodId = req.params.id;

  const food = await Food.findByIdAndDelete(foodId);

  if (!food) throw new CustomError("food not found", 404);

  res.status(204).json({ message: "Food deleted successfully" });
});
