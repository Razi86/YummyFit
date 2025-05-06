import { FoodContext } from "../context/foodContext"
import { useContext,useEffect } from "react"
import { useParams } from "react-router-dom"
import strawberry from "../assets/images/strawberries.png"

function RecipeDetail() {
    const { id } = useParams();
    const { food, loading} = useContext(FoodContext);
    const foodItem = food?.find(item => item.id === parseInt(id));

    const toFixed = (value) => {
        return Number(value).toFixed(1);
    }

    function cleanAndLimitHtml(htmlString, sentenceLimit = 6) {

        const sentences = htmlString.match(/[^.!?]+[.!?]/g) || [];
        const limitedSentences = sentences.slice(0, sentenceLimit).join(' ');
        return limitedSentences;
    }

    const proteinPercent = foodItem?.nutrition?.caloricBreakdown?.percentProtein || 0;
    const carbsPercent = foodItem?.nutrition?.caloricBreakdown?.percentCarbs || 0;
    const bg = `conic-gradient(
        #ef4444 0% ${carbsPercent}%,
        #3b82f6 ${carbsPercent}% ${carbsPercent + proteinPercent}%,
        #f59e0b ${carbsPercent + proteinPercent}% 100%
      )`;

    const starWidth = {width:`${(foodItem.spoonacularScore * 1.5).toFixed(0)}px`};
    
  return (
    <div>
        {loading && <p>Loading...</p>}
        <div className="recipe-image mt-13 mx-auto w-[70%] shadow-2xl rounded-xl relative">
            <img src={foodItem?.image} alt={foodItem?.title}
                 className="w-full h-[400px] object-cover rounded-xl" />
                {/* <img src={strawberry} alt="strawberry" className="absolute bottom-0 -left-[50px] h-[100px]" /> */}
        </div>
        <div className="recipe-details w-[90%] mx-auto flex-wrap flex justify-between items-center py-10">
            <div className="w-[60%] pr-15">
                <h1 className="text-4xl font-bold mb-7">{foodItem?.title}</h1>
                <div className="text-xl text-justify" dangerouslySetInnerHTML={{__html: cleanAndLimitHtml(foodItem?.summary) }} />
                <div className="food-types pt-5">
                    <ul className="list-none flex flex-wrap gap-3">
                        {foodItem?.dishTypes.map((type, index) => (
                            <li key={index} className="px-3 py-1 shadow-2xl rounded-2xl border-1 border-[#dae7e2] bg-white">{type}</li>
                        ))}

                    </ul>
                </div>
                <div className="recipe-rating flex items-center mt-7">
                <div className="stars bg-repeat-x w-[150px] h-[30px] relative
                    bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAxNCI+PHBhdGggZD0iTTEwLjU3NyAxMi45MzJsLS45NS00LjI4NiAzLjE5Ni0yLjkxNC00LjIwNS0uMzc2TDcgMS4zMzkgNS4zODIgNS4zNTZsLTQuMjA1LjM3NiAzLjE5NiAyLjkxNC0uOTUgNC4yODZMNyAxMC42NTlsMy41NzcgMi4yNzN6IiBzdHJva2U9IiNGREExMjAiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')]">
                        <span className="filled-star absolute left-0 top-0 h-[30px] min-w-[30px]
                         bg-[url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAxNCI+PHBhdGggZD0iTTcgMTEuMjUyTDExLjMyNiAxNGwtMS4xNDgtNS4xOEwxNCA1LjMzNWwtNS4wMzMtLjQ1TDcgMCA1LjAzMyA0Ljg4NSAwIDUuMzM1IDMuODIyIDguODIgMi42NzQgMTQgNyAxMS4yNTJ6IiBmaWxsPSIjRkRBMTIwIi8+PC9zdmc+')]" style={starWidth}></span>
                    </div>
                    
                </div>
                
            </div>
            <div className="recipe-nutritionInfo bg-white w-[40%] min-w-[440px] text-xl flex-wrap flex justify-between items-center shadow-xl p-6 border-2 border-[#333d25] rounded-xl">
                <div className="w-[50%] pr-2">
                    <div className="nutrition-detail flex flex-wrap justify-between items-center pb-2">
                        <h3><span className="text-xs">🔴</span> Net Carbs: </h3>
                        <p>
                            {toFixed(foodItem?.nutrition?.nutrients[4]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between text-[#888] pl-[20px] pb-2">
                        <h3>Fiber: </h3>
                        <p>
                        {toFixed(foodItem?.nutrition?.nutrients?.[21]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between text-[#888] pl-[20px] pb-2 border-b-1 border-b-[#b4b4b4]">
                        <h3>Total Carbs: </h3>
                        <p>
                        {toFixed(foodItem?.nutrition?.nutrients[4]?.amount + foodItem?.nutrition?.nutrients[21]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between border-b-1 border-b-[#b4b4b4] py-2">
                        <h3><span className="text-xs">🔵</span> Protein: </h3>
                        <p>
                            {toFixed(foodItem?.nutrition?.nutrients[10]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between pt-2">
                        <h3><span className="text-xs">🟡</span> Fats: </h3>
                        <p>
                            {toFixed(foodItem?.nutrition?.nutrients[1]?.amount)} g
                        </p>
                    </div>
                </div>
                
                <div className="recipe-chart">
                    <div className="w-40 h-40 rounded-full relative" style={{ background: bg }}>
                        <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-lg font-bold">{toFixed(foodItem?.nutrition?.nutrients[0]?.amount)}</div>
                                <div className="text-gray-500">cals</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="ingredients py-10 w-[90%] mx-auto">
            <h2 className="text-3xl font-bold mb-5">Ingredients</h2>
            <ul className="list-none pl-5 flex items-center gap-4 flex-wrap bg-white rounded-3xl shadow-2xl p-4">
                {foodItem?.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="mb-2 px-3 py-1 text-center max-w-[180px]">
                        <div className="text-[#333d25] font-bold">{ingredient.name}</div>
                        <div className="h-[105px] flex items-center justify-center">
                        <img src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`} 
                            alt={ingredient.name} className="inline-block" />
                        </div>
                        <div className="text-[#333d25] text-sm">{ingredient.amount} {ingredient.unit}</div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="recipe-steps w-[90%] mx-auto py-10">
            <h2 className="text-3xl font-bold mb-5">Cooking Steps</h2>
            <ul className="list-none flex flex-col gap-4">
                {foodItem?.analyzedInstructions[0]?.steps.map((step, index) => (
                    <li key={index} className="mb-2 p-4 rounded-xl bg-white shadow-2xl">
                        <div className="text-[#333d25] font-bold text-lg pb-2">Step {index + 1}</div>
                        <div className="text-[#333d25] text-center text-lg">{step.step}</div>
                    </li>
                ))}
            </ul>
        </div>
        
        
    </div>
  )
}

export default RecipeDetail