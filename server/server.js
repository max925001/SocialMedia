import { config } from "dotenv";
config()
import app from "./app.js";
import connectToDb from "./config/DB.js";





app.listen(process.env.PORT || 4001 , async() =>{

await connectToDb()
    console.log(`Server is Ready at Port ${process.env.PORT}`)
})

