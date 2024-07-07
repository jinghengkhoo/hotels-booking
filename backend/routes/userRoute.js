import express from "express";
import { registerUser, loginUser, refreshToken, getUserProfile, logoutUser, deleteUser, updateUser, getAllUsers } from "../controllers/userController.js"
import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUser);
router.get('/all', getAllUsers);
router.delete('/', auth, deleteUser);

export default router;