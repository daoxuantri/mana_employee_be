const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaverequests.controller");
const auth = require("../middlewares/auth");

// Nhân viên gửi yêu cầu nghỉ phép
router.post("/request", leaveController.requestLeave);

// Trưởng phòng/Giám đốc duyệt hoặc từ chối đơn xin nghỉ
router.put("/approve/:id",leaveController.approveLeave);

// Xem lịch sử nghỉ phép của nhân viên
router.get("/history/:employee_id", leaveController.getLeaveHistory);

module.exports = router;
