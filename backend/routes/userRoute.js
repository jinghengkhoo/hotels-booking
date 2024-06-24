import express from "express";
import { registerUser, loginUser, refreshToken, getUserProfile, logoutUser } from "../controllers/userController.js"
import auth from '../middleware/auth.js';

const router = express.Router()
// POST add new user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);
router.get('/profile', auth, getUserProfile);

export default router;