import AppError from "../utilis/error.util.js"
import jwt from 'jsonwebtoken'
const isLogin = async (req, res,next) =>{

const {token} = req.cookies 
// console.log(token)



    if(!token){
        return next( new AppError('Please Login First' ,401))
    }
    const user = await jwt.verify(token ,process.env.JWT_SECRET)
    // console.log(user)
    req.user = user
    
    
    next()
    



}









export  {isLogin}