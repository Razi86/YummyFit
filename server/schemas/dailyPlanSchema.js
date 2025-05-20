import { Schema, model } from "mongoose";

const dailyPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    meals: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
          required: true,
        },
        mealType: {
          type: String,
          enum: ["breakfast", "lunch", "dinner", "snack"],
          required: true,
        }
      }
    ]
  },
  { timestamps: true }
);

export default model("DailyPlan", dailyPlanSchema);
