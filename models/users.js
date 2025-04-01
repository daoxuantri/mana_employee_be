const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema ({
    fullname:{
        type: String,
        required: true,
        trim : true ,
    },
    email:{
        type: String,
        trim: true ,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String, 
        enum: ["director", "vice_director", "department_head", "employee"], 
        required: true,
        default: 'employee'
    },
    contact:{
        type: String,
        trim: true ,
    },
    images:{
        type: String , 
    },
    department:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Department",
        default: null
    },
    managed_department:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Department",
        default: null
    },
    reports:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Report"
    },
    checkins:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Checkin"
    },
    status: {
        type : Boolean, 
        default : true
    }
},{ timestamps: true }
);

const User = mongoose.model("User",userSchema);
module.exports= User    