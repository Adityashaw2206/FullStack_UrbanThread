import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { User } from '../models/user.model.js';
const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
// userRouter.post('/admin', adminLogin);
// ✅ Get logged-in user's profile
userRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
});
export default userRouter;