import { app, server } from "./lib/socket.js";  // ← changed
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express"

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});