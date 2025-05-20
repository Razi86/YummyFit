import React from "react";

function RecipeForm({
  recipeData,
  handleChange,
  handleImageChange,
  handleIngredientChange,
  handleIngredientImageChange,
  handleStepChange,
  addIngredient,
  addStep,
  removeIngredient,
  removeStep,
  handleSubmit,
  loading,
  onCancel,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Calories
          </label>
          <input
            type="number"
            name="calories"
            value={recipeData.calories}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            name="protein"
            value={recipeData.protein}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Carbs (g)
          </label>
          <input
            type="number"
            name="carbs"
            value={recipeData.carbs}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Fat (g)
          </label>
          <input
            type="number"
            name="fat"
            value={recipeData.fat}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Prep Time (minutes)
          </label>
          <input
            type="number"
            name="prep_time"
            value={recipeData.prep_time}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Cook Time (minutes)
          </label>
          <input
            type="number"
            name="cook_time"
            value={recipeData.cook_time}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Food Type
          </label>
          <input
            type="text"
            name="food_type"
            value={recipeData.food_type}
            onChange={handleChange}
            placeholder="e.g., Vegan, Vegetarian"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Diets
          </label>
          <input
            type="text"
            name="diets"
            value={recipeData.diets}
            onChange={handleChange}
            placeholder="e.g., Keto, Paleo"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Cuisine Type
          </label>
          <input
            type="text"
            name="cuisine_type"
            value={recipeData.cuisine_type}
            onChange={handleChange}
            placeholder="e.g., Italian, Indian"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-[#255140]">Ingredients</h3>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mt-2 items-center">
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.title}
              onChange={(e) =>
                handleIngredientChange(index, "title", e.target.value)
              }
              className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleIngredientImageChange(index, e.target.files[0])
              }
              className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="mt-2 text-sm text-[#255140] hover:underline"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-[#255140]">Steps</h3>
        {recipeData.steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4 mt-2">
            <textarea
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-[#FFC649] focus:ring-[#FFC649] px-4 py-2"
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="mt-2 text-sm text-[#255140] hover:underline"
        >
          + Add Step
        </button>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {/* <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-md bg-gray-400 text-white hover:bg-gray-500"
        >
          Cancel
        </button> */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-md cursor-pointer ${
            loading
              ? "bg-gray-400 text-white"
              : "bg-[#FFC649] text-white hover:bg-[#e5b93f]"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;