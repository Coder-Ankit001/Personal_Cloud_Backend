import env from '../config/env.js'
import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1] 

    if(!token) return res.status(400).json({ message: ('Unauthorized')})

    try{
        const decoded = jwt.verify(token, env.JWT_ACCESS_TOKEN)
        req.userId = decoded.id
        req.rootId = decoded.rootId
        next()
    }
    catch(e){
        return res.status(400).json({ message: e.message || ('Something went wrong!')})
    }
}