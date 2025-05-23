import { Schema, model } from "mongoose";

const mealPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("MealPlan", mealPlanSchema);