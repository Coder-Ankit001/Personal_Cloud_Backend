import env from '../../config/env.js'
import { prisma } from '../../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { createRoot } from '../nodes/nodes_service.js'

const saltRounds = 10

export const tokenRefresh = (req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt) return res.status(401).json({ message: ('Unauthorized') })
  
  const refreshToken = cookies.jwt
  let userData = null
  jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN, (err, user)=>{
    if(err) return res.status(403).json({ message: ('Forbidden') })
    userData = { id: user.id, rootId: user.rootId, username: user.username, email: user.email }
    const accessToken = jwt.sign(userData, env.JWT_ACCESS_TOKEN, { expiresIn: '10m'})

    return res.status(200).json({ message: ('Token is refreshed!'), accessToken, user: userData})
  })
}

export const registerUser = async (req, res)=>{
  try{
    const {email, username, password} = req.body
    if(!email || !username || !password) return res.status(400).json({ message: ('All fields are required!')})

    const matchUser = await prisma.user.findFirst({ where: { OR: [{email}, {username}] }})
    if(matchUser) return res.status(409).json({ message: ('User already exist!')})

      
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const user = await prisma.user.create({ data: {email, username, password: hashPassword}})
    const root = await createRoot({userId: user.id})
    await prisma.user.update({ where: {id: user.id}, data: {rootId: root.id}})

    const userData = { id: user.id, rootId: user.rootId, username: user.username, email: user.email }
    const accessToken = jwt.sign(userData, env.JWT_ACCESS_TOKEN, { expiresIn: '10m'})
  
    const refreshToken = jwt.sign(userData, env.JWT_REFRESH_TOKEN, { expiresIn: '1d'})

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({ message: ('User created successfully!'), accessToken, user: userData})
  }
  catch(e){
    return res.status(500).json({ message: ('Internal Server Error')})
  }
}

export const loginUser = async (req, res)=>{

  try{
    const body = req.body
    const {username, password} = body
    if(!username  || !password) return res.status(400).json({ message: ('All fields are required!') })
  
    const user =  await prisma.user.findUnique({where: { username }})
    if(!user) return res.status(401).json({ message: ('Invalid Credentials!') })

    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({ message: ('Invalid Credentials!') })
  
    const userData = { id: user.id, rootId: user.rootId, username: user.username, email: user.email }
    const accessToken = jwt.sign(userData, env.JWT_ACCESS_TOKEN, { expiresIn: '10m'})
  
    const refreshToken = jwt.sign(userData, env.JWT_REFRESH_TOKEN, { expiresIn: '1d'})

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })
  
    return res.status(200).json({ message: ('User sucessfully logged in'), accessToken, user: userData})
  }
  catch(e){
    console.log(e)
    return res.status(500).json({ message: ('Internal Server Error')})
  }

}

export const logoutUser = (req, res)=>{
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })
  return res.status(200).json({ message: ('User successfully logged out!') })
}