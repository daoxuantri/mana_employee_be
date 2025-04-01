const bcryptjs = require("bcryptjs");
const auth = require("../middlewares/auth");
const User = require("../models/users");
const Department = require("../models/departments");

exports.register = async (req, res, next) => {
  try {
    const { fullname, email,password, role, contact} = req.body;

    const images =
      "https://res.cloudinary.com/dpczlxs5i/image/upload/v1727797764/kltn/nvhplrsb52daynbjfcnv.png";
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    const emails = await User.findOne({ email });
    if (emails) {
      return res.status(201).send({
        success: false,
        message: "Email đã tồn tại vui lòng đăng kí mới",
      });
    }
    const newUser = new User({
      fullname: fullname,
      email: email,
      password: req.body.password,
      contact: contact,
      images: images,
      role: role
    });
    const saveUser = await newUser.save();
    if (!saveUser) {
      return res.status(201).send({
        success: false,
        message: "Đăng ký user mới không thành công!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Đăng ký user mới thành công",
      data: { ...newUser.toJSON() },
    });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate("department", "name").exec();
      console.log(user);


      if (!user) {
          return res.status(400).json({ success: false, message: "Thông tin đăng nhập không đúng!" });
      }

      if (!user.status) {
          return res.status(403).json({ success: false, message: "Tài khoản của bạn bị khóa, vui lòng liên hệ CSKH." });
      }

      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ success: false, message: "Sai mật khẩu, vui lòng thử lại!" });
      }
      if (isPasswordValid && user)   /////them du lieu
      {
        const access_token = await auth.generateAccessToken(user._id)

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            data: {
              ...user.toJSON(),
              access_token: access_token,
            }
        });
      }

  } catch (err) {
    next(err);
  }
};
// get Information for User
exports.getInformation = async (req, res, next) => {
  try {
    const userId = req.params.employeeId; 

    const user = await User.findById(userId)
      .populate('department', 'name') 
      .exec();

    if (!user) {
      return res.status(404).json({ success: false, message: 'Không thành công' });
    }

    const userInfo = {
      fullname: user.fullname,
      contact: user.contact,
      department: user.department ? user.department.name : null, // Get department name or null if no department
      role: user.role, //add role
      email: user.email, //add email
      images: user.images
    };

    return res.status(200).json({
      success: true,
      message: 'Thành công',
      data: userInfo,
      
    });
  } catch (err) {
    next(err);
  }
};





