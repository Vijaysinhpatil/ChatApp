import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { getMessage, getUsersForSidebar, sendMessage } from "../controller/message.controller.js"
const router = express.Router()

router.route("/users").get(protectedRoute , getUsersForSidebar)
router.route("/:id").get(protectedRoute , getMessage)
router.post("/send/:id", protectedRoute, sendMessage);

export default router;