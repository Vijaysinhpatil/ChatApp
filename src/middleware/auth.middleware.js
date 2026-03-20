import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
export const protectedRoute = async(req , res , next) => {
    
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message : "Unauthorizes - No Token Provided"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message : "Unauthorizes - No Token Provided"
            })
        }

        const user = await prisma.user.findUnique({
            where : { id : decoded.userId },
            select : {
                id : true,
                fullName : true,
                email : true
            }
        })

        if(!user){
            return res.status(400).json({
                message : "Unauthorizes - No Token Provided"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
    }
}
