import express from "express";
const router = express.Router();
import { Login, logout, register , updateProfile } from "../controller/auth.controller.js"
import  {protectedRoute}  from "../middleware/auth.middleware.js"
router.route("/register").post(register)
router.route("/login").post(Login)
router.route("/logout").get(logout)
router.route("/update-profile").put( protectedRoute , updateProfile)
export default router;