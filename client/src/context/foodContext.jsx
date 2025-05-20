import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

export const FoodContext = createContext();

function FoodContextProvider({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(() => {
    const localData = localStorage.getItem("foodData");
    return localData ? JSON.parse(localData) : [];
  });
  const [searchedFood, setSearchedFood] = useState([]);
  const [loading, setLoading] = useState(food.length === 0);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const dishTypeList = [
    {
      id: 1,
      title: "main course",
      image:
        "https://img.freepik.com/free-photo/view-delicious-steak-dish_23-2150777651.jpg?t=st=1745934894~exp=1745938494~hmac=a093ade3a118330b137abbae5420a1d67813ddd849572b3e8b410d9aec8681d2&w=1800",
    },
    {
      id: 2,
      title: "side dish",
      image:
        "https://img.freepik.com/free-photo/cheese-gratin_1157-21.jpg?t=st=1745935034~exp=1745938634~hmac=4477f19ea20c5de7af3be63643ec429d9ea78a476759101c2c6d9d8cfdf56b6f&w=1380",
    },
    {
      id: 3,
      title: "dessert",
      image:
        "https://img.freepik.com/free-photo/brownie-chocolate-ice-cream-mint-sugar-powder-side-view_141793-15452.jpg?t=st=1745935086~exp=1745938686~hmac=1bc63ba8b720927923db35a4e8635f14a52c8b374eebef5c6ae4c0487f3bec6b&w=1380",
    },
    {
      id: 4,
      title: "appetizer",
      image:
        "https://img.freepik.com/free-photo/antipasto-catering-platter-with-bacon-jerky-salami-cheese-grapes-wooden-table_2829-19732.jpg?t=st=1745935129~exp=1745938729~hmac=ee35c75b1178363bbe4f0ac7d3916564bed387d99533488908621390fec38030&w=996",
    },
    {
      id: 5,
      title: "salad",
      image:
        "https://img.freepik.com/free-photo/dietary-salad-with-tomatoes-feta-lettuce-spinach-pine-nuts_2829-20128.jpg?t=st=1745935202~exp=1745938802~hmac=c366279cf8e2d8b37d11713e08f8373c9caec3ce93e2e1da8c193118f2afd434&w=1380",
    },
    {
      id: 6,
      title: "soup",
      image:
        "https://img.freepik.com/free-photo/bowl-lentil-soup-garnished-with-lemon-slice_140725-6916.jpg?t=st=1746361487~exp=1746365087~hmac=3000e3b5e4d647a1a6e0da35734a0c17eeb641bf109f4915b152e199353a2108&w=1380",
    },
    {
      id: 7,
      title: "breakfast",
      image:
        "https://img.freepik.com/free-photo/muesli-with-berries-coffee-tray_23-2147678791.jpg?t=st=1745934656~exp=1745938256~hmac=2e1915103eee282881e9a32c2207ae0730cbdf1e3d48347a46c49478826f08a9&w=900",
    },
    {
      id: 8,
      title: "beverage",
      image:
        "https://img.freepik.com/free-photo/high-angle-mix-alcoholic-drinks_23-2148673763.jpg?t=st=1745935309~exp=1745938909~hmac=ed5a58745a3810432e102d7da11eef4100bf937432581940b74b2c50c665488e&w=1060",
    },
  ];
  const [foodByType, setFoodByType] = useState([]);

const fetchFavorites = async () => {
  try {
    const res = await axios.get(`${ORIGIN_URL}/favorites`, {
      withCredentials: true,
    });
    const userFavorites = res.data.filter(fav => 
      fav.userId._id === user?._id || fav.userId === user?._id
    );
    setFavorites(userFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    setError(error.response?.data?.message || error.message);
  }
};

  const addFavorite = async (recipeId) => {
    if (!user) {
      alert("Please login to add favorites");
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${ORIGIN_URL}/favorites`,
        { recipeId },
        {
          withCredentials: true,
        }
      );
      await fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  const removeFavorite = async (recipeId) => {
  try {
    await axios.delete(`${ORIGIN_URL}/favorites/${recipeId}`, {
      withCredentials: true,
    });
    setFavorites(prev => prev.filter(fav => 
      fav.recipeId._id !== recipeId && fav.recipeId !== recipeId
    ));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};

  useEffect(() => {
    fetchFood();
    fetchFavorites();
  }, []);

  const handleSearch = (search, type = "", cuisine = "") => {
    const searchedFoodList = food.filter((foodItem) => {
      const matchesTitle = foodItem.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = type
        ? foodItem.food_type?.includes(type.toLowerCase())
        : true;
      const matchesCuisine = cuisine
        ? Array.isArray(foodItem.cuisine_type)
          ? foodItem.cuisine_type.some(
              (c) => c.toLowerCase() === cuisine.toLowerCase()
            )
          : foodItem.cuisine_type?.toLowerCase() === cuisine.toLowerCase()
        : true;

      return matchesTitle && matchesType && matchesCuisine;
    });
    console.log(searchedFoodList);
    setSearchedFood(searchedFoodList);
  };

  useEffect(() => {
    // const storeFood = async () => {
    //   try {
    //     const res = await axios.get(
    //       `https://api.spoonacular.com/recipes/random?apiKey=bd9b91146d2b4cdb859194b8e0ceb149&number=10&includeNutrition=true`
    //     );
    //     const spoonacularData = res.data.recipes;
    //     await Promise.all(
    //       spoonacularData.map(async (item) => {
    //         try {
    //           await axios.post(`${ORIGIN_URL}/recipes`, {
    //             title: item.title,
    //             description:item.summary,
    //             image: item.image,
    //             ingredients: item.extendedIngredients.map((ingredient) => ({
    //               title: ingredient.name,
    //               quantity: ingredient.amount + " " + ingredient.unit,
    //               image: ingredient.image,
    //             })),
    //             carbs: item.nutrition.nutrients[3].amount,
    //             protein: item.nutrition.nutrients[10].amount,
    //             fat: item.nutrition.nutrients[1].amount,
    //             steps: item.analyzedInstructions[0].steps.map((step) => step.step),
    //             calories: item.nutrition.nutrients[0].amount,
    //             prep_time: item.preparationMinutes,
    //             cook_time: item.readyInMinutes,
    //             food_type: item.dishTypes,
    //             diets: item.diets,
    //             cuisine_type: item.cuisines,
    //          } );
    //         } catch (error) {
    //           setError(error.message);
    //         }
    //       }))
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    fetchFood();
    // storeFood();
  }, []);
  const fetchFood = async () => {
    try {
      const res = await axios.get(`${ORIGIN_URL}/recipes`);
      setFood(res.data.recipes);
      localStorage.removeItem("foodData");
      localStorage.setItem("foodData", JSON.stringify(res.data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        food,
        setFood,
        loading,
        setLoading,
        error,
        dishTypeList,
        // fetchFoodByType,
        foodByType,
        searchedFood,
        setSearchedFood,
        handleSearch,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}
export default FoodContextProvider;
