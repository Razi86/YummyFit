import asynscHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/errorHandler.js";
import Recipe from "../schemas/recipeSchema.js";

export const getRecipes = asynscHandler(async(req,res) => {
    const recipes = await Recipe.find().populate("userId", "username email");

    if (!recipes)
        throw new CustomError("recipes not found", 404);

    res.status(200).json({recipes,user:req.user});
})

export const getRecipeById = asynscHandler(async(req,res) => {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId).populate("userId", "username email");

    if (!recipe)
        throw new CustomError("recipe not found", 404);

    res.status(200).json(recipe);
})

export const createRecipe = asynscHandler(async(req,res) => {
    const {title, description,image, ingredients,steps,calories,prep_time,cook_time} = req.body;
    const userId = req.user.id;

    const newRecipe = new Recipe({
        title,
        description,
        image,
        ingredients,
        steps,
        calories,
        prep_time,
        cook_time,
        userId
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
})

export const updateRecipe = asynscHandler(async(req,res) => {
    const recipeId = req.params.id;
    const update = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, update,
        {new: true}).populate("userId", "username email");

    if (!updatedRecipe)
        throw new CustomError("recipe not found", 404);

    res.status(200).json(updatedRecipe);
})

export const deleteRecipe = asynscHandler(async(req,res) => {
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe)
        throw new CustomError("recipe not found", 404);

    res.status(200).json({message: "recipe deleted successfully"});
})