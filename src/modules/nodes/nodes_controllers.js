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


// Controller: Move a Node
export const moveNode = async(req, res)=>{
  try{
    const {srcId, userId, destId} = req.body

    if(!srcId || !userId || !destId) return res.status(400).json({ message: ('Incomplete Details!')})

    const node = await prisma.$queryRaw`
      WITH RECURSIVE descendants AS (
        SELECT n.id FROM "Node" n
        WHERE n.id = ${srcId}

        UNION All
        
        SELECT n.id FROM "Node" n
        JOIN descendants d
        ON n."parentId" = d.id
      )

      SELECT d.id FROM descendants d
      WHERE d.id = ${destId}
    `
    if(node.length > 0) throw new Error('Cycle has been detected while moving!')
    await prisma.node.update({ where: {id: srcId, userId: userId}, data: {parentId: destId}})
    return res.status(200).json({ message: ('Node have been moved successfully!')})
  }
  catch(e){
    console.error(e.message || ('Something went wrong'))
    return res.status(500).json({ message: ("Something went wrong!")})
  }
}


// Controller: Move Node to Trash Recursively
export const moveToTrash = async(req, res)=>{
  const { srcId, userId, } = req.body

  if(!srcId || !userId) return res.status(400).json({ message: ('Incomplete Details!')})
  try{
    const nodes = await prisma.$executeRaw`
     WITH RECURSIVE descendants AS (
      SELECT n.id FROM "Node" n
      WHERE n.id = ${srcId}

      UNION All

      SELECT n.id FROM "Node" n
      JOIN descendants d
      ON n."parentId" = d.id
     )
     UPDATE "Node"
     SET "inTrash" = ${new Date()}
     WHERE id IN(
      SELECT id FROM descendants
     )
    `
    return res.status(200).json({ message: ('Successfully Moved Files in Trash!')})
  }
  catch(e){
    console.log(e.message || ('Something Went Wrong!'))
    return res.status(500).json({ message: e.message || ('Something Went Wrong!')})
  }
}


// Controller: Restore Node From Trash Recursively
export const restoreTrash = async(req, res)=>{
  const { srcId, userId, } = req.body

  if(!srcId || !userId) return res.status(400).json({ message: ('Incomplete Details!')})
  try{
    const nodes = await prisma.$executeRaw`
     WITH RECURSIVE descendants AS (
      SELECT n.id FROM "Node" n
      WHERE n.id = ${srcId}

      UNION All

      SELECT n.id FROM "Node" n
      JOIN descendants d
      ON n."parentId" = d.id
     )
     UPDATE "Node"
     SET "inTrash" = NULL
     WHERE id IN(
      SELECT id FROM descendants
     )
    `
    return res.status(200).json({ message: ('Successfully Restore From Trash!')})
  }
  catch(e){
    console.log(e.message || ('Something Went Wrong!'))
    return res.status(500).json({ message: e.message || ('Something Went Wrong!')})
  }
}


// Controller: Get Trash Items
export const getTrashItems = async(req, res)=>{
  try{
    const userId = req.userId

    console.log(userId)
    if(!userId) return res.status(400).json({ message: ('Access Denied!')})
    const content = await prisma.$queryRaw`
      SELECT n.* FROM "Node" p
      LEFT JOIN "Node" n
      ON n."parentId" = p.id
      WHERE n."userId" = ${userId}
      AND n."inTrash" IS NOT NULL
      AND p."inTrash" IS NULL
    `

    const safeContent = content.map(node => ({
      ...node,
      size: node.size ? Number(node.size) : 0
    }))

    res.status(200).json({ message: ('All Trash Files Found!'), content: safeContent })
  }
  catch(e){
    console.log(e.message || ('Something went wrong'))
    return res.status(500).json({ message: ('Error while retrieving trash data!')})
  }
}


// Controller: Recursively Delete Node 
export const deleteNode = async(req, res)=>{
  const { id } = req.body
  const userId = req.userId
  console.log(userId, id)
  if(!id || !userId) return res.status(400).json({ message: ('Incomplete Details!') })

  try{
      const count = await prisma.$executeRaw`
      WITH RECURSIVE descendants AS(
        SELECT id, "userId" FROM "Node"
        WHERE id = ${id} 
        AND "userId" = ${userId}

        UNION All

        SELECT n.id, n."userId" FROM "Node" n
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
          message: "Node not found"
        });
      }
      return res.status(200).json({ message: (`Node with id: ${id} has been deleted!`)})
    }
    catch(e){
      res.status(500).json({ message: ('Something went wrong!')})
    }
}


// Controller: Create Directory 
export const createFolder = async (req, res)=>{
  const {userId, name, parentId} = req.body
  const color = req.body.color?.toUpperCase()
  const type = req.body.type?.toUpperCase()
  if(!userId || !name || type !== 'FOLDER' || !color || !parentId) return res.status(400).json({ message: ('Incomplete Details!') })

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
      userId: userId,
      inTrash: null
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
          inTrash: null,
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
          inTrash: null,
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
          inTrash: null,
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