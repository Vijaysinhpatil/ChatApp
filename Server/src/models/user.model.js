import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String , 
        required : true,
        minlength : 6
    },
    profilePhoto : {
        type : String,
        default : ""
    }
},{
    timestamps : true // createdAt & updatedAt -> used last login and few minutes ago
})
export const User = mongoose.model("User" , userSchema);
export default User;