const { getDistance } = require("geolib");
const Checkin = require("../models/checkins")
// Vị trí văn phòng
const OFFICE_LOCATION = { latitude: 10.346246800237312, longitude: 107.09377785263734 };
const ALLOWED_DISTANCE = 30; 
// Check-in API
exports.checkIn = async (req, res, next) => {
  try {
    const { employeeId, latitude, longitude } = req.body;
    const today = new Date().setHours(0, 0, 0, 0);

    // 📌 Kiểm tra khoảng cách giữa nhân viên và văn phòng
    const distance = getDistance(
      { latitude: latitude, longitude: longitude },
      OFFICE_LOCATION
    );

    console.log(`Khoảng cách tới văn phòng: ${distance} mét`);

    if (distance > ALLOWED_DISTANCE) {
      return res.status(400).json({ 
        success: false,
        message: "Bạn không ở trong phạm vi văn phòng!" });
    }

    let checkin = await Checkin.findOne({ 
      employee_id: employeeId, 
      date: today 
    });

    if (checkin) {
      return res.status(400).json({ 
        success: true ,
        message: "Bạn đã check-in hôm nay rồi!" });
    }

    checkin = new Checkin({
      employee_id: employeeId,
      date: today,
      checkin_time: new Date(),
      checkin_location: { latitude, longitude },
      status: "checkedIn"
    });

    await checkin.save();

    return res.status(200).json({
      message: "Check-in thành công!",
      status: "checkedIn",
      checkin_time: checkin.checkin_time
    });

  } catch (error) {
    next(error);
  }
};

exports.getStatus = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const today = new Date().setHours(0, 0, 0, 0);

    const checkin = await Checkin.findOne({ 
      employee_id: employeeId, 
      date: today 
    });

    if (!checkin) {
      return res.status(200).json({ 
        success: true,
        message: "Lấy trạng thái",
        status: "notCheckedIn" });
    }

    return res.status(200).json({
      success: true,
      message:"Thành công",
      status: checkin.status,
      checkin_time: checkin.checkin_time,
      checkout_time: checkin.checkout_time
    });

  } catch (error) {
    next(error);
  }
};


exports.checkOut = async (req, res) => {
  try {
    const { employeeId, latitude, longitude } = req.body;
    const today = new Date().setHours(0, 0, 0, 0);

    let checkin = await Checkin.findOne({ 
      employee_id: employeeId, 
      date: today 
    });

    if (!checkin) {
      return res.status(400).json({ success: false, message: "Bạn chưa check-in hôm nay!" });
    }

    if (checkin.checkout_time) {
      return res.status(400).json({ success: false, message: "Bạn đã check-out rồi!" });
    }

    checkin.checkout_time = new Date();
    checkin.checkout_location = { latitude, longitude };
    checkin.status = "checkedOut";

    await checkin.save();

    return res.status(200).json({
      success: true, 
      message: "Check-out thành công!",
      status: "checkedOut",
      checkout_time: checkin.checkout_time
    });

  } catch (error) {
    next(error);
  }
};

// 3️⃣ Lấy lịch sử check-in/check-out của nhân viên
exports.getEmployeeCheckins = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const checkins = await Checkin.findOne({ employee_id: employeeId });

    if (!checkins) {
      return res.status(404).json({ success: false, message: "Không có dữ liệu check-in!" });
    }

    return res.status(200).json({
      success: true,
      message: "Thành công",
      data: checkins
    });

  } catch (error) {
    next(error);
  }
};
