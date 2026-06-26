import { prisma } from '../../db.js'


// Controller: Rename Node 
export const renameNode = async(req, res)=>{
  const { id, type, name, userId, color } = req.body

  if(!id || !userId || !name) return res.status(400).json({message: ('Incomplete details!')})
  try{
    const node = await prisma.node.update({ where: {id: id, userId: userId}, data: {name: name, color: color}})
    return res.status(200).json({ message: (`Node with id: ${id} name has been changed to -> ${name}`)})
  }
  catch(e){
    return res.status(400).json({ message: ('Node with same name exists!')})
  }
}


// Controller: Create Directory 
export const createFolder = async (req, res)=>{
  const {userId, name, parentId} = req.body
  const color = req.body.color?.toUpperCase()
  const type = req.body.type?.toUpperCase()
  if(!userId || !name || type !== 'FOLDER' || !color) return res.status(400).json({ message: ('Incomplete Details!') })

  try{
  const node = await prisma.node.create({
    data: { userId, name, type, color, parentId }
  })
    return res.status(201).json({ message: ('Folder has been created successfully!')})
  }
  catch(e){
    return res.status(400).json({ message: ('Data is invalid')})
  }
}

// Controller: Recursively Delete Directory 
export const deleteFolder = async(req, res)=>{
  const {id, userId} = req.body
  const type = req.body.type?.toUpperCase()
  if(!id || !userId || !type) return res.status(400).json({ message: ('Incomplete Details!') })

  try{
      const count = await prisma.$executeRaw`
      WITH RECURSIVE descendants AS(
        SELECT id FROM "Node"
        WHERE id = ${id}

        UNION All

        SELECT n.id FROM "Node" n
        JOIN descendants d
        ON n."parentId" = d.id
      )

      DELETE FROM "Node"
      WHERE id IN (
        SELECT id FROM descendants
      )
      `
      if (count === 0) {
        return res.status(404).json({
          message: "Folder not found"
        });
      }
      return res.status(200).json({ message: (`Folder with id: ${id} has been deleted!`)})
    }
    catch(e){
      res.status(500).json({ message: ('Something went wrong!')})
    }
}



// Controller: Create File 
export const createFile = async(req, res)=>{
  const {userId, name, parentId} = req.body
  const ext = req.body.ext?.toUpperCase()
  const type = req.body.type?.toUpperCase()

  if(!userId || !name || type !== 'FILE') return res.status(400).json({ message: ('Incomplete Details!') })

  try{
    const node = await prisma.node.create({
      data: { userId, name, type, ext, parentId}
    })
    return res.status(201).json({ message: ('File has been created successfully!')})
  }
  catch(e){
    return res.status(400).json({ message: ('Data is invalid')})
  }
}

// Controller: Delete File 
export const deleteFile = async(req, res)=>{
  const { id, userId, type } = req.body

  if(!id || !userId || !type) return res.status(400).json({ message: ('Incomplete Details!')})

  try{
    const node = await prisma.node.delete({ where: {id: id, userId: userId, type: type}})
    return res.status(204).json({ message: (`File with id: ${id} has been successfully deleted`)})
  }
  catch(e){
    res.status(400).json({ message: ('Something went wrong')})
  }
}


// Controller: Move File
export const moveFile = async(req, res)=>{
  try{
    const {id, userId, destId} = req.body

    if(!id || !userId) return res.status(400).json({ message: ('Incomplete Details!')})

    const file = await prisma.node.findFirst({ where: {id, userId}})
    if(!file || !file.parentId) return res.status(400).json({ message: ('Could not find the file!')})
    const updatedFile = await prisma.node.update({ where: {id, userId}, data: {parentId: destId}})
    return res.status(200).json({ message: ('File has been sucessfully moved!')})
  }
  catch(e){
    console.error(e)
    return res.status(500).json({ message: ('Error while moving file!')})
  }
}


// Controller: Get Path
export const getPath = async(req, res)=>{
  const { id } = req.params

  const userId = req.userId
  const rootId = req.rootId
  const path = []
  let curId = id
  
  while (curId !== rootId) {
    try{
      const node = await prisma.node.findFirst({ where: {id: curId, userId: userId}})
      path.push({id: node.id, name: node.name})
      curId = node.parentId
    }
    catch(e){
      return res.status(400).json({ message: ('Error while tracing path')})
    }
  }

  path.reverse()

  return res.status(200).json({ path, message: ('Path generated')})
}


// Controller: Get Directory Contents
export const getContent = async(req, res)=>{
  const { id } = req.params
  const userId = req.userId

  if(!id) return res.status(400).json({ message: ('Invalid Node id!')})
  const content = await prisma.node.findMany(
  {
    where: {
      parentId: id,
      userId: userId
    },
    orderBy: [
      {
        type: 'desc'
      },
      {
        name: 'asc'
      }
    ]
  })

  const safeContent = content.map(node => ({
    ...node,
    size: node.size ? Number(node.size) : 0
  }))
  
  return res.status(200).json({content: safeContent, message: (`Successfully fetched all the child node of root id: ${id}`)})
}


// Controller: Get All Images With UserID 
export const getImages = async(req, res)=>{
  const {userId} = req.params

  if(!userId) return res.status(400).json({ message: ('Nothing to see here!')})

    try{
      const images = await prisma.node.findMany({ 
        where: {
          userId: userId, 
          ext: {
            in:   ["JPG", "JPEG", "PNG", "GIF"] 
          }
        }
      })
      return res.status(200).json({ images: images, message: (`Found all Images with userId: ${userId}`)})
    }
    catch(e){
      return res.status(400).json({ message: ('Something went wrong!')})
    }
}


// Controller: Get All Docs With UserID 
export const getDocs = async(req, res)=>{
  const {userId} = req.params

  if(!userId) return res.status(400).json({ message: ('Nothing to see here!')})

    try{
      const docs = await prisma.node.findMany({ 
        where: {
          userId: userId, 
          ext: {
            in:   ["PDF", "DOCS", "XLSX"] 
          }
        },
      })
      return res.status(200).json({ docs: docs, message: (`Found all Documents with userId: ${userId}`)})
    }
    catch(e){
      return res.status(400).json({ message: ('Something went wrong!')})
    }
}


// Controller: Get All Mics Files With UserID 
export const getMisc = async(req, res)=>{
  const {userId} = req.params

  if(!userId) return res.status(400).json({ message: ('Nothing to see here!')})

    try{
      const mics = await prisma.node.findMany({ 
        where: {
          userId: userId, 
          ext: {
            in:   ["TXT", "CSV", "ZIP"] 
          }
        },
      })
      return res.status(200).json({ mics: mics, message: (`Found all Misc files with userId: ${userId}`)})
    }
    catch(e){
      return res.status(400).json({ message: ('Something went wrong!')})
    }
}