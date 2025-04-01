const express = require("express");
const router = express.Router();
const dutyScheduleController = require("../controllers/dutyschedules.controller");
const auth = require("../middlewares/auth");

// Trưởng phòng hoặc giám đốc phân công lịch trực
router.post("/assign", dutyScheduleController.assignDuty);

// Nhân viên xem lịch trực của mình
router.get("/my-schedule", dutyScheduleController.getMyDutySchedule);

// Nhân viên ghi nhận nội dung trực
router.put("/complete/:id", dutyScheduleController.completeDuty);

// Giám sát xác nhận ca trực
router.put("/confirm/:id", dutyScheduleController.confirmDuty);

module.exports = router;
