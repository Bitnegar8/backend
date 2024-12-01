// main/main.routes.js

const express = require("express");
const router = express.Router(); // ایجاد یک نمونه از Router
const authRouter = require("./../modules/auth/auth.router");
const userRouter = require("../modules/users/user.router"); // وارد کردن روت‌های کاربران

const MainController = require("./../main/main.controller");
const mainController = new MainController();
// اضافه کردن روت‌های کاربران
router.use("/users", userRouter);
router.use("/auth", authRouter);

// روت اصلی (مثلا روت خوش‌آمدگویی)
router.get("/", mainController.getHome);

module.exports = router; // صادرات روت‌ها
