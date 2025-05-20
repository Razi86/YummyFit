import asyncHandler from "../utils/asyncHandler.js";
import User from "../schemas/userSchema.js";
import { CustomError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { bucket } from "../config/firebase.js";
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "../config/config.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) {
    throw new CustomError("users not found", 404);
  }
  res.status(200).json(users);
});

// get one user By id
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError("user not found", 404);
  }
  res.status(200).json(user);
});

// create a user
export const createUser = asyncHandler(async (req, res) => {
  const {username,first_name, last_name, email, password } = req.body;
  const image = req.file;

  const uniqueEmail = await User.findOne({ email });
  if (uniqueEmail) throw CustomError("user already exists", 400);

  const uniqueUsername = await User.findOne({ username });
  if (uniqueUsername) throw CustomError("user already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    first_name,
    last_name,
    email,
    password: hashedPassword
  });

  if (image) {
    try {
      const blob = bucket.file(
        `images/${first_name}/${Date.now()}_${image.originalname}`
      );
      const blobStream = blob.createWriteStream({
        metadata: { contentType: image.mimetype },
      });

      await new Promise((resolve, reject) => {
        blobStream.on("error", (err) =>
          reject(new CustomError("Image upload failed", 500))
        );
        blobStream.on("finish", resolve);
        blobStream.end(image.buffer);
      });

      // Get signed URL after upload
      const signedUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });
      newUser.image = signedUrl[0];
    } catch (error) {
      return next(new CustomError("Image upload failed", 500));
    }
  }

  await newUser.save();
  res.status(201).json(newUser);
});

// update a user
export const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const newData = req.body;
  const image = req.file;

  if (newData.password)
    newData.password = await bcrypt.hash(newData.password, 10);

  // Find existing user to keep image if none uploaded
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new CustomError("user not found", 404);

  if (image) {
    try {
      const blob = bucket.file(
        `images/${newData.first_name || "user"}/${Date.now()}_${image.originalname}`
      );
      const blobStream = blob.createWriteStream({
        metadata: { contentType: image.mimetype },
      });

      await new Promise((resolve, reject) => {
        blobStream.on("error", (err) => reject(new CustomError("Image upload failed", 500)));
        blobStream.on("finish", resolve);
        blobStream.end(image.buffer);
      });

      const signedUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });

      newData.image = signedUrl[0];
    } catch (error) {
      console.error("Firebase upload failed:", error);
      return next(new CustomError("Image upload failed", 500));
    }
  } else {
    // Keep the current image if not uploading a new one
    newData.image = existingUser.image;
  }

  if(newData.age && newData.weight && newData.height){
    let bmr;
    if(!newData.gender || newData.gender === "male"){
      bmr = 10 * newData.weight + 6.25 * newData.height - 5 * newData.age + 5;
    }
    else{
      bmr = 10 * newData.weight + 6.25 * newData.height - 5 * newData.age - 161;
    }

    const activityMap ={
      "sedentary": 1.2,
      "lightly active": 1.375,
      "moderately active": 1.55,
      "very active": 1.725,
      "super active": 1.9
    }

    const targetChange ={
      "500g": 500,
      "1kg": 1000
    }

    const activity_level = activityMap[newData.activity_level] || 1.2;

    let tdee = bmr * activity_level;
    let daily_calories = tdee - (targetChange[newData.target_weight_change] || 1000);
    newData.daily_calories = Math.round(daily_calories);
  }

  const user = await User.findByIdAndUpdate(userId, newData, {
    new: true,
    runValidators: true,
  });

  const token = jwt.sign(
   {
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      image: user.image,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight,
      target_weight: user.target_weight,
      target_weight_change: user.target_weight_change,
      daily_calories: user.daily_calories,
      activity_level: user.activity_level,
      allergies: user.allergies,
      food_preferences: user.food_preferences,
      cuisine_preferences: user.cuisine_preferences,
      disease: user.disease,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  // res.setHeader("Cache-Control", "no-store");
  res.status(200).json({user:{
    id: user._id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    image: user.image,
    gender: user.gender,
    age: user.age,
    height: user.height,
    weight: user.weight,
    target_weight: user.target_weight,
    target_weight_change: user.target_weight_change,
    daily_calories: user.daily_calories,
    activity_level: user.activity_level,
    allergies: user.allergies,
    food_preferences: user.food_preferences,
    cuisine_preferences: user.cuisine_preferences,
    disease: user.disease,
  }});
});



export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  
  const user = await User.findByIdAndDelete(userId);

  if (!user) throw new CustomError("user not found", 404);

  res.status(204).json({ message: "User deleted successfully" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new CustomError("Invalid email or password", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError("Invalid email or password", 401);

   const token = jwt.sign(
   {
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      image: user.image,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight,
      target_weight: user.target_weight,
      target_weight_change: user.target_weight_change,
      daily_calories: user.daily_calories,
      activity_level: user.activity_level,
      allergies: user.allergies,
      food_preferences: user.food_preferences,
      cuisine_preferences: user.cuisine_preferences,
      disease: user.disease,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({
    message: "Login successful",
    user :{
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      image: user.image
    },
  });
});

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  });

  res.status(200).json({ message: "Logout successful" });
};

export const checkSession = (req, res) => {
  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
};
