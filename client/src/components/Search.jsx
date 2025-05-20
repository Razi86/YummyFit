import React, { useContext, useState } from "react";
import { FoodContext } from "../context/foodContext";
import { useTranslation } from "react-i18next";

function Search() {
  const { t } = useTranslation();
  const { handleSearch, dishTypeList } = useContext(FoodContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);
  const [isDishTypeDropdownOpen, setIsDishTypeDropdownOpen] = useState(false);
  const [isSearchInputActive, setIsSearchInputActive] = useState(false);

  const cuisines = [
    "Italian",
    "Mexican",
    "Indian",
    "Chinese",
    "French",
    "Japanese",
    "African",
    "American",
  ];

  const handleSearchClick = () => {
    handleSearch(searchTerm, selectedType, selectedCuisine);
  };

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    setIsCuisineDropdownOpen(false);
  };

  const handleDishTypeSelect = (type) => {
    setSelectedType(type);
    setIsDishTypeDropdownOpen(false);
  };

  const toggleSearchTypeDropdown = () => {
    setIsSearchInputActive(!isSearchInputActive);
    if (!isSearchInputActive) {
      setIsDishTypeDropdownOpen(false);
      setIsCuisineDropdownOpen(false);
    }
  };

  const toggleDishTypeDropdown = () => {
    setIsDishTypeDropdownOpen(!isDishTypeDropdownOpen);
    if (!isDishTypeDropdownOpen) {
      setIsCuisineDropdownOpen(false);
      setIsSearchInputActive(false);
    }
  };

  const toggleCuisineDropdown = () => {
    setIsCuisineDropdownOpen(!isCuisineDropdownOpen);
    if (!isCuisineDropdownOpen) {
      setIsDishTypeDropdownOpen(false);
      setIsSearchInputActive(false);
    }
  };
  const handleReset = () => {
  setSearchTerm("");
  setSelectedType("");
  setSelectedCuisine("");
  handleSearch("", "", "");
};

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onClick={toggleSearchTypeDropdown}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`${t('search.placeholder_title')}`}
          className="w-[25rem] p-2 border rounded-md"
        />
           <button
            onClick={handleReset}
            className="px-8 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 cursor-pointer"
          >
            {t('search.reset_show_all')}
          </button>
                  <div className="relative">
          <div
            className="w-[10rem] p-2 border rounded-md bg-white cursor-pointer"
            onClick={toggleDishTypeDropdown}
          >
            {selectedType || "All Dish Types"}
          </div>
          {isDishTypeDropdownOpen && (
            <div className="absolute z-10 w-[20rem] capitalize bg-white border rounded-md shadow-md mt-1">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div
                  className={`p-2 text-center cursor-pointer rounded-md ${
                    !selectedType ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleDishTypeSelect("")}
                >
                  {t('search.all_dish_types')}
                </div>
                
                {dishTypeList.map((type) => (
                  <div
                    key={type.id}
                    className={`p-2 text-center cursor-pointer rounded-md ${
                      selectedType === type.title ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleDishTypeSelect(type.title)}
                  >
                    {type.title}
                  </div>
                ))}
              </div>
              
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="w-[10rem] p-2 border rounded-md bg-white cursor-pointer"
            onClick={toggleCuisineDropdown}
          >
            {selectedCuisine || "All Cuisines"}
          </div>
          {isCuisineDropdownOpen && (
            <div className="absolute z-10 w-[20rem] capitalize bg-white border rounded-md shadow-md mt-1">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div
                  className={`p-2 text-center cursor-pointer rounded-md ${
                    !selectedCuisine ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleCuisineSelect("")}
                >
                  {t('search.all_cuisines')}
                </div>
                {cuisines.map((cuisine) => (
                  <div
                    key={cuisine}
                    className={`p-2 text-center cursor-pointer rounded-md ${
                      selectedCuisine === cuisine.toLowerCase()
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleCuisineSelect(cuisine.toLowerCase())}
                  >
                    {cuisine}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSearchClick}
          className="px-8 py-2 bg-[#326C56] text-white rounded-md hover:bg-[#2a5546] cursor-pointer"
        >
          {t('search.search_button')}
        </button>
      </div>
    </div>
  );
}

export default Search;
