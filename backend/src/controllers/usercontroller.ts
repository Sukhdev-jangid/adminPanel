import { Request,Response } from "express";
import User from "../models/userModel";


// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
}