// UserModel : save user information -> id,name,email,password,avatar
import mongoose from "mongoose";
import bcrypt, { genSalt } from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:Text,
        required:false,
        default:'https://ui-avatars.com/api/?background=random'
    }
})
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
// fungsi compare plain text dengan password hash
UserSchema.methods.comparePassword = async function(candiDatePassword){
    return bcrypt.compare(candiDatePassword, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User
