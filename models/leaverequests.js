const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveRequestSchema = new Schema({

    employee_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
    reason: { type: String, trim: true },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
    },
    created_at: { type: Date, default: Date.now },
    approved_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
  });

  const LeaveRequest = mongoose.model("LeaveRequest",leaveRequestSchema);
  module.exports= LeaveRequest    