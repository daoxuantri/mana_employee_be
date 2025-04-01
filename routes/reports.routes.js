const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reports.controller");
const auth = require("../middlewares/auth");

// Nhân viên gửi báo cáo công việc hàng ngày
router.post("/", reportController.createReport);

// Trưởng phòng xem báo cáo của nhân viên trong phòng ban của họ
router.get("/department/:departmentId", reportController.getDepartmentReports);

// Giám đốc/phó giám đốc xem báo cáo tổng thể
router.get("/all",  reportController.getAllReports);

module.exports = router;
