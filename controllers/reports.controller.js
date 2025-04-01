const Report = require("../models/reports");

// 1️⃣ Nhân viên gửi báo cáo công việc hàng ngày
exports.createReport = async (req, res) => {
  try {
    const { employee_id, department_id, content } = req.body;

    // Kiểm tra nếu đã có báo cáo thì cập nhật, nếu chưa có thì tạo mới
    const report = await Report.findOneAndUpdate(
      { employee_id, department_id }, 
      { $push: { reports: { content } } }, 
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Báo cáo đã được gửi thành công!",
      data: report
    });

  } catch (error) {
    next(error);
  }
};

// 2️⃣ Trưởng phòng xem báo cáo của nhân viên thuộc phòng ban của họ
exports.getDepartmentReports = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const reports = await Report.find({ department_id: departmentId }).populate("employee_id", "name");

    return res.status(200).json({
      success: true,
      data: reports
    });

  } catch (error) {
    next(error);
  }
};

// 3️⃣ Giám đốc/phó giám đốc xem báo cáo tổng thể
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("employee_id", "name").populate("department_id", "name");

    return res.status(200).json({
      success: true,
      data: reports
    });

  } catch (error) {
    next(error);
  }
};


