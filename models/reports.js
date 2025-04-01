const mongoose = require("mongoose");
const {Schema} = mongoose;

const reportSchema = new Schema ({
    employee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    department_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Department"

    },
    reports:[
        {
            content:{
                type: String,
                trim: true
            },
            created_at: { type: Date, default: Date.now } 
        }
    ]
    
},{ timestamps: true }
);

const Report = mongoose.model("Report",reportSchema);
module.exports= Report    