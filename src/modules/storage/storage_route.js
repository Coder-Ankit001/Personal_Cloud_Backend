import express from "express"
import { authenticate } from "../../middlewares/auth.js"
import { deleteStorage, streamUpload } from "./storage_controller.js"
import { streamDownload } from "./storage_controller.js"

const router = express.Router()

// Upload a File
router.post('/upload', authenticate, streamUpload)

// Download a File
router.get('/download/:id', authenticate, streamDownload)

// Delete a File
router.get('/delete/:id', authenticate, deleteStorage)


export default router
