import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config({});

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    connectDB();   
    console.log(`Server is running on port ${PORT}`);
})


