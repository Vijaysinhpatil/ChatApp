import express from "express";
import dotenv from "dotenv";
import path from "path"
import connectDB from "./config/db.js";
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
const app = express();
const __dirname = path.resolve()
dotenv.config({});

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/api/auth" , authRoute)
app.use("/api/messages" , messageRoute)
// app.use("/api/auth" , authRoute)

// Make ready for deployment 
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Client/dist")))
    
    app.get('/*path', (_, res) => {
        res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
    })
}
// listening
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    connectDB();   
    console.log(`Server is running on port ${PORT}`);
})


