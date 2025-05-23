import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { ORIGIN_URL } from "../config";

const mealIcons = {
  breakfast: "🍳",
  lunch: "🥗",
  dinner: "🍽️",
  snack: "🍎",
  snacks: "🍪",
};

function renderMealPlan(planText) {
  if (!planText) return null;
  const lines = planText.split("\n").filter((line) => line.trim() !== "");
  return lines.map((line, idx) => {
    const lower = line.toLowerCase();
    let icon = null;
    if (lower.startsWith("breakfast")) icon = mealIcons.breakfast;
    else if (lower.startsWith("lunch")) icon = mealIcons.lunch;
    else if (lower.startsWith("dinner")) icon = mealIcons.dinner;
    else if (lower.startsWith("snack")) icon = mealIcons.snack;
    return (
      <div key={idx} className="flex items-start gap-2 mb-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <span>{line}</span>
      </div>
    );
  });
}

function splitPlanAndNote(mealPlan) {
  if (!mealPlan) return { plan: "", note: "" };
  const parts = mealPlan.split(/\n\s*\n/);
  if (parts.length === 1) {
    return { plan: parts[0], note: "" };
  }

  return {
    plan: parts.slice(0, -1).join("\n\n"),
    note: parts[parts.length - 1],
  };
}

function MealPlan() {
  const { user } = useContext(AuthContext);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMealPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user || !user.id) {
        throw new Error("User ID is missing");
      }
      const res = await axios.post(
        `${ORIGIN_URL}/meal-plans/generate`,
        { userId: user.id },
        { withCredentials: true }
      );
      setMealPlan(res.data.mealPlan.plan);
    } catch (error) {
      console.error(
        "Failed to generate meal plan:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to generate meal plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLatestMealPlan = async () => {
      try {
        const res = await axios.get(`${ORIGIN_URL}/meal-plans/latest`, {
          withCredentials: true,
        });
        setMealPlan(res.data.mealPlan.plan);
      } catch (err) {
        console.error("No meal plan found or error:", err);
      }
    };
    fetchLatestMealPlan();
  }, []);

  const { plan, note } = splitPlanAndNote(mealPlan);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#255140] mb-4">
        Generate Your Meal Plan
      </h2>
      <button
        onClick={generateMealPlan}
        disabled={loading}
        className={`btn px-4 py-2 rounded-md ${
          loading
            ? "bg-gray-400 text-white"
            : "bg-[#FFC649] text-white hover:bg-[#e5b93f]"
        }`}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* <h3 className="text-lg font-bold text-[#255140] mb-2">
            Your Meal Plan:
          </h3> */}
      {plan && (
        <div className="mt-6 border-2 border-[#326C56] rounded-lg p-4 bg-gray-50">
          <div className="text-gray-800">{renderMealPlan(plan)}</div>
        </div>
      )}

      {note && (
        <div className="mt-4 border-2 border-[#326C56] rounded-lg p-4 bg-gray-50">
          <h4 className="text-md font-semibold text-[#326C56] mb-2">Note:</h4>
          <div className="text-gray-700 whitespace-pre-line">{note}</div>
        </div>
      )}
    </div>
  );
}

export default MealPlan;
