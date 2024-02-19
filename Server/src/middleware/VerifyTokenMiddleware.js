import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Verifying the token to avoid user generating unverified tokens during login
export const VerifyTokenMiddleware=async(req,res,next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split('')[0]==='JWT'){
        jwt.verify(req.headers.authorization.split('')[1],process.env.SECRET_KEY,(error,decode)=>{
            if(error){
                return notAuthorized(res, 'You do not have Access');
            }else{
                req.user=decode
                next()
            }
            
        })
    }
}