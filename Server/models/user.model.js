import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName : {
        type: String,
        required: true
    },
    userName : {
        type : string,
        required : true,
        unique  : true
    },
    password : {
        type : string , 
        required : true,

    },
    profilePhoto : {
        type : string,
        default : ""
    },
    gender : {
        type : string,
        enum : ["male" , "female"],
        required : true
    }
})
export const User = mongoose.model("User" , userSchema);
export default User;