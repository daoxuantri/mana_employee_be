const LeaveRequest = require("../models/leaverequests");
const User = require("../models/users");

// ✅ Nhân viên gửi yêu cầu nghỉ phép
exports.requestLeave = async (req, res) => {
    try {
        const { employee_id, reason } = req.body;

        const newLeaveRequest = new LeaveRequest({
            employee_id,
            reason
        });

        await newLeaveRequest.save();
        res.status(201).json({ success: true, message: "Gửi yêu cầu nghỉ phép thành công", leaveRequest: newLeaveRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// ✅ Trưởng phòng/Giám đốc duyệt hoặc từ chối đơn xin nghỉ
exports.approveLeave = async (req, res) => {
    try {
        const { status, approved_by } = req.body; // "approved" hoặc "rejected"

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Trạng thái không hợp lệ" });
        }

        const leaveRequest = await LeaveRequest.findById(req.params.id);
        if (!leaveRequest) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đơn xin nghỉ" });
        }

        leaveRequest.status = status;
        leaveRequest.approved_by = approved_by;
        await leaveRequest.save();

        res.status(200).json({ success: true, message: `Đã ${status} đơn xin nghỉ`, leaveRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// ✅ Xem lịch sử nghỉ phép của nhân viên
exports.getLeaveHistory = async (req, res) => {
    try {
        const leaveHistory = await LeaveRequest.find({ employee_id: req.params.employee_id });

        if (!leaveHistory.length) {
            return res.status(404).json({ success: false, message: "Không tìm thấy lịch sử nghỉ phép" });
        }

        res.status(200).json({ success: true, leaveHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};
