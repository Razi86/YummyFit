import React, { useContext } from "react";
import { FoodContext } from "../context/foodContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"

function FoodType() {
  const { type } = useParams(); // must match route param: /food/:type
  console.log("type:", type);
  const { food, loading, dishTypeList, error } = useContext(FoodContext);
  const filteredFood = food?.filter((item) =>
    item.dishTypes?.some((dish) => dish.toLowerCase() === type.toLowerCase())
  );


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
    <div>

     <h2 className="text-3xl lato-black mb-4 text-center  ">All {type} category</h2>
      <div className="food-container w-full min-h-[100vh] flex flex-wrap justify-center items-center gap-4 p-4">


        {loading && <p>Loading...</p>}
        {filteredFood?.map((item) => {
          const nutrients = item.nutrition?.nutrients || [];
          const calories = getNutrient(nutrients, "Calories");
          const protein = getNutrient(nutrients, "Protein");
          const fat = getNutrient(nutrients, "Fat");
          const carbs = getNutrient(nutrients, "Carbohydrates");
          const cookingTime = formatTime(item.readyInMinutes);

          return (
            <Link to={`/food/${item.id}`} key={item.id} className="card w-96 h-auto shadow-sm hover:shadow-md transition duration-200">
              <figure className="h-1/2 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={item.image}
                  alt={item.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#333d25]">{item.title}</h2>
                <p className="text-[#333d25]">
                  {item.summary.length > 100
                    ? `${item.summary.substring(0, 100)}...`
                    : item.summary}
                </p>

                {/* Nutrition Info */}
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

                <div className="card-actions flex justify-end items-center gap-1 mt-4">
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
