import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  getUserProfile,
  logoutUser,
  deleteUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);
router.get("/all", getAllUsers);
router.get("/profile", auth, getUserProfile);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
