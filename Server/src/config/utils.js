
import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = ( userId , res ) => {

    const { JWT_SECRET } = ENV;

    if(!JWT_SECRET)
    {
        throw new Error("JWT_SECRET is not configured") 
    }

    //  creating a token for user
    const token = jwt.sign(
        { userId },  // identifier
        JWT_SECRET,
        { expiresIn : '7d'}
    )

    // generating cookies and return them

    res.cookie("jwt" , token , {
        maxAge : 7 * 24 * 60 * 60 * 1000 , // MS
        httpOnly : true, // prevents XSS attacks : cross-site scripting
        sameSite : "strict", // CSRF attacks
        secure : ENV.NODE_ENV === "development" ? false : true,
    })

    return token
}