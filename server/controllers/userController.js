import asyncHandler from "../utils/asyncHandler.js";
import User from "../schemas/userSchema.js";
import { CustomError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { bucket } from "../config/firebase.js";
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "../config/config.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
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
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;

  if (newData.password)
    newData.password = await bcrypt.hash(newData.password, 10);

  const updatedUser = await User.findByIdAndUpdate(userId, newData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) throw new CustomError("user not found", 404);

  res.status(200).json(updatedUser);
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
    user: {
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
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
  if(req.user){
    res.json({authenticated: true, user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    }});
  }else {
    res.json({authenticated: false});
  }
}
