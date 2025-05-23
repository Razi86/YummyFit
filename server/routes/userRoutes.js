import express from "express";
import multer from "multer";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkSession,
} from "../controllers/userController.js";
import { auth, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(`/register`, createUser);
router.post(`/login`, loginUser);
router.post(`/logout`, logoutUser);
router.get(`/check-session`, auth, checkSession);

router.get("/", auth, admin, getAllUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, upload.single("image"), updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
