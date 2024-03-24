const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader)
    {
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECURE,(err,decoded)=>{
            if(err)
                res.status(403).send("Token not valid")
            req.user = decoded
            next()
        })
    }else{
        return res.status(401).send("You are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
   
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.type === 'Admin'){
            next()
        }else{
            res.status(403).send('You are not allowed to do that')
        }
    })
}

module.exports = {verifyTokenAndAuthorization}