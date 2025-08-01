import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email,phone, password,role  } = req.body;

        //check user already exits
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(400).json({ message: 'user already exits with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: role || 'user' // default role is 'user'
        });
        //generate jwt token

        const token = jwt.sign({ userId: user._id,email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        res.status(201).json({
            message: 'singup sucessfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role:user.role
            },
            token
        })


    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT Secret not configured' });
        }

        const token = jwt.sign({ userId: user._id,email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });



        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
}   