import express from "express";
import { protect } from "../middleware/auth";
import User from "../models/userModel";
import { getAllUsers } from "../controllers/usercontroller";

const router = express.Router();

router.get("/getAllUsers",getAllUsers);

export default router;