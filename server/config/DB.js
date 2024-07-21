import mongoose from "mongoose";
const connectToDb = async () =>{
try {
    const {Connection} = await mongoose.connect(process.env.MONGO_URI)
    if(Connection){
        console.log(`"connected to DB", ${Connection.host}`)
    }
} catch (e) {
    console.log("Data base not connected successfully")
    console.log(e)
    process.exit(1)
}

}
export default connectToDb