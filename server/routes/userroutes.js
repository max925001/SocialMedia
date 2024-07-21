import express from 'express'
import { createUser, editUserDetails, getUser, login, logout } from '../controllers/userController.js'
import {upload} from '../middleware/multer.Middleware.js'
import { isLogin } from '../middleware/auth.Middleware.js'



const router = express.Router()



router.post('/register' ,  upload.fields([
    {
        name:"avatar",
        maxCount:1
    } ,{
        name:"coverImage",
        maxCount:1
    }


]), createUser)
router.post('/login' ,login)
router.post('/logout' ,isLogin,logout)
router.get('/getuser', isLogin ,getUser)
router.put('/editdetails',isLogin ,editUserDetails)


export default router