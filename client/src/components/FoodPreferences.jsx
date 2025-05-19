import { useState, useContext, useEffect } from "react";
import vegetarian from "../assets/images/account-setup/diet-types/vegetarian.png";
import vegan from "../assets/images/account-setup/diet-types/vegan.png";
import paleo from "../assets/images/account-setup/diet-types/paleo.png";
import keto from "../assets/images/account-setup/diet-types/keto.png";
import glutenFree from "../assets/images/account-setup/diet-types/gluten-free.png";
import anything from "../assets/images/account-setup/diet-types/anything.png";
import axios from "axios";
import { ORIGIN_URL } from "../config";
import { AuthContext } from "../context/authContext";

function FoodPreferences() {
  const dietTypes = [
    {
      label: "anything",
      value: "anything",
      excludes: "Nothing",
      icon: anything,
    },
    {
      label: "vegetarian",
      value: "vegetarian",
      excludes: "Meat,poultry,Fish,Shellfish",
      icon: vegetarian,
    },
    {
      label: "vegan",
      value: "vegan",
      excludes: "All animal products (meat,fish,dairy,eggs,honey)",
      icon: vegan,
    },
    {
      label: "paleo",
      value: "paleo",
      excludes: "Diary,Grains,Legumes,Refined starches,Soy",
      icon: paleo,
    },
    {
      label: "keto",
      value: "keto",
      excludes: "High-carb grains,Sugars,Starches,Most fruits",
      icon: keto,
    },
    {
      label: "gluten-free",
      value: "gluten-free",
      excludes: "Gluten-containing graints (wheat,barley,rye,spelt)",
      icon: glutenFree,
    },
  ];

  const [selectedDiet, setSelectedDiet] = useState("");
  const { user, navigate, setError, setUser, setSessionCheckNeeded } =
    useContext(AuthContext);
  const userId = user?.id;

  const handleNext = async () => {
    try {
      const response = await axios.put(
        `${ORIGIN_URL}/users/${userId}`,
        {
          food_preferences: selectedDiet,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/account-setup/food-avoid");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the user data."
      );
    }
  };

  return (
    <div className="bg-[#f6f0ef]">
      <div className="food-preferences h-[100vh] flex flex-col justify-center items-center">
        <h2 className="font-bold text-4xl pt-[3%] mb-7 mr-[8%] pb-7">
          Which type of diet would you prefer?
        </h2>
        <ul>
          {dietTypes.map((type, index) => (
            <li key={index} className="">
              <label className="flex items-center gap-3 mb-6 cursor-pointer">
                <input
                  type="radio"
                  name="food_preferences"
                  checked={selectedDiet === type.value}
                  value={type.value}
                  onChange={() => setSelectedDiet(type.value)}
                />
                <div className="w-[65px] text-center">
                  <img
                    src={type.icon}
                    alt={type.label}
                    className=" h-[50px] object-cover inline"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{type.label}</h3>
                  <p className="text-lg text-gray-500">
                    Excludes: {type.excludes}
                  </p>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap flex-col justify-center items-center gap-[60%] mr-[10%] pt-7 text-lg">
          <button
            onClick={() => navigate(-1)}
            className="yummy-btn px-4 py-2 lato-black cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left pr-2"></i> Back
          </button>
          <button
            onClick={handleNext}
            className="yummy-btn px-4 py-2 lato-black cursor-pointer"
          >
            Next <i className="fa-solid fa-arrow-right pl-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodPreferences;
