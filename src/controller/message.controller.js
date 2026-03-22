import prisma from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSockerId, io } from "../lib/socket.js";
export const getUsersForSidebar = async(req , res) => {
   
    try {
        
        const loggedInUserId = req.user.id;

        const users = await prisma.user.findMany({
            where : {
                id : { not : loggedInUserId } , //exclude logged-in user
            },
            select : {
                id : true,
                fullName : true,
                email : true,
                profilePic : true
            }
        });

        res.status(200).json(users);

    } catch (error) {
         console.log("Error in getUsersForSidebar controller", error.message);
         res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessage = async(req , res) => {
    try {
        const { id : receiverId } = req.params; // the other users id
        const senderId = req.user.id;

        const messages = await prisma.message.findMany({
            where : {
                OR : [
                    { 
                        senderId : senderId , 
                        receiverId : parseInt(receiverId)
                    },
                    {
                        senderId : parseInt(receiverId),
                        receiverId : senderId
                    }
                ],
            },
            orderBy : { createdAt : "asc"} , // oldest first , like a real chat
        });

        res.status(200).json({
            message : "Message successfully send",
            messages
        })
    } catch (error) {
         console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async(req , res) => {
    try {
        
        const { text , image } = req.body;
        const { id : receiverId } = req.params;
        const senderId = req.user.id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;

        }

        const newMessage = await prisma.message.create({
            data : {
                senderId ,
                receiverId : parseInt(receiverId),
                text,
                image : imageUrl
            }
        });
        // emit to reciever if they are online
        const recieverSocketId = getReceiverSockerId(parseInt(receiverId));
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage" , newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}