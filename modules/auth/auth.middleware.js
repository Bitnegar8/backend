const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * میدلور برای احراز هویت کاربران با استفاده از JWT
 */
const authMiddleware = async (req, res, next) => {
  try {
    // گرفتن توکن از هدر Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // بررسی وجود توکن
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // تایید اعتبار توکن
    const decoded = jwt.verify(token, config.get("JWT_KEY"));

    // اضافه کردن اطلاعات کاربر به درخواست
    req.user = decoded;

    // ادامه پردازش
    next();
  } catch (err) {
    console.error("Error in auth middleware:", err);
    res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
