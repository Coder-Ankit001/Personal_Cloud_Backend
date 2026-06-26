import { prisma } from '../../db.js'

export async function createRoot({userId}) {
    const root = await prisma.node.create({
        data: {
            name: 'root', color: 'GRAY', type: 'FOLDER', userId, parentId: null
        }
    })
    return root
}


export async function createFile({
    name,
    type,
    ext,
    storagePath,
    size,
    contentType,
    userId,
    parentId
}) {
    const node = await prisma.node.create({
        data: { name, type, ext, storagePath, size, contentType, userId, parentId }
    })
    return node
}

export async function getFile({userId, id}) {
    const node = await prisma.node.findFirst({ where: {id, userId}})
    return node
}