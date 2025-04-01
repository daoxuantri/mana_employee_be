const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkinSchema = new Schema({
  employee_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  date: { 
    type: Date, 
    required: true, 
    unique: false
  },
  checkin_time: { type: Date },
  checkin_location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
  },
  checkout_time: { type: Date },
  checkout_location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
  },
  status: {
    type: String,
    enum: ["notCheckedIn", "checkedIn", "checkedOut"],
    default: "notCheckedIn"
  }
}, { timestamps: true });

const Checkin = mongoose.model("Checkin", checkinSchema);
module.exports = Checkin;
