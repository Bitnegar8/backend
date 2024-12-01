const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const crypto = require("crypto");
const User = require("./../users/user.model");
const Role = require("./../auth/role.model");
const config = require("config");
const MainController = require("./../../main/main.controller");

class AuthController extends MainController {
  // تابع ثبت‌نام
  register = async (req, res) => {
    try {
      console.log("Request Body:", req.body);

      const {
        firstName,
        lastName,
        fatherName,
        nationalID,
        emiratesID,
        dateOfBirth,
        nationality,
        mobileNumber,
        email,
        password,
        primaryPhone,
        roleNames,
        gender,
        preferredLanguage,
        addresses,
      } = req.body;

      // بررسی وجود کاربر
      const existingUser = await User.findOne({
        $or: [{ primaryEmail: email }, { primaryMobile: mobileNumber }],
      });
      if (existingUser) {
        return this.sendResponse(
          res,
          false,
          null,
          "Email or mobile number already in use",
          400
        );
      }

      // هش کردن پسورد
      const hashedPassword = await argon2.hash(password);

      // ساخت کدهای تایید برای ایمیل و موبایل
      const emailVerificationCode = crypto.randomBytes(4).toString("hex");
      const mobileVerificationCode = crypto.randomBytes(4).toString("hex");
      const verificationCodeExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

      // یافتن نقش‌ها بر اساس نام
      const roles = await Role.find({ name: { $in: roleNames } });
      const roleIds = roles.map((role) => role._id);

      // ایجاد کاربر جدید
      const newUser = new User({
        firstName,
        lastName,
        fatherName,
        nationalID,
        emiratesID,
        dateOfBirth,
        nationality,
        password: hashedPassword,
        emails: [
          {
            value: email,
            verificationCode: emailVerificationCode,
            verificationCodeExpiry: verificationCodeExpiresAt,
          },
        ],
        mobiles: [
          {
            value: mobileNumber,
            verificationCode: mobileVerificationCode,
            verificationCodeExpiry: verificationCodeExpiresAt,
          },
        ],

        addresses: addresses,
        roles: roleIds,
        preferredLanguage,
        gender,
      });

      // ذخیره‌سازی کاربر جدید در پایگاه داده
      await newUser.save();

      // ساخت توکن‌های دسترسی و بازخوانی
      const accessToken = jwt.sign(
        { userId: newUser._id, roles: newUser.roles },
        config.get("JWT_KEY"), // تنظیمات JWT Secret
        { expiresIn: config.get("JWT_EXPIRESIN") } // زمان انقضای توکن
      );

      // ارسال توکن‌ها به کاربر
      const data = {
        message: "User registered successfully",
        accessToken,
      };

      return this.sendResponse(
        res,
        true,
        data,
        "User registered successfully",
        201
      );
    } catch (error) {
      console.error("Error in register function:", error);
      return this.sendResponse(res, false, null, "Internal Server Error", 500);
    }
  };

  // تابع لاگین
  login = async (req, res) => {
    try {
      console.log("Request Body:", req.body);

      const { email, mobileNumber, password } = req.body;

      // بررسی وجود کاربر
      const user = await User.findOne({
        $or: [{ "emails.value": email }, { "mobiles.value": mobileNumber }],
      });

      if (!user) {
        return this.sendResponse(res, false, null, "Invalid credentials", 401);
      }

      // مقایسه رمز عبور وارد شده با رمز عبور هش شده در پایگاه داده
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return this.sendResponse(res, false, null, "Invalid credentials", 401);
      }

      // ساخت توکن‌های دسترسی و بازخوانی
      const accessToken = jwt.sign(
        { userId: user._id, roles: user.roles },
        config.get("JWT_KEY"),
        { expiresIn: config.get("JWT_EXPIRESIN") }
      );

      // ارسال توکن‌ها به کاربر
      const data = {
        message: "User logged in successfully",
        accessToken,
      };

      return this.sendResponse(
        res,
        true,
        data,
        "User logged in successfully",
        200
      );
    } catch (error) {
      console.error("Error in login function:", error);
      return this.sendResponse(res, false, null, "Internal Server Error", 500);
    }
  };
}

module.exports = AuthController;
