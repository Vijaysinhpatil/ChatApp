import express from "express";
import authRoutes from './routes/auth.route.js'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json()) // read the requests which is sent inthe form of JSON like applicatin/json (content-Type) from frontend
app.use(express.urlencoded({ extended : true }))   //Reads requests where data is sent as HTML form format like in form using the method as POST then action : "register"
app.use(cookieParser())

app.use("/api/auth" , authRoutes)
app.listen(PORT , () => {
    console.log(`Server is running at PORT : ${PORT}`);
    
})