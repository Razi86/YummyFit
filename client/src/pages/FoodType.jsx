import React, { useContext,useState,useEffect } from "react";
import { FoodContext } from "../context/foodContext";
import { Link, useParams } from "react-router-dom";
import FoodImages from "../components/FoodImages";
import { useTranslation } from "react-i18next";

function FoodType() {
  const { type } = useParams(); // e.g., /food/dessert → type = "dessert"
  const { food, loading } = useContext(FoodContext);
  const [recipesToShow, setRecipesToShow] = useState(food);
  const { t } = useTranslation();

  const foodByType = (foodType) =>{
    const filteredFood= food?.filter((item) => {
      if (item.food_type && Array.isArray(item.food_type)) {
        return item.food_type.includes(foodType);
      }
      return false;
    });
    setRecipesToShow(filteredFood);
  }

  useEffect(() => {
    foodByType(type);
  }, [type, food]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-start mt-[130px]">
      <h2 className="text-3xl lato-black mb-6 text-center pt-9">
        All {type} recipes
      </h2>

      <div className="food-container w-full flex flex-wrap justify-center items-start gap-3 pt-6 p-4">
        {loading && <p>Loading...</p>}

        {!loading && recipesToShow?.length == 0 && (
          <p className="text-center text-lg text-gray-500">No recipes found.</p>
        )}
          {!loading && recipesToShow?.map((item) => {
                return (<Link to={`/food/${item._id}`} key={item._id}>
                  <div className="card w-96 h-[420px] shadow-sm">
                    <FoodImages item={item} />
                    <div className="card-body px-4">
                      <h2 className="card-title text-[#333d25]">
                        {item.title.length > 35
                          ? `${item.title.substring(0, 35)}...`
                          : item.title}
                      </h2>
                      <span className="text-[#333d25] text-justify">
                        {item.description?.length > 100 ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: `${item.description.substring(
                                0,
                                210
                              )}...`,
                            }}
                          />
                        ) : (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        )}
                      </span>
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-700 font-semibold">
                        <div className="relative group">
                          ⏱️ {item.cook_time} {t("recipe.cook_time_short")}
                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {item.cook_time} {t("recipe.cook_time_full")}
                          </span>
                        </div>
                        <div className="relative group">
                          🔥 {Math.round(item.calories)}{" "}
                          {t("recipe.calories_short")}
                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-yellow-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {Math.round(item.calories)}{" "}
                            {t("recipe.calories_full")}
                          </span>
                        </div>
                        <div className="relative group">
                          🔴 {Math.round(item.carbs)}{" "}
                          {t("recipe.carbs_short")}
                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-red-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {Math.round(item.carbs)} {t("recipe.carbs_full")}
                          </span>
                        </div>
                        <div className="relative group">
                          🔵 {Math.round(item.protein)}{" "}
                          {t("recipe.protein_short")}
                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-blue-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {item.protein} {t("recipe.protein_full")}
                          </span>
                        </div>
                        <div className="relative group">
                          🟡 {Math.round(item.fat)} {t("recipe.fat_short")}
                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-yellow-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {item.fat} {t("recipe.fat_full")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>)
            })}
      </div>
    </div>
  );
}

export default FoodType;
