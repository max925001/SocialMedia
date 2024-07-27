import express, { Router } from 'express'
import { createPost, getallpost, getmypost, like, unlike,   } from '../controllers/postController.js'
import { upload } from '../middleware/multer.Middleware.js'
import { isLogin } from '../middleware/auth.Middleware.js'



const postrouter = Router()




postrouter.post('/create', isLogin, upload.single("image"), createPost)
postrouter.get('/getmypost', isLogin,getmypost)
postrouter.post("/like/:id" ,isLogin,like)
postrouter.post("/unlike/:id" ,isLogin,unlike)
postrouter.get("/getallpost",getallpost)


export default postrouter