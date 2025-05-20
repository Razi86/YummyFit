import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { FoodContext } from "../context/foodContext";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import MealPlan from "../components/MealPlan";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "../i18n";

function Profile() {
  const { t } = useTranslation();
  const { favorites, removeFavorite } = useContext(FoodContext);
  const [showFavorites, setShowFavorites] = useState(false);
  const { user, handleLogout, sessionLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    first_name,
    last_name,
    email,
    image,
    role,
    username,
    age,
    gender,
    height,
    weight,
    target_weight,
    target_weight_change,
    daily_calories,
    activity_level,
    allergies,
    food_preferences,
    cuisine_preferences,
    disease,
  } = user || {};

  const translateGender = (gender) => {
    if (!gender) return t("profile.not_available");
    return t(`profile.gender_options.${gender.toLowerCase()}`) || gender;
  };

  // const translateActivityLevel = (level) => {
  //   if (!level) return t("profile.not_available");
  //   const key = level.toLowerCase().replace(" ", "_");
  //   return t(`profile.activity_levels.${key}`) || level;
  // };

  if (sessionLoading) {
    return <div className="loading">{t("navbar.loading")}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#255140] via-[#FFC649] to-[#255140] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-[#255140] text-white flex flex-col items-center p-6">
            <button
              onClick={() => setShowFavorites(true)}
              className="mt-4 text-sm flex items-center gap-2 text-[#FFC649] text-[1rem] font-medium hover:underline cursor-pointer"
            >
              {t("profile.view_favorites")}
            </button>
            <div className="avatar mb-4 mt-15">
              <div className="w-28 h-28 rounded-full ring ring-[#FFC649] ring-offset-4">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">
                    <span className="text-4xl font-bold">
                      {username?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold">{username}</h2>
            <p className="text-sm italic mt-1">
              {t("profile.role")}: {role}
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-sm flex items-center gap-2 text-[#FFC649] text-[1rem] font-medium hover:underline cursor-pointer"
            >
              <IoReturnUpBack className="text-lg" />
              {t("profile.go_home")}
            </button>
            <div className="mt-10 flex flex-col items-center gap-2">
              <div className="edit-logout flex items-center justify-center gap-2">
                <button
                  className="btn bg-[#FFC649] text-white hover:bg-[#e5b93f] px-6 py-2 rounded-md"
                  onClick={() => navigate("/edit-profile")}
                >
                  {t("profile.edit_profile")}
                </button>
                <button
                  className="btn border border-[#FFC649] text-[#FFC649] hover:bg-[#FFC649] hover:text-white px-6 py-2 rounded-md"
                  onClick={handleLogout}
                >
                  {t("profile.logout")}
                </button>
              </div>
              {role === "admin" && (
                <div className="w-full flex justify-center">
                  <button
                    className="btn w-full bg-transparent text-white border-white hover:bg-white hover:text-[#255140] px-6 py-2 rounded-md"
                    onClick={() => navigate("/admin")}
                  >
                    {t("profile.admin_panel")}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 p-6">
            <h2 className="text-xl font-bold text-[#255140] mb-4">
              {t("profile.profile_details")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileDetail
                label={t("profile.full_name")}
                value={`${first_name} ${last_name}`}
              />
              <ProfileDetail label={t("profile.email")} value={email} />
              <ProfileDetail label={t("profile.age")} value={!age ? `-` : age} />
              <ProfileDetail
                label={t("profile.gender")}
                value={translateGender(gender)}
              />
              <ProfileDetail
                label={t("profile.weight")}
                value={`${!weight ? `-` : weight} kg`}
              />
              <ProfileDetail
                label={t("profile.height")}
                value={`${!height ? `-` : height} cm`}
              />
              <ProfileDetail
                label={t("profile.target_weight")}
                value={`${!target_weight ? `-` : target_weight} kg`}
              />
              <ProfileDetail
                label={t("profile.target_weight_change")}
                value={`${target_weight_change} (1 Week)`}
              />
              <ProfileDetail
                label={t("profile.daily_calories")}
                value={`${!daily_calories ? `-` : daily_calories} kcal`}
              />
              <ProfileDetail label="Activity Level" value={activity_level} />
              <ProfileDetail
                label={t("profile.food_preferences")}
                value={food_preferences?.length == 0 ? `-` : food_preferences?.join(", ")}
              />
              <ProfileDetail
                label={t("profile.allergies")}
                value={allergies?.length > 0 ? allergies?.join(", ") : `-`}
              />
              <ProfileDetail
                label={t("profile.cuisine_preferences")}
                value={
                  cuisine_preferences?.length > 0
                    ? cuisine_preferences?.join(", ")
                    : `-`
                }
              />
              <ProfileDetail
                label={t("profile.diseases")}
                value={disease?.length > 0 ? disease?.join(", ") : `-`}
              />
            </div>
          </div>
        </div>
      </div>

      {showFavorites && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white py-20 px-6 rounded-lg shadow-lg w-[90%] max-w-3xl min-h-[60%] overflow-auto max-h-[100vh] relative">
            {/* <h2 className="text-2xl font-bold mb-4">
              {t("profile.your_favorites")}
            </h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites?.length > 0 ? (
                <>
                  {favorites.map((fav) => (
                    <div
                      key={fav.recipeId._id}
                      className="card w-full h-[350px] shadow-sm relative"
                    >
                      <Link
                        to={`/food/${fav.recipeId._id}`}
                        className="w-full h-full flex flex-col"
                      >
                        <img
                          src={fav.recipeId.image}
                          alt={fav.recipeId.title}
                          className="w-full h-[200px] object-cover rounded-t-lg"
                        />
                        <div className="card-body px-4 py-2">
                          <h2 className="card-title text-[#333d25]">
                            {fav.recipeId.title.length > 35
                              ? `${fav.recipeId.title.substring(0, 35)}...`
                              : fav.recipeId.title}
                          </h2>
                          {fav.recipeId.description?.length > 100 ? (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `${fav.recipeId.description.substring(
                                  0,
                                  130
                                )}...`,
                              }}
                            />
                          ) : (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: fav.recipeId.description,
                              }}
                            />
                          )}
                          <div className="flex justify-between items-center mt-2 text-sm text-gray-700 font-semibold">
                            <span>⏱️ {fav.recipeId.cook_time} min</span>
                            <span>
                              🔥 {Math.round(fav.recipeId.calories)} cals
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              removeFavorite(fav.recipeId._id);
                            }}
                            className="absolute top-2 right-2 text-white bg-red-600 rounded-md px-2 py-1 text-md cursor-pointer"
                          >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center text-gray-500 text-4xl font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {t("favorite.no_favorites")}
                </p>
              )}
            </div>
            <button
              onClick={() => setShowFavorites(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md absolute top-3 right-6 cursor-pointer"
            >
              {t("profile.close")}
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl mt-8">
        <MealPlan />
      </div>
    </div>
  );
}

function ProfileDetail({ label, value }) {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">
        {value || t("profile.not_available")}
      </p>
    </div>
  );
}

export default Profile;
