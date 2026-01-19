import mongoose from "mongoose";

const connectDB = async () => {
    try{
      const conn = await mongoose.connect(process.env.MONGODB_URL);

      console.log("MongoDB connected successfully : " , conn.connection.host);
    }
    catch(error){
       console.log("MongoDB connection failed", error);
       process.exit(1); // 1 status code is for connection fail and 0 is for connected successfully.
    }
}

export default connectDB;