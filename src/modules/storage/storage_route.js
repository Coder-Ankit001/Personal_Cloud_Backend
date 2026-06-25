import express from "express"
import busboy from "busboy"

import { createFile } from "../nodes/nodes_service.js"
import { authenticate } from "../../middlewares/auth.js"
import { uploadStream } from "./storage_service.js"

const router = express.Router()

router.post('/upload', authenticate, (req, res) => {
    const bb = busboy({ headers: req.headers })
    let meta = {}

    function fail(status, message) {
        req.unpipe(bb)
        bb.destroy()
        console.error(message)
        res.status(status).json({ message })
    }

    bb.on('field', (fieldName, val) => {
        if (fieldName !== 'metadata') return;

        try {
            meta = JSON.parse(val);
        }
        catch {
            return fail(400, 'Invalid metadata');
        }

        if (!meta.name || meta.type !== 'FILE' || !meta.ext) {
            return fail(400, 'Incomplete Details!');
        }
        meta.parentId = meta.parentId === 'root'? req.rootId: meta.parentId
        console.log(meta)
    })

    let uploadJob = null
    let size = 0
    bb.on('file', (name, stream, info) => {
    stream.on('data', chunk => size += chunk.length)
    const userId = req.userId
    const parentId = meta.parentId
    const storagePath = `uploads/${userId}/${parentId || 'root'}/${Date.now()}-${info.filename}`
    meta.contentType = info.mimeType
    meta.storagePath = storagePath
    uploadJob = uploadStream({
        stream,
        storagePath,
        contentType: info.mimeType
    })
    console.log("Job: ", uploadJob)
    
    })

    req.pipe(bb)


    bb.on('close', async () => {
        if(!uploadJob) fail(500, 'No file found in payload')
        try {
            await uploadJob
            const node = await createFile({
                name: meta.name,
                type: meta.type.toUpperCase(),
                ext: meta.ext.toUpperCase(),
                userId: req.userId,
                parentId: meta.parentId,
                storagePath: meta.storagePath,
                size: size,
                contentType: meta.contentType
            })
            node.size = Number(node.size)
            res.status(201).json({ message: ('File Uploaded Successfully!'), node});
        }
        catch (e) {
            fail(500, e);
        }
    })
})

export default router
