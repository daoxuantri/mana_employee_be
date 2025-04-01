const Department = require("../models/departments");
const User = require("../models/users");

// ✅ Thêm phòng ban
exports.addDepartment = async (req, res) => {
    try {
        const { name, head, employees } = req.body;

        const newDepartment = new Department({
            name,
            head,
            employees
        });

        await newDepartment.save();
        res.status(201).json({ success: true, message: "Thêm phòng ban thành công", department: newDepartment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// ✅ Sửa thông tin phòng ban
exports.updateDepartment = async (req, res) => {
    try {
        const { name, employees } = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate(
            req.params.id,
            { name, employees },
            { new: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban" });
        }

        res.status(200).json({ success: true, message: "Cập nhật phòng ban thành công", department: updatedDepartment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// ✅ Xóa phòng ban
exports.deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);

        if (!deletedDepartment) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban" });
        }

        res.status(200).json({ success: true, message: "Xóa phòng ban thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// ✅ Gán trưởng phòng cho phòng ban
exports.assignDepartmentHead = async (req, res) => {
    try {
        const { head } = req.body;
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban" });
        }

        department.head = head;
        await department.save();

        res.status(200).json({ success: true, message: "Gán trưởng phòng thành công", department });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// ✅ Lấy danh sách nhân viên trong phòng ban
exports.getDepartmentEmployees = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate("employees", "name email role");

        if (!department) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phòng ban" });
        }

        res.status(200).json({ success: true, employees: department.employees });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};
