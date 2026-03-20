import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// register

export const register = async(req , res) => {
     try {
        const { fullName , email , password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                message : "All the fields are required..!"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message : "Password must be at least 6 characters"
            })
        }

        // check if the user is already exist or not

        const existingUser = await prisma.user.findUnique({
            where : { email }
        })

        if(existingUser){
            return res.status(400).json({
                message : "User already Exists"
            })
        }

        // password hashing
        const salt = await bcrypt.genSalt(10);
        const passwordHashing = await bcrypt.hash(password , salt);

        // create user
        const newUser = await prisma.user.create({
            data : {
                fullName,
                email,
                password : passwordHashing
            }
        });

        // token generation
        const token = jwt.sign(
           { userId : newUser.id },
           process.env.JWT_SECRET,
           { expiresIn : "7d"}
        );

        res.status(201).json({
            id : newUser.id , 
             message : "User Registered Scuuessfully" ,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic,
            Token : token

        })
     } catch (error) {
         console.log("Error in register controller", error);
    res.status(500).json({ message: "Internal server error" });
     }
}

// login

export const Login = async(req , res) => {
    try {
        const { password , email } = req.body;
        
        if(!password || !email){
            return res.status(400).json({
                message : "All fields are required",
            })
        }
       
        const user = await prisma.user.findUnique({
            where : { email }
        })
        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect){
             return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user.id , res) // user.id to fetch actalData from prisma stduio
        
        res.status(200).json({
            message : "User login Scuuessfully" ,
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
         res.status(500).json({ message: "Internal Server Error" });
    }
}

//logout
export const logout = ( req , res ) => {
      try {
        res.cookie("jwt" , "" , { maxAge : 0 });
        res.status(200).json({ 
            message : "Logged out successfully"
        })
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is required",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { profilePic: uploadResponse.secure_url },
    });

    res.status(200).json({
      message: "Profile Pic updated",
      updatedUser,
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};