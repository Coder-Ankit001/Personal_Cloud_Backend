import busboy from "busboy"

import { uploadStream, getObject, deleteObject } from "./storage_service.js"
import { createFile, getFile, deleteFile } from "../nodes/nodes_service.js"


// Upload a File
export async function streamUpload(req, res){
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
            fail(500, e.message || ('Something went wrong!'));
        }
    })
}


// Download a File
export async function streamDownload(req, res) {
    try{
        const userId = req.userId
        const { id } = req.params
        const file = await getFile({id, userId})
    
        if(!file || !file.storagePath) return res.status(400).json({ message: ('Not a downloadable content!')})
        console.log("storage Path", file) 
        const { Body } = await getObject({storagePath: file.storagePath})

        // Setting headers so browser know its downloadable file
        res.setHeader('x-filename', file.name)
        res.setHeader('Content-Disposition', `attachment; filename="${file.name || 'file'}"`)
        res.setHeader('Content-Type', file.contentType || 'application/octet-stream')

        Body.pipe(res)
    }
    catch(e){
        console.error("Error: ", e)
        return res.status(500).json({ message: ('Error while downloading stream')})
    }
}


// Delete a File
export async function deleteStorage(req, res) {
    try{
        const userId = req.userId
        const { id } = req.params
    
        const file = await deleteFile({id, userId})
        if(!file || !file.storagePath) return res.status(400).json({ message: ('File does not exist!')})
        console.log("Storage Path: ", file.storagePath)
        const delResponse = await deleteObject({storagePath: file.storagePath})
        console.log(delResponse)
        return res.status(200).json({ message: (`Successfully deleted File with id: ${id}`)})
    }
    catch(e){
        console.error("Error: ", e)
        return res.status(500).json({ message: ('Unable to delete the file!')})
    }
}