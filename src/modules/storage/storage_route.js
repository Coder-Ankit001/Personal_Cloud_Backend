import express from "express"
import { authenticate } from "../../middlewares/auth.js"
import { streamUpload } from "./storage_controller.js"
import { streamDownload } from "./storage_controller.js"

const router = express.Router()

// Upload a File
router.post('/upload', authenticate, streamUpload)

// Download a File
router.get('/download/:id', authenticate, streamDownload)

export default router
