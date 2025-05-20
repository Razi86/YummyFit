import { CustomError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Recipe from "../schemas/recipeSchema.js";

config();

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new CustomError("Authentication failed", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new CustomError("Authentication failed", 401));
  }
};

export const admin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({message:"Access denied. Admin only."});
  }
};

export const preventRecipeOwnerComment = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;
    console.log(recipeId, userId);
    const post = await Recipe.findById(recipeId);

    if (!post) {
      return next(new CustomError('Post not found', 404));
    }

    if (post.user.toString() === userId) {
      return next(new CustomError('You cannot review your own post', 403));
    }

    next();
  } catch (error) {
    console.error('Error in preventRecipeOwnerComment middleware:', error);
    next(new CustomError('Authorization failed', 500));
  }
};

// export const preventMultipleComments = async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const userId = req.user.id;

//     const existingReview = await Review.findOne({ post: postId, user: userId });

//     if (existingReview) {
//       return next(new CustomError('You have already reviewed this post', 403));
//     }

//     next();
//   } catch (error) {
//     console.error('Error in preventMultipleReviews middleware:', error);
//     next(new CustomError('Authorization failed', 500));
//   }
// };

// export const commentOwner = async (req, res, next) => {
//   try {
//     const reviewId = req.params.id;
//     const userId = req.user.id;

//     const review = await Review.findById(reviewId);
//     if (!review) {
//       return next(new CustomError('Review not found', 404));
//     }
//     if (review.user.toString() !== userId) {
//       return next(
//         new CustomError('Unauthorized: You do not own this review', 403)
//       );
//     }

//     next();
//   } catch (error) {
//     next(new CustomError('Authorization failed', 500));
//   }
// };
