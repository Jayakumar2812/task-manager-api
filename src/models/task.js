const mongoose =require("mongoose")
const validator = require("validator")
const taskschema = new mongoose.Schema({
    description:{
        type: String,
        trim:true,
        required:true
    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }
},{
    timestamps: true
})
const Tasks = mongoose.model("Tasks",taskschema)
module.exports = Tasks