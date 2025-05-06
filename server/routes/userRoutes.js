import express from "express";
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
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post(`/register`, createUser);
router.post(`/login`, loginUser);
router.post(`/logout`, logoutUser);
router.get(`/check-session`,auth, checkSession);

router.get("/",auth, getAllUsers);
router.get("/:id",auth, getUserById);
router.put("/:id",auth, updateUser);
router.delete("/:id",auth,deleteUser);

export default router;
