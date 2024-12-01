const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("./user.model"); // مدل کاربر
const MainController = require("./../../main/main.controller"); // ارث‌بری از MainController

class UserController extends MainController {
  // متد ثبت‌نام کاربر
  register = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // چک کردن اینکه آیا ایمیل قبلاً ثبت شده است یا خیر
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return this.sendResponse(res, false, null, "Email already in use", 400);
      }

      // رمزنگاری پسورد
      const hashedPassword = await argon2.hash(password);

      // ساخت کاربر جدید
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roles: ["user"], // یا هر نقش دیگری که می‌خواهید به طور پیش‌فرض بدهید
      });

      // ذخیره کاربر
      await newUser.save();

      // پاسخ موفقیت‌آمیز
      const data = { message: "User registered successfully" };
      return this.sendResponse(res, true, data);
    } catch (error) {
      return this.sendResponse(res, false, null, "Internal Server Error", 500);
    }
  };

  // متد ورود (Login)
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // یافتن کاربر با ایمیل
      const user = await User.findOne({ email });
      if (!user) {
        return this.sendResponse(
          res,
          false,
          null,
          "Invalid email or password",
          401
        );
      }

      // مقایسه پسورد وارد شده با پسورد رمزنگاری‌شده در دیتابیس
      const passwordMatch = await argon2.verify(user.password, password);
      if (!passwordMatch) {
        return this.sendResponse(
          res,
          false,
          null,
          "Invalid email or password",
          401
        );
      }

      // ساخت توکن دسترسی (Access Token)
      const accessToken = jwt.sign(
        { userId: user._id, roles: user.roles }, // payload
        process.env.ACCESS_TOKEN_SECRET, // باید این مقدار را در .env تنظیم کنید
        { expiresIn: "1h" } // مدت زمان اعتبار توکن
      );

      // ساخت توکن بازخوانی (Refresh Token)
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET, // باید این مقدار را در .env تنظیم کنید
        { expiresIn: "7d" } // مدت زمان اعتبار توکن
      );

      // ذخیره توکن‌ها در دیتابیس
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();

      // پاسخ موفقیت‌آمیز با توکن‌ها
      const data = { accessToken, refreshToken };
      return this.sendResponse(res, true, data);
    } catch (error) {
      return this.sendResponse(res, false, null, "Internal Server Error", 500);
    }
  };

  // متد برای بازخوانی توکن (Refresh Token)
  refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return this.sendResponse(
          res,
          false,
          null,
          "Refresh Token is required",
          400
        );
      }

      // بررسی اعتبار توکن بازخوانی
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decoded.userId);
      if (!user || user.refreshToken !== refreshToken) {
        return this.sendResponse(
          res,
          false,
          null,
          "Invalid Refresh Token",
          403
        );
      }

      // ساخت توکن دسترسی جدید
      const accessToken = jwt.sign(
        { userId: user._id, roles: user.roles },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // پاسخ با توکن جدید
      const data = { accessToken };
      return this.sendResponse(res, true, data);
    } catch (error) {
      return this.sendResponse(res, false, null, "Invalid Refresh Token", 403);
    }
  };
}

module.exports = UserController;
