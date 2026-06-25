import express from "express"
import { authenticate } from "../../middlewares/auth.js"
import { streamUpload } from "./storage_controller.js"

const router = express.Router()

router.post('/upload', authenticate, streamUpload)

export default router
