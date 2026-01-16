import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
const app = express();
dotenv.config({});

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/api/auth" , authRoute)
app.use("/api/messages" , messageRoute)
app.use("/api/auth" , authRoute)
// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    connectDB();   
    console.log(`Server is running on port ${PORT}`);
})


