import React, { useContext } from "react";
import { FoodContext } from "../context/foodContext";
import { Link, useParams } from "react-router-dom";

function FoodType() {
  const { type } = useParams(); // e.g., /food/dessert → type = "dessert"
  const { food, loading } = useContext(FoodContext);

  const filteredFood = food?.filter((item) =>
    item.food_type?.some(
      (dish) =>
        dish.toLowerCase().replace(/\s/g, "") === type.toLowerCase().replace(/\s/g, "")
    )
  );

  function cleanAndLimitHtml(htmlString, sentenceLimit = 6) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    const sentences = plainText.match(/[^.!?]+[.!?]/g) || [];
    return sentences.slice(0, sentenceLimit).join(" ").trim();
  }

  const getNutrient = (nutrients, name) => {
    const nutrient = nutrients.find((n) => n.name === name);
    return nutrient ? `${Math.round(nutrient.amount)}${nutrient.unit}` : "N/A";
  };

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}min`;
    if (h > 0) return `${h}h`;
    return `${m}min`;
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-start mt-[120px] pt-8">
      <h2 className="text-3xl lato-black mb-6 text-center pt-9">
        All {type} category
      </h2>

      <div className="food-container w-full min-h-[100vh] flex flex-wrap justify-center items-center gap-4 p-4">
        {loading && <p>Loading...</p>}

        {!loading && filteredFood?.length === 0 && (
          <p className="text-center text-lg text-gray-500">No recipes found.</p>
        )}

        {!loading &&
          filteredFood?.map((item) => {
            const nutrients = item.nutrition?.nutrients;

            const calories = nutrients
              ? getNutrient(nutrients, "Calories")
              : item.calories
              ? `${Math.round(item.calories)} kcal`
              : "N/A";

            const protein = nutrients
              ? getNutrient(nutrients, "Protein")
              : item.protein
              ? `${Math.round(item.protein)} g`
              : "N/A";

            const fat = nutrients
              ? getNutrient(nutrients, "Fat")
              : item.fat
              ? `${Math.round(item.fat)} g`
              : "N/A";

            const carbs = nutrients
              ? getNutrient(nutrients, "Carbohydrates")
              : item.carbs
              ? `${Math.round(item.carbs)} g`
              : "N/A";

            const cookingTime = formatTime(item.readyInMinutes || item.cook_time || 0);

            return (
              <Link
                to={`/food/${item.id || item._id}`}
                key={item.id || item._id}
                className="card w-96 h-[450px] flex flex-col shadow-sm hover:shadow-md transition duration-200"
              >
                <figure className="w-full h-[150px] overflow-hidden">
                  <img
                    className="w-full h-full transition-transform duration-300 hover:scale-110 object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                </figure>

                <div className="card-body w-full flex flex-col justify-between p-4 bg-white">
                  <h2 className="card-title text-[#333d25]">{item.title}</h2>
                  <p className="text-[#333d25] text-sm">
                    {cleanAndLimitHtml(item.summary || item.description || "", 4)}
                  </p>

                  <div className="flex justify-between items-center mt-2 text-sm text-gray-700 font-semibold">
                    <div className="relative group">
                      ⏱️ {cookingTime}
                      <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {cookingTime} Cooking time
                      </span>
                    </div>
                    <div className="relative group">
                      🔥 {calories}
                      <span className="absolute bottom-full mb-1 hidden group-hover:block bg-yellow-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {calories} Calories
                      </span>
                    </div>
                    <div className="relative group">
                      🔴 {carbs}
                      <span className="absolute bottom-full mb-1 hidden group-hover:block bg-red-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {carbs} Net Carbs
                      </span>
                    </div>
                    <div className="relative group">
                      🔵 {protein}
                      <span className="absolute bottom-full mb-1 hidden group-hover:block bg-blue-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {protein} Protein
                      </span>
                    </div>
                    <div className="relative group">
                      🟡 {fat}
                      <span className="absolute bottom-full mb-1 hidden group-hover:block bg-yellow-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {fat} Fat
                      </span>
                    </div>
                  </div>

                  <div className="card-actions flex justify-end items-center gap-1">
                    <div className="text-[1rem] text-[#333d25] font-normal underline tracking-[.5px] border-none px-5 py-4">
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default FoodType;
