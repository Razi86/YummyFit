import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const FoodContext = createContext();

function FoodContextProvider({ children }) {
  const [food, setFood] = useState(() => {
    const localData = localStorage.getItem("foodData");
    return localData ? JSON.parse(localData) : [];
  });
  const [loading, setLoading] = useState(food.length === 0);
  const [error, setError] = useState(null);
  const dishTypeList=[
    {id:1,title:"main course",image:"https://img.freepik.com/free-photo/view-delicious-steak-dish_23-2150777651.jpg?t=st=1745934894~exp=1745938494~hmac=a093ade3a118330b137abbae5420a1d67813ddd849572b3e8b410d9aec8681d2&w=1800"},
    {id:2,title:"side dish",image:"https://img.freepik.com/free-photo/cheese-gratin_1157-21.jpg?t=st=1745935034~exp=1745938634~hmac=4477f19ea20c5de7af3be63643ec429d9ea78a476759101c2c6d9d8cfdf56b6f&w=1380"},
    {id:3,title:"dessert",image:"https://img.freepik.com/free-photo/brownie-chocolate-ice-cream-mint-sugar-powder-side-view_141793-15452.jpg?t=st=1745935086~exp=1745938686~hmac=1bc63ba8b720927923db35a4e8635f14a52c8b374eebef5c6ae4c0487f3bec6b&w=1380"},
    {id:4,title:"appetizer",image:"https://img.freepik.com/free-photo/antipasto-catering-platter-with-bacon-jerky-salami-cheese-grapes-wooden-table_2829-19732.jpg?t=st=1745935129~exp=1745938729~hmac=ee35c75b1178363bbe4f0ac7d3916564bed387d99533488908621390fec38030&w=996"},
    {id:5,title:"salad",image:"https://img.freepik.com/free-photo/dietary-salad-with-tomatoes-feta-lettuce-spinach-pine-nuts_2829-20128.jpg?t=st=1745935202~exp=1745938802~hmac=c366279cf8e2d8b37d11713e08f8373c9caec3ce93e2e1da8c193118f2afd434&w=1380"},
    {id:6,title:"soup",image:"https://img.freepik.com/free-photo/bowl-lentil-soup-garnished-with-lemon-slice_140725-6916.jpg?t=st=1746361487~exp=1746365087~hmac=3000e3b5e4d647a1a6e0da35734a0c17eeb641bf109f4915b152e199353a2108&w=1380"},
    {id:7,title:"breakfast",image:"https://img.freepik.com/free-photo/muesli-with-berries-coffee-tray_23-2147678791.jpg?t=st=1745934656~exp=1745938256~hmac=2e1915103eee282881e9a32c2207ae0730cbdf1e3d48347a46c49478826f08a9&w=900"},
    {id:8,title:"beverage",image:"https://img.freepik.com/free-photo/high-angle-mix-alcoholic-drinks_23-2148673763.jpg?t=st=1745935309~exp=1745938909~hmac=ed5a58745a3810432e102d7da11eef4100bf937432581940b74b2c50c665488e&w=1060"},
  ];
  const [foodByType,setFoodByType] = useState([]);

  // useEffect(() => {
  //   const fetchFood = async () => {
  //     try {
  //       const res = await axios.get(
  //         `https://api.spoonacular.com/recipes/random?apiKey=c2a5e3c185e0427cb448401a8f6653a2&number=50&includeNutrition=true`
  //       );
  //       console.log(res.data.recipes);
  //       setFood(res.data.recipes);
  //       localStorage.setItem("foodData", JSON.stringify(res.data.recipes));
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   fetchFood();
  // }, []);

  // const fetchFoodByType = (type) => {
  //   const foodListByType = food.filter((food) => food.dishTypes.includes(type));
  //   setFoodByType(foodListByType);
  // }

  return (
    <FoodContext.Provider value={{
      food,
      setFood,
      loading,
      error,
      dishTypeList,
      // fetchFoodByType,
      foodByType,
      }}>
      {children}
    </FoodContext.Provider>
  );
}

export default FoodContextProvider;