import prisma from "../lib/prisma.js";

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