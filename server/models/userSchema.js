import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
type: String,
required:true,
trim:true,
unique:true



    },

fullname:{
type:String,
required:true,
trim:true,
lowercase:true



},
phone_no:{

type:Number,
required:[true,"Every Field Required"],
trim:true,
// unique:true



},
avatar:{
    
type:String

},
coverImage:{
    type:String,
    
},
gender:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    // unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true,
    select:false,
    minLength:[8,'password must be 8 charcter or more']

    

},
post:
    [
        {type:Schema.Types.ObjectId,
            ref:"Post",
        }
    ]








})



userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password ,10)
    next()
})



userSchema.methods ={
    generateJWTtoken:  async function(){
        return await Jwt.sign(
            {
                id: this._id ,email: this.email,
                fullname: this.fullname,
                phone_no: this.phone_no,
                username:this.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
,
comparePassword: async function(plaintextPassword){

    return  await bcrypt.compare(plaintextPassword,this.password)
}


}
const User = mongoose.model('User' ,userSchema)

export default User