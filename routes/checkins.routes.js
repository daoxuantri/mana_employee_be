const express = require("express");
const router = express.Router();
const checkinController = require("../controllers/checkins.controller");
const auth = require("../middlewares/auth");

// Nhân viên check-in
router.post("/checkin", checkinController.checkIn);

// Nhân viên check-out
router.post("/checkout", checkinController.checkOut);

//get Status của nhân viên
router.get("/getStatus/:employeeId", checkinController.getStatus);



// Xem lịch sử check-in/check-out của nhân viên
router.get("/:employeeId",checkinController.getEmployeeCheckins);

module.exports = router;
