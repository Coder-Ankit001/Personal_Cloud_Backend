import express from 'express';
import { prisma } from '../../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { access } from 'node:fs';

const router = express.Router();

const saltRounds = 10

router.get('/me', (req, res) => {
  res.send('User route is working!');
});


router.post('/token', (req, res)=>{
  const cookies = req.cookies
  if(!cookies?.jwt) return res.status(401).json({ message: ('Unauthorized') })
  
  const refreshToken = cookies.jwt
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user)=>{
    if(err) return res.status(403).json({ message: ('Forbidden') })

    const accessToken = jwt.sign({
      username: user.username
    }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m'})

    return res.status(200).json({ message: ('Token is refreshed!'), accessToken})
  })
})

router.post('/register', async (req, res)=>{
  try{
    const {email, username, password} = req.body
    if(!email || !username || !password) return res.status(400).json({ message: ('All fields are required!')})

    const matchUser = await prisma.user.findFirst({ where: { OR: [{email}, {username}] }})
    if(matchUser) return res.status(409).json({ message: ('User already exist!')})

    const hashPassword = await bcrypt.hash(password, saltRounds)
    const user = await prisma.user.create({ data: {email, username, password: hashPassword}})

    const accessToken = jwt.sign({
      username: username
    }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m'})
  
    const refreshToken = jwt.sign({
      username: username
    }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d'})

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({ message: ('User created successfully!'), accessToken})
  }
  catch(e){
    return res.status(500).json({ message: ('Internal Server Error')})
  }
})

router.post('/login', async (req, res)=>{

  try{
    const body = req.body
    const {username, password} = body
    if(!username  || !password) return res.status(400).json({ message: ('All fields are required!') })
  
    const user =  await prisma.user.findUnique({where: { username }})
    if(!user) return res.status(401).json({ message: ('Invalid Credentials!') })

    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({ message: ('Invalid Credentials!') })
  
  
    const accessToken = jwt.sign({
      username: username
    }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m'})
  
    const refreshToken = jwt.sign({
      username: username
    }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d'})

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })
  
    return res.status(200).json({ message: ('User sucessfully logged in'), accessToken })
  }
  catch(e){
    return res.status(500).json({ message: ('Internal Server Error')})
  }

})


router.post('/logout', (req, res)=>{
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })
  return res.status(200).json({ message: ('User successfully logged out!') })
})

export default router;