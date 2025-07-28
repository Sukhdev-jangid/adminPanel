import { Request,Response,NextFunction } from "express"; 
import  User  from "../models/userModel"; 

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}


export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
         const email = req.user?.email;
         const user = await User.findOne({email});
          if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied, admin only" });
            }
        next();
    } catch (error) {
        console.error("Admin check failed", error);
        res.status(403).json({ message: "Acces denied" });
    }
}