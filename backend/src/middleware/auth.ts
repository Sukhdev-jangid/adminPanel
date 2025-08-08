import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };

}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization as string;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "no token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
            email: string;
        };

        req.user = {
            id: decoded.userId,
            email: decoded.email,
        };

        next();

    } catch (error) {
        console.error("Token verification failed", error);
        res.status(401).json({ message: "unauthorized - invalid or expired token" })
    }
};