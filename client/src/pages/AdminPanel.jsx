import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { UsersContext } from "../context/usersContext";
import { ORIGIN_URL } from "../config";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

function AdminPanel() {
  const { users } = useContext(UsersContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    image: null,
    ingredients: [{ title: "", quantity: "" }],
    steps: [""],
    calories: "",
    prep_time: "",
    cook_time: "",
    carbs: "",
    protein: "",
    fat: "",
    food_type: [],
    diets: [],
    cuisine_type: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRecipeData((prev) => ({ ...prev, image: file }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index][field] = value;
    setRecipeData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index] = value;
    setRecipeData((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { title: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const addStep = () => {
    setRecipeData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
  };

  const removeStep = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      if (recipeData.image instanceof File) {
        formData.append("image", recipeData.image);
      }
      formData.append("ingredients", JSON.stringify(recipeData.ingredients));
      formData.append("steps", JSON.stringify(recipeData.steps));
      formData.append("food_type", JSON.stringify(recipeData.food_type));
      formData.append("diets", JSON.stringify(recipeData.diets));
      formData.append("cuisine_type", JSON.stringify(recipeData.cuisine_type));

      for (const key of [
        "title",
        "description",
        "calories",
        "prep_time",
        "cook_time",
        "carbs",
        "protein",
        "fat",
      ]) {
        formData.append(key, recipeData[key]);
      }
      await axios.post(`${ORIGIN_URL}/recipes`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setRecipeData({
        title: "",
        description: "",
        image: null,
        ingredients: [{ title: "", quantity: "", image: "" }],
        steps: [""],
        calories: "",
        prep_time: "",
        cook_time: "",
        carbs: "",
        protein: "",
        fat: "",
        food_type: [],
        diets: [],
        cuisine_type: [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add recipe.");
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedIngredients = [...recipeData.ingredients];
      updatedIngredients[index].image = reader.result;
      setRecipeData((prev) => ({ ...prev, ingredients: updatedIngredients }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center min-h-screen w-full bg-base-100">
      <div className="flex w-full max-w-[1600px] min-h-screen">
        {/* Sidebar */}
        <aside className="w-[15rem] min-w-[15rem] bg-white border-r border-l border-[#255140] flex flex-col items-center py-25 px-4">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="avatar">
              <div className="w-20 h-20 rounded-full ring ring-[#255140] ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.image}
                  alt="Admin Profile"
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-sm italic capitalize">{user?.role}</p>
          </div>
          <div className="btns flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-2 w-full">
              <button
                className={`btn w-full ${
                  activeTab === "users"
                    ? "btn-active bg-[#FFC649] text-[#255140] border-none"
                    : "btn-ghost border-1 border-[#255140]"
                }`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
              <button
                className={`btn w-full ${
                  activeTab === "recipes"
                    ? "btn-active bg-[#FFC649] text-[#255140] border-none"
                    : "btn-ghost border-1 border-[#255140]"
                }`}
                onClick={() => setActiveTab("recipes")}
              >
                New Recipes
              </button>
            </div>
            <p>or</p>
            <div className="back-home-profile flex flex-col gap-2 w-full">
              <button
                onClick={() => navigate("/profile")}
                className="btn btn-outline w-full"
              >
                Back to Profile
              </button>
              <button
                onClick={() => navigate("/")}
                className="btn btn-outline w-full"
              >
                Back to Home
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-[calc(1600px-15rem)] min-h-[100vh] flex flex-col items-center justify-start bg-base-100">
          {activeTab === "users" && (
            <div className="w-full">
              <div className="card h-[100vh] rounded-none bg-white p-6 pt-20">
                <h2 className="text-4xl font-bold text-[#255140] mb-6">
                  Users
                </h2>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="table w-full border border-[#255140] mb-3">
                    <thead>
                      <tr className="text-[#255140] text-[1rem] tracking-[1px]">
                        <th className="border border-[#255140] py-4 px-4">
                          User Name
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Avatar
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          First Name
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Last Name
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          User Email
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Gender
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Age
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Activity Level
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Daily Calories
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Allergies
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Cuisine Preferences
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Diseases
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Target Weight
                        </th>
                        <th className="border border-[#255140] py-4 px-4">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="font-medium capitalize">
                          <td className="border border-[#255140]">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-full ring ring-[#255140] ring-offset-base-100 ring-offset-2">
                                <img
                                  src={user.image}
                                  alt="User Avatar"
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="border border-[#255140]">
                            {user.username}
                          </td>
                          <td className="border border-[#255140]">
                            {user.first_name}
                          </td>
                          <td className="border border-[#255140]">
                            {user.last_name}
                          </td>
                          <td className="border border-[#255140]">
                            {user.email}
                          </td>
                          <td className="border border-[#255140]">
                            {user.gender}
                          </td>
                          <td className="border border-[#255140]">
                            {user.age}
                          </td>
                          <td className="border border-[#255140]">
                            {user.activity_level}
                          </td>
                          <td className="border border-[#255140]">
                            {user.daily_calories} kcal
                          </td>
                          <td className="border border-[#255140]">
                            {user.allergies.length > 0
                              ? user.allergies.join(", ")
                              : "-"}
                          </td>
                          <td className="border border-[#255140]">
                            {user.cuisine_preferences.length > 0
                              ? user.cuisine_preferences.join(", ")
                              : "-"}
                          </td>
                          <td className="border border-[#255140]">
                            {user.disease.length > 0
                              ? user.disease.join(", ")
                              : "-"}
                          </td>
                          <td className="border border-[#255140]">
                            {user.target_weight} kg
                          </td>
                          <td className="border border-[#255140]">
                            {user.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "recipes" && (
            <div className="w-full">
              <div className="card h-[100vh] rounded-none bg-white p-8 pt-20">
                <h1 className="text-4xl font-bold text-[#255140] mb-8">
                  Add New Recipe
                </h1>
                <RecipeForm
                  recipeData={recipeData}
                  handleChange={handleChange}
                  handleImageChange={handleImageChange}
                  handleIngredientChange={handleIngredientChange}
                  handleIngredientImageChange={handleIngredientImageChange}
                  handleStepChange={handleStepChange}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
                  addStep={addStep}
                  removeStep={removeStep}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  onCancel={() => navigate("/profile")}
                />
                {error && (
                  <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    <p>{error}</p>
                  </div>
                )}
                {success && (
                  <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                    <p>Recipe added successfully!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
