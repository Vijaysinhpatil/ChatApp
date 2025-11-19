import mongoose from "mongoose";

const connectDB = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully...!");
    } catch (error) {
        console.log("Database is not connected..!");
        
    }
}
export default connectDB;