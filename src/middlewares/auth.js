import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1] 

    if(!token) return res.status(400).json({ message: ('Unauthorized')})

    try{
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        req.userId = decoded.id
        next()
    }
    catch(e){
        return res.status(400).json({ message: e.message || ('Something went wrong!')})
    }
}