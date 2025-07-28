import express from "express";
import { protect } from "../middleware/auth";
import User from "../models/userModel";

const router = express.Router();

router.get("/me",protect,async(req:any,res)=>{
     try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Protected data fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Protected route error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;