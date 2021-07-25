const mongoose =require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./task")
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required :true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error("email is not valid")
            }
        },
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){ 
            if(value.toLowerCase().includes("password")){
                throw new error("password should not contain 'password' string")
            }
        }
    },
    age:{
        type: Number,
        deafult: 0,
        validate(value){
            if(value <0){
                throw new error("age cannot be negative")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps:true
})
userschema.virtual("tasks",{
    ref:"Tasks",
    localField:"_id",
    foreignField:"owner"
})
userschema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}
userschema.methods.generateauthtoken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userschema.statics.findByCredentials = async(email,password)=>{
 
    const user = await User.findOne({email})
    if(!user){
        throw new Error("unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to Login")
    }
    return user
    
}
userschema.pre("save",async function(next){
    const user= this
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
userschema.pre("remove",async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})

    next()
})
const User = mongoose.model("User",userschema)
module.exports = User