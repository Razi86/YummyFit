import React from 'react';
import { Link } from "react-router-dom";
import AboutTacosImage from '../assets/images/aboutPage/about.png';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="w-11/12 md:w-3/4 flex flex-col md:flex-row items-center overflow-hidden rounded-lg">

        {/* Left Text Section */}
        
        <div className="flex-1 p-10">
          <h1 className="text-6xl font-light mb-6 text-green-600">Yummy Fit</h1>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            to live in <br />
            <span className="border-l-4 border-orange-500 pl-2">the future</span>
          </h1>
          <p className="mb-2 lato-regular text-lg pl-8">
            At YummyFit, we believe that eating healthy should be easy and enjoyable. That’s why we’ve built a platform that combines smart technology with thousands of delicious, nutritious recipes — all conveniently in one place.
          </p>
          <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-2">What We Offer</h2>
          <ul className="list-disc list-inside mb-4 mb-2 lato-regular text-lg pl-8">
            <li><strong>Personalized Meal Planning:</strong> Tailor-made meal plans based on your health goals, dietary preferences, allergies, and fitness level.</li>
            <li><strong>Smart Recipe Search:</strong> Discover healthy recipes using ingredients you already have.</li>
            <li><strong>Nutrition Tracking:</strong> Keep track of calories, macronutrients, and daily goals with our easy-to-use dashboard.</li>
            <li><strong>Grocery List Generator:</strong> Automatically generate your shopping list based on your daily/weekly meal plan.</li>
          </ul>
        
           <Link
            to="/register"
            className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600 transition inline-block text-center"
          >
            Register Now
          </Link>
      
        </div>
       
       

        {/* Right Image Section with White Triangle */}
        <div className="flex-1 relative flex items-center justify-center p-6 w-full aspect-[4/5]">
          <div
            className="w-full h-full rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${AboutTacosImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>


        {/* Decorative Dots Bottom Left */}
        <div className="absolute bottom-0 left-0 p-4 z-0">
          <div className="text-orange-400 text-4xl select-none">⋯⋯⋯⋯</div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
