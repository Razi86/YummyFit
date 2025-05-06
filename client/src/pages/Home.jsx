import { NavLink,Link } from "react-router-dom"
import Slider from "../components/Slider"
import { useContext } from "react"
import { FoodContext } from "../context/foodContext"


function Home() {
  const { food, loading, dishTypeList } = useContext(FoodContext);
  const foodList = food?.slice(0, 15); // Get the first 15 food items

  return (
    <>
      <main>
        {loading && <p>Loading...</p>}
        <div>
          <div className="absolute right-0 top-0 food-image-home w-[50%] max-w-[700px] h-[600px]"></div>
            <div className="w-[50%] text-right px-9">
              <h1 className="text-6xl lato-black mb-2 mt-5">
                Fewer Calories <br /> And More
                <br /> Benefit
              </h1>
              <h2 className="text-2xl lato-bold mb-2">
                Your smart companion on the journey <br /> to healthy living and
                delicious nutrition.
              </h2>
              <p className="mb-2 lato-regular text-lg pl-8">
                At YummyFit, we believe that eating well shouldn’t be a challenge!
                <br />
                it should be a pleasure. <br />
                That’s why we’ve created a platform that brings together smart
                technology, expert-backed nutrition advice, and thousands of
                healthy, mouth-watering recipes, all in one place.
              </p>
              <div className="flex justify-end mt-4">
                <NavLink
                  to={"/login"}
                  className="yummy-btn cursor-pointer hover:bg-[#45a049] px-6 py-2 mt-4 lato-bold text-lg"
                >
                  Get Started
                </NavLink>
                <NavLink
                  to={"/about"}
                  className="yummy-btn cursor-pointer hover:bg-[#e53935] px-6 py-2 mt-4 lato-bold text-lg ml-20"
                >
                  Learn More
                </NavLink>
              </div>
            </div>
            <div className="devider w-[50%] mx-auto h-[1px] bg-[#333d25] mt-18"></div>
        </div>

        <div className="foodType-slider w-[90%] mx-auto py-15">
  <h2 className="text-3xl mb-1 lato-black">Browse By Food Type</h2>
  <p className="mb-6">
    If you are looking for a specific type of food, you can browse by food type.
    <br />
    We have a wide variety of food types to choose from.
  </p>

  {/* Assuming dishTypeList is an array like [{ title: 'lunch' }, { title: 'dinner' }, ...] */}
  <Slider foodList={dishTypeList} />

</div>

        <div className="devider w-[50%] mx-auto h-[1px] bg-[#333d25] mt-5"></div>

        <div className="newFood-slider w-[90%] mx-auto py-15">
          <h2 className="text-3xl mb-1 lato-black">The newest Recipes</h2>
          <p className="mb-6">
            Discover the latest and greatest recipes to tantalize your taste
            buds.
          </p>
          <Slider foodList={foodList} />
        </div>

        <div className="devider w-[50%] mx-auto h-[1px] bg-[#333d25] mt-5"></div>
      </main>
    </>
  );
}

export default Home;
