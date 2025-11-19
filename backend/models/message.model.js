import mongoose from "mongoose";

const messageModel = new mongoose.Schema({

    senderId : {
        //primary key or ralation between models
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recieverId : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        type : String,
        required : true
    }

},{
    timestamps : true
})

const Message = new mongoose.model('Message' , messageModel)
export default Message