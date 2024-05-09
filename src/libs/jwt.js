import jwt from 'jsonwebtoken';

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {//new promise es un objeto global de node resolve todo bien
        jwt.sign(payload,process.env.SECRET_KEY_JWT, {expiresIn:'4h'},
            (err, token)=>{
                if (err)reject(err);
                resolve(token);// si todo fue bien retorna token
            }
        );
    })
}



