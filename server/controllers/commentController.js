import Comment from '../schemas/commentSchema.js';

import Recipe from '../schemas/recipeSchema.js';

import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get all comments for a specific recipe
export const getCommentsByRecipe = asyncHandler(async (req, res, next) => {
  const recipeId = req.params.recipeId;

  const comments = await Comment.find({ recipeId }).populate('userId', 'username email');

  if (!comments) {
    return next(new CustomError('Comments not found', 404));
  }

  const filteredComments = comments.filter((comment) => comment.userId);

  res.status(200).json(filteredComments);
});

// Get a single comment by ID
export const getCommentById = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate('userId', 'username email');
  if (!comment) {
    return next(new CustomError('Comment not found', 404));
  }
  res.status(200).json(comment);
});

// Create a new comment for a recipe
export const createComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const recipeId = req.params.recipeId;
  const userId = req.user.id;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return next(new CustomError('Recipe not found', 404));
  }

  let newComment = new Comment({
    text,
    userId,
    recipeId,
  });

  await newComment.save();

  newComment = await newComment.populate('userId', 'username email');

  res.status(201).json({
    text: newComment.text,
    _id: newComment._id,
    user: newComment.userId,
    recipe: recipeId,
    createdAt: newComment.createdAt,
    updatedAt: newComment.updatedAt,
  });
});

// Update a comment by ID
export const updateComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.id;
  const updates = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new CustomError('Comment not found', 404));
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, updates, {
    new: true,
    runValidators: true,
  }).populate('userId', 'username email');

  res.status(200).json(updatedComment);
});

// Delete a comment by ID
export const deleteComment = asyncHandler(async (req, res, next) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new CustomError('Comment not found', 404));
  }

  if (comment.userId.toString() !== userId) {
    return next(new CustomError('Not authorized to delete this comment', 403));
  }

  await Comment.findByIdAndDelete(commentId);
  res.status(204).json({ message: 'Comment deleted successfully' });
});
