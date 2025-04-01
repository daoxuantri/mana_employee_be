const mongoose = require("mongoose");
const {Schema} = mongoose;

const departmentSchema = new Schema ({
    name:{
        type :String,
        trim: true
    },
    head:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    employees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{ timestamps: true }
);

const Department = mongoose.model("Department",departmentSchema);
module.exports= Department    