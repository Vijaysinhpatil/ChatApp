
import jwt from "jsonwebtoken";

export const generateToken = ( userId , res ) => {
    //  creating a token for user
    const token = jwt.sign(
        { userId },  // identifier
        process.env.JWT_SECRET,
        { expiresIn : '7d'}
    )

    // generating cookies and return them

    res.cookie("jwt" , token , {
        maxAge : 7 * 24 * 60 * 60 * 1000 , // MS
        httpOnly : true, // prevents XSS attacks : cross-site scripting
        sameSite : "strict", // CSRF attacks
        secure : process.env.NODE_ENV === "development" ? false : true,
    })

    return token
}