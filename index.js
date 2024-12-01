const express = require("express"); // وارد کردن Express
const mongoose = require("mongoose"); // وارد کردن Mongoose
const config = require("config"); // وارد کردن پکیج config
const MainRouter = require("./main/main.router"); // وارد کردن روت‌های اصلی
const initializeRolesAndPermissions = require("./utils/initializeRolesAndPermissions");

const app = express(); // ایجاد نمونه‌ای از اپلیکیشن Express

// Middleware برای پردازش درخواست‌های JSON
app.use(express.json());

// شناسایی محیط فعلی (development یا production)
const environment = process.env.NODE_ENV || "development"; // پیش‌فرض: development

console.log(`Running in ${environment} mode`); // چاپ پیامی برای شناسایی محیط

// اتصال به MongoDB با استفاده از URL از فایل پیکربندی
const dbUrl = config.get("db.url");

mongoose
  .connect(dbUrl)
  .then(async () => {
    console.log("MongoDB connected successfully");
    await initializeRolesAndPermissions();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// استفاده از روت‌های اصلی
app.use("/api", MainRouter);

// شروع سرور
const PORT = config.get("port") || 3000; // تعیین پورت سرور
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
