const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departments.controller");

// Thêm phòng ban
router.post("/add", departmentController.addDepartment);

// Sửa thông tin phòng ban
router.put("/edit/:id", departmentController.updateDepartment);

// Xóa phòng ban
router.delete("/delete/:id", departmentController.deleteDepartment);

// Gán trưởng phòng
router.put("/assign-head/:id", departmentController.assignDepartmentHead);

// Lấy danh sách nhân viên trong phòng ban
router.get("/employees/:id", departmentController.getDepartmentEmployees);

module.exports = router;
