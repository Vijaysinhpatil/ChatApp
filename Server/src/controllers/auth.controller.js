import { generateToken } from "../config/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req , res) => {
   
     try {
        const { fullName , email , password } = req.body;

        console.log(fullName , email , password);
        

        if(!fullName || !email || !password )
        {
            return res.status(400).json({
                message : "All fileds are Required..!",
                success : false
            })
        }
        if(password.length < 6){
             return res.status(400).json({
                message : "Password atleast should be 6 characters..!",
                success : false
             })
        }

        // check if the emails are valid : regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        {
              return res.status(400).json({
                message : "Email is not valid",
                success : false
              })
        }

        const existedUser = await User.findOne({ email })
        if(existedUser)
        {
            return res.status(400).json({
                message : "user is already existed",
                success : false
            })
        }
      
        // Password hashing like 12334 = dfjkjnkjddbfdbmndsbvvhjcv
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        // create a new user
        const newUser = await User.create({
            email ,
            password : hashedPassword,
            fullName 
        }) 

        if(newUser){

            generateToken(newUser._id , res);
            await newUser.save() // save data to the database

            return res.status(201).json({
                message : "User Created Successfully..!",
                _id : newUser._id ,
                email : newUser.email,
                fullName : newUser.fullName,
                profilePhoto : newUser.profilePhoto
            })
        }else{
             return res.status(400).json({
                message : "Invalid user Data",
                success : false
             })
        }
     } catch (error) {
         
        console.log("Error while signup Controller..!");
        
        return res.status(400).json({
            message : "Error while signup controller",
            success : false
        })
     }
}