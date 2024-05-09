import jwt from 'jsonwebtoken';

export const authRequired=(req, res, next)=>{   
    const {token} = req.cookies
    if (!token) return res.status(401).json({message: 'Token required'})

    jwt.verify(token,process.env.SECRET_KEY_JWT, (err, data)=>{
        if (err) return res.status(401).json({message: err.message})
            console.log(data)
        req.user = data //pasamos info decodificada del usuario dentro del request
    }
    )
    next();

 } 