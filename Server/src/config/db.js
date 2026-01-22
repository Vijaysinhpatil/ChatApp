import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
    try{

      const { MONGODB_URL } = ENV;
      if(!MONGODB_URL)
      {
        throw new Error("MONGO_URI is not set..!")
      }
      const conn = await mongoose.connect(ENV.MONGODB_URL);

      console.log("MongoDB connected successfully : " , conn.connection.host);
    }
    catch(error){
       console.log("MongoDB connection failed", error);
       process.exit(1); // 1 status code is for connection fail and 0 is for connected successfully.
    }
}

export default connectDB;