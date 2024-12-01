// middlewares/AuthMiddleware.js
const jwt = require("jsonwebtoken");
const config = require("config"); // استفاده از config برای دسترسی به پیکربندی
const MainController = require("../../main/main.controller"); // ارث بری از MainController

class AuthMiddleware extends MainController {
  // تایید توکن
  verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // استخراج توکن از هدر Authorization

    if (!token) {
      return this.sendResponse(res, false, null, "توکن موجود نیست", 403); // اگر توکنی وجود نداشته باشد
    }

    try {
      // بررسی صحت توکن با استفاده از JWT Secret از پیکربندی
      const decoded = jwt.verify(token, config.get("ACCESS_TOKEN_SECRET")); // استفاده از config.get()
      req.user = decoded; // ذخیره اطلاعات کاربر در درخواست برای استفاده در روت‌ها
      next(); // ادامه اجرای روت
    } catch (error) {
      return this.sendResponse(res, false, null, "توکن نامعتبر است", 401); // اگر توکن نامعتبر باشد
    }
  };

  // بررسی Refresh Token
  verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.header("x-refresh-token"); // فرض می‌کنیم که Refresh Token از هدر جداگانه ارسال می‌شود

    if (!refreshToken) {
      return this.sendResponse(
        res,
        false,
        null,
        "Refresh Token موجود نیست",
        403
      );
    }

    try {
      // بررسی صحت Refresh Token با استفاده از JWT Secret برای Refresh Token
      const decoded = jwt.verify(
        refreshToken,
        config.get("REFRESH_TOKEN_SECRET")
      );
      req.user = decoded;
      next();
    } catch (error) {
      return this.sendResponse(
        res,
        false,
        null,
        "Refresh Token نامعتبر است",
        401
      );
    }
  };
}

module.exports = new AuthMiddleware(); // صادر کردن نمونه از AuthMiddleware
