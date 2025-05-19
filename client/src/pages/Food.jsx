import React, { useContext, useEffect, useState } from "react";
import { FoodContext } from "../context/foodContext";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import FoodImages from "../components/FoodImages";
import { useTranslation } from "react-i18next"; 

function Recipe() {
  const { food, setFood, searchedFood, loading, setLoading } =
    useContext(FoodContext);
  const [recipesToShow, setRecipesToShow] = useState(
    Array.isArray(searchedFood) && searchedFood.length > 0 ? searchedFood : food
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (Array.isArray(searchedFood) && searchedFood.length > 0) {
      setRecipesToShow(searchedFood);
    } else if (Array.isArray(food)) {
      setRecipesToShow(food);
    } else {
      setRecipesToShow([]);
    }
  }, [searchedFood, food]);

  useEffect(() => {
  }, [recipesToShow]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-start mt-[130px] pt-[5rem]">
      {!loading && (
        <>
          <div className="search-heading text-center mb-4">
            <h2 className="text-3xl mb-6 lato-black">
              {t("recipe.title_food")}
            </h2>
            <Search />
          </div>
          <div className="food-container w-full flex flex-wrap justify-center items-start gap-3 pt-6 p-4">
            {Array.isArray(recipesToShow) &&
              recipesToShow.map((item) =>
                item.image ? (
                  <Link to={`/food/${item._id}`} key={item._id}>
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
                  </Link>
                ) : null
              )}
          </div>
        </>
      )}
    </div>
  );
}
export default Recipe;
