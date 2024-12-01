// modules/users/user.router.js

const express = require("express");
const router = express.Router();
const userController = require("./user.controller"); // وارد کردن UserController

// تعریف روت‌ها
// router.post("/", userController.createUser); // ایجاد کاربر
// router.get('/', userController.getAllUsers); // گرفتن همه کاربران
// router.get('/:id', userController.getUserById); // گرفتن کاربر بر اساس ID
// router.put('/:id', userController.updateUser); // به‌روزرسانی کاربر
// router.delete('/:id', userController.deleteUser); // حذف کاربر

module.exports = router; // صادرات روت‌ها
