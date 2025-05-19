import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";
import { useTranslation } from "react-i18next";

function EditProfile() {
  const { t } = useTranslation();
  const { user, setUser, setSessionCheckNeeded, handleLogout } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    age: "",
    height: "",
    weight: "",
    target_weight: "",
    target_weight_change: "1kg",
    daily_calories: "",
    gender: "male",
    activity_level: "sedentary",
    food_preferences: [],
    allergies: [],
    cuisine_preferences: [],
    disease: [],
    password: "",
    image: null,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
        password: "",
        image: null,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert(t("edit_profile.no_user_error"));
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key] instanceof File) {
        data.append("image", formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((val) => data.append(key, val));
      } else if (formData[key] !== undefined && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.put(`${ORIGIN_URL}/users/${user.id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
      console.log("User updated:", res.data);
      setSessionCheckNeeded(true);
      setSuccess("Profile updated successfully");
      // alert(t("edit_profile.update_success"));

      // navigate("/profile");

      setTimeout(() => {
        handleLogout();
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err);
      setSuccess("Profile update failed");
      // alert(t("edit_profile.update_failed"));
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">{t("edit_profile.loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-center rounded-none">
      <div className="card w-full h-[100vh] shadow-2xl overflow-hidden">
        <div className="flex flex-col">
          <div className="bg-[#255140] text-white flex flex-col justify-center items-center p-8 rounded-none">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-[#FFC649] ring-offset-4 overflow-hidden">
                {formData.image instanceof File ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">
                    <span className="text-4xl font-bold">
                      {formData.username?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-4">
              {formData.username || t("edit_profile.no_username")}
            </h2>
            <p className="text-sm italic mt-2">
              {t("edit_profile.update_message")}
            </p>
          </div>
          <div className="p-8">
            <h2 className="text-4xl font-medium text-[#255140] mb-4">
              {t("edit_profile.title")}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-4 gap-3"
            >
              {[
                { name: "first_name", label: t("edit_profile.first_name") },
                { name: "last_name", label: t("edit_profile.last_name") },
                { name: "age", label: t("edit_profile.age"), type: "number" },
                {
                  name: "height",
                  label: t("edit_profile.height"),
                  type: "number",
                },
                {
                  name: "weight",
                  label: t("edit_profile.weight"),
                  type: "number",
                },
                {
                  name: "target_weight",
                  label: t("edit_profile.target_weight"),
                  type: "number",
                },
                {
                  name: "daily_calories",
                  label: t("edit_profile.daily_calories"),
                  type: "number",
                },
              ].map(({ name, label, type = "text" }) => (
                <div key={name}>
                  <label className="label font-semibold text-[#255140] mb-1">
                    {label}
                  </label>
                  <input
                    disabled={name === "daily_calories"}
                    style={{ backgroundColor: "transparent", color: "#255140" }}
                    name={name}
                    type={type}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-white border-[#255140]"
                  />
                </div>
              ))}
              <div>
                <label className="label font-semibold text-[#255140] mb-1">
                  {t("edit_profile.gender")}
                </label>
                <select
                  name="gender"
                  value={formData.gender || "male"}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-white border-[#255140]"
                >
                  {Object.entries(
                    t("edit_profile.gender_options", { returnObjects: true })
                  ).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-semibold text-[#255140] mb-1">
                  {t("edit_profile.target_weight_change")}
                </label>
                <select
                  name="target_weight_change"
                  value={formData.target_weight_change || "1kg"}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-white border-[#255140]"
                >
                  {Object.entries(
                    t("edit_profile.weight_change_options", {
                      returnObjects: true,
                    })
                  ).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="label font-semibold text-[#255140] mb-1">
                    {t("edit_profile.activity_level")}
                  </label>
                  <select
                    name="activity_level"
                    value={formData.activity_level || "sedentary"}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-white border-[#255140]"
                  >
                    {Object.entries(
                      t("edit_profile.activity_levels", { returnObjects: true })
                    ).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label font-semibold text-[#255140] mb-1">
                    {t("edit_profile.food_preference")}
                  </label>
                  <select
                    name="food_preferences"
                    value={formData.food_preferences?.[0] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        food_preferences: [e.target.value],
                      }))
                    }
                    className="select select-bordered w-full bg-white border-[#255140]"
                  >
                    <option value="">
                      {t("edit_profile.select_preference")}
                    </option>
                    {Object.entries(
                      t("edit_profile.food_preference_options", {
                        returnObjects: true,
                      })
                    ).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {[
                  { name: "allergies", label: t("edit_profile.allergies") },
                  {
                    name: "cuisine_preferences",
                    label: t("edit_profile.cuisine_preferences"),
                  },
                  { name: "disease", label: t("edit_profile.diseases") },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="label font-semibold text-[#255140] mb-1">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={formData[name]?.join(", ") || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [name]: e.target.value
                            .split(",")
                            .map((s) => s.trim()),
                        })
                      }
                      className="input input-bordered w-full bg-white border-[#255140]"
                      placeholder={`${label} (${t(
                        "edit_profile.comma_separated"
                      )})`}
                    />
                  </div>
                ))}
              </div>
              <div className="md:col-span-2">
                <label className="label font-semibold text-[#255140] mb-1">
                  {t("edit_profile.new_password")}
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("edit_profile.password_placeholder")}
                  className="input input-bordered w-full bg-white border-[#255140]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label font-semibold text-[#255140] mb-1">
                  {t("edit_profile.profile_image")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full bg-white border-[#255140]"
                />
              </div>
              <div className="md:col-span-4 flex flex-col md:flex-row justify-between gap-4 mt-4">
                <button
                  type="submit"
                  className="btn border-2-[#FFC649] bg-transparent text-[#255140] hover:bg-[#255140] hover:text-white w-full md:w-auto"
                >
                  {t("edit_profile.save_changes")}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="btn btn-outline border-[#255140] text-[#255140] hover:bg-[#255140] hover:text-white w-full md:w-auto"
                >
                  {t("edit_profile.cancel")}
                </button>
              </div>
            </form>
            {success && (
              <div className="alert alert-success mt-4">
                <span>{success}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
