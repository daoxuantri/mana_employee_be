const mongoose = require("mongoose");
const { Schema } = mongoose;

const dutyScheduleSchema = new Schema({
  week_start: { type: Date, required: true }, // Ngày bắt đầu tuần (Thứ 2)
  schedule: [
    {
      day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], required: true },
      employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Nhân viên trực nhật
      supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Người giám sát
      content: { type: String, trim: true } // Nội dung trực nhật (quét dọn, lau sàn, v.v.)
    }
  ]
}, { timestamps: true });

const DutySchedule = mongoose.model("DutySchedule", dutyScheduleSchema);
module.exports = DutySchedule;
