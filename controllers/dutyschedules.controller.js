const DutySchedule = require("../models/dutyschedules");

// 📌 Hàm tính ngày bắt đầu của tuần dựa vào ngày hiện tại
const getWeekStartDate = (date = new Date()) => {
    const dayOfWeek = date.getDay(); // 0 (CN) -> 6 (T7)
    const monday = new Date(date);
    monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Lùi về Thứ Hai
    monday.setHours(0, 0, 0, 0);
    return monday;
};

// 📌 1. Trưởng phòng hoặc giám đốc phân công lịch trực
exports.assignDuty = async (req, res) => {
    try {
        const { employee_id, supervisor_id, day, content } = req.body;
        const week_start = getWeekStartDate();

        const newDuty = new DutySchedule({ employee_id, supervisor_id, day, content, week_start });
        await newDuty.save();

        res.status(201).json({ success: true, message: "Phân công lịch trực thành công!", data: newDuty });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

// 📌 2. Nhân viên xem lịch trực của mình
exports.getMyDutySchedule = async (req, res) => {
    try {
        const userId = req.user.id;
        const week_start = getWeekStartDate();

        const schedule = await DutySchedule.find({ employee_id: userId, week_start })
            .populate("supervisor_id", "name");

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

// 📌 3. Nhân viên ghi nhận nội dung trực
exports.completeDuty = async (req, res) => {
    try {
        const dutyId = req.params.id;
        const { completion_note } = req.body;

        const duty = await DutySchedule.findById(dutyId);
        if (!duty) {
            return res.status(404).json({ success: false, message: "Không tìm thấy lịch trực!" });
        }

        if (duty.employee_id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền ghi nhận ca trực này!" });
        }

        duty.completion_note = completion_note;
        duty.status = "completed";
        await duty.save();

        res.status(200).json({ success: true, message: "Ghi nhận ca trực thành công!", data: duty });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

// 📌 4. Giám sát xác nhận ca trực
exports.confirmDuty = async (req, res) => {
    try {
        const dutyId = req.params.id;
        const duty = await DutySchedule.findById(dutyId);
        if (!duty) {
            return res.status(404).json({ success: false, message: "Không tìm thấy lịch trực!" });
        }

        if (duty.supervisor_id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền xác nhận ca trực này!" });
        }

        duty.status = "confirmed";
        duty.confirmed_by = req.user.id;
        await duty.save();

        res.status(200).json({ success: true, message: "Ca trực đã được xác nhận!", data: duty });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};
