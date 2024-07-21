import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from './middleware/error.Middleware.js'
import router from './routes/userroutes.js'
import postrouter from './routes/postroute.js'
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Cookie'],
}))

app.use(express.urlencoded({
    extended: true,
    limit:"16kb",
   


}))

app.use(morgan('dev'))


app.use("/api/v1/user",router)
app.use("/api/v1/post",postrouter)



app.all('*' ,(req,res) =>{
    res.status(404).send('OPPS!! 404 page not found')
})

// app.use(errorMiddleware())

export default app