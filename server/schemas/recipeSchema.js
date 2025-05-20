import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png",
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    ingredients: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
          default:
            "https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png",
        },
      },
    ],
    carbs: {
      type: Number,
      required: true,
      min: 0,
    },
    protein: {
      type: Number,
      required: true,
      min: 0,
    },
    fat: {
      type: Number,
      required: true,
      min: 0,
    },
    steps: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    prep_time: {
      type: Number,
      // required: true,
      trim: true,
    },
    cook_time: {
      type: Number,
      // required: true,
      trim: true,
    },
    food_type: {
      type: [String],
      default: [],
    },
    diets: {
      type: [String],
      default: [],
    },
    cuisine_type: {
      type: [String],
      default: [],
    },
    // comments: [
    //   {
    //     userId: {
    //       type: Schema.Types.ObjectId,
    //       ref: "User",
    //       required: false,
    //     },
    //     text: {
    //       type: String,
    //       required: false,
    //       trim: true,
    //     },
    //     date: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
    // rating: {
    //   type: Number,
    //   default: 0,
    //   min: 0,
    //   max: 5,
    // },
  },
  { timestamps: true }
);

export default model("Recipe", recipeSchema);
