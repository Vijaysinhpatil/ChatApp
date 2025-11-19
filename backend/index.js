import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'

dotenv.config({})
const app = express()
const PORT = process.env.PORT || 8080

app.listen(PORT , () => {

    connectDB()
    console.log(`Server Connected Successfully at -> ${PORT}`);
    
})
